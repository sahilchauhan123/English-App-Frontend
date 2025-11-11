import { ToastAndroid } from "react-native";
import useAuthStore from "../store/useAuthStore";
import { setOngoingCallData, setOngoingCallId, startCallTimer, stopCallTimer, useCallStore } from "../store/useCallStore";
import { wsURL } from "../utils/constants";
import { acceptAnswer, acceptOffer, endCall, insertICECandidate, remoteEndCall, sendOffer } from "./webrtc";
import { navigate, navigateAndReset, navigateWithParams, navigationRef } from "../navigation/navigationService";
import { retrieveUserSession } from "../utils/tokens";

let socket;
const user = useAuthStore.getState().user;
let reconnectAttempts = 0;
const MAX_RETRIES = 10;
let manualClose = false;

export async function initSocket() {
    
    console.log("[initSocket] Initializing WebSocket...");

    if (socket) {
        console.log("[initSocket] Socket already exists, returning existing socket");
        return socket;
    }

    console.log("[initSocket] Creating new WebSocket connection to:", wsURL);
    const { refreshToken } = await retrieveUserSession();
    try {
        socket = new WebSocket(`${wsURL}?token=${refreshToken}`);

    } catch (error) {
        console.log("[initSocket] Error creating WebSocket:", error);
    }


    socket.onopen = () => {
        console.log("[initSocket] WebSocket connection established");

        const data = {
            type: 'initialize',
            // user: useAuthStore.getState().user,
            user: user,

        };
        console.log("[initSocket] Sending initialize data:", data);
        socket.send(JSON.stringify(data));
    };

    socket.onerror = (error) => {
        console.error("❌ WebSocket error:", error.message);
    };

    socket.onclose = (event) => {
        console.warn("⚠️ Disconnected:", event.code, event.reason);

        // 1000 = normal closure, don’t reconnect
        if (event.code !== 1000 && !manualClose) {
            socket.close();
            socket = null;
            attemptReconnect();
        }else{
            console.log("normal socket closure")
        }
    };

    socket.onmessage = (msg) => {
        try {
            const data = JSON.parse(msg.data);
            console.log("MSG from server :", data);

            switch (data.type) {
                case "initialized":
                    try {
                        console.log("initialized success");
                        useCallStore.getState().setUsersList(data.online_users);
                    } catch (err) {
                        console.error("[initialized] Error:", err);
                    }
                    break;

                case "offer":
                    try {
                        console.log("OFFER received");
                        if (data.randomCall) {
                            console.log("random offer received", data.fromUserData);
                            useCallStore.getState().setRandomUserData(data.fromUserData);
                            acceptOffer(data.payload, data.fromUserData);
                            navigateWithParams("CallScreen", data.fromUserData);
                            break;
                        }
                        console.log("normal offer received");
                        useCallStore.getState().showIncomingCallModal(data);
                    } catch (err) {
                        console.error("[offer] Error:", err);
                    }
                    break;

                case "answer":
                    try {
                        console.log("ANSWER received");
                        acceptAnswer(data.payload, data.from);
                        setOngoingCallData(data.fromUserData);
                        navigateWithParams("CallScreen", data.fromUserData);
                    } catch (err) {
                        console.error("[answer] Error:", err);
                    }
                    break;

                case "icecandidate":
                    try {
                        console.log("ICE CANDIDATE received");
                        insertICECandidate(data.payload);
                    } catch (err) {
                        console.error("[icecandidate] Error:", err);
                    }
                    break;

                case "callStarted":
                    try {
                        console.log("call started ", data.callId);
                        setOngoingCallId(data.callId); // unique id for every call session
                        startCallTimer();
                    } catch (err) {
                        console.error("[callStarted] Error:", err);
                    }
                    break;

                case "endCall":
                    try {
                        console.log("[initSocket] Handling 'endCall' event");
                        ToastAndroid.show(`Call Ended By ${data.fromUserData.full_name}`, 2000);
                        remoteEndCall();
                        if (useCallStore.getState().isOnCallScreen) {
                            const callId = useCallStore.getState().ongoingCallId;
                            setOngoingCallId(null);
                            if (callId) {
                                navigateAndReset("FeedBack", callId)
                            }
                        }
                    } catch (err) {
                        console.error("[endCall] Error:", err);
                    }
                    break;

                case "randomUserFound":
                    try {
                        console.log("random user found:", data.target);
                        sendOffer(data.target, true);
                    } catch (err) {
                        console.error("[randomUserFound] Error:", err);
                    }
                    break;

                case "randomCallOffer":
                    try {
                        // some logic
                    } catch (err) {
                        console.error("[randomCallOffer] Error:", err);
                    }
                    break;

                case "canceledRandomMatch":
                    try {
                        console.log("[initSocket] Handling 'canceledRandomMatch' event");
                        // some logic
                    } catch (err) {
                        console.error("[canceledRandomMatch] Error:", err);
                    }
                    break;

                case "rejectedCall":
                    try {
                        console.log("[initSocket] Handling 'rejectedCall' event");
                        ToastAndroid.show(`Call Rejected By ${data.fromUserData.full_name}`, 2000);
                    } catch (err) {
                        console.error("[rejectedCall] Error:", err);
                    }
                    break;

                case "newUsersList":
                    try {
                        if (data.usersCount < 1) {
                            console.log("refresh list:", data.error);
                            useCallStore.getState().setUsersList([]);
                            break;
                        }
                        useCallStore.getState().setUsersList(data.usersList);
                    } catch (err) {
                        console.error("[newUsersList] Error:", err);
                    }
                    break;

                default:
                    console.warn("[initSocket] Unknown message type:", data.type);
            }
        } catch (err) {
            console.error("[initSocket] Failed to parse incoming message:", err);
        }
    };

    return socket;

}

export function sendMessage(message) {
    try {
        if (!socket) {
            console.error("[sendMessage] No WebSocket instance found");
            return;
        }
        if (socket.readyState !== WebSocket.OPEN) {
            console.log("socket state ", socket.readyState)
            console.log("socket message : ", message)
            // console.error("[sendMessage] WebSocket is not open (state:", socket.readyState, ")");
            return;
        }
        console.log("send message:", message);
        socket.send(JSON.stringify(message));
    } catch (error) {
        console.error("[sendMessage] Error while sending message:", error);
    }
}


function attemptReconnect() {
    if (reconnectAttempts >= MAX_RETRIES) {
        console.error("🚫 Max reconnection attempts reached");
        return;
    }

    const delay = Math.min(1000 * Math.pow(2, reconnectAttempts), 30000); // exponential backoff
    reconnectAttempts++;

    console.log(`🔄 Reconnecting in ${delay / 1000}s...`);

    setTimeout(() => {
        initSocket();
    }, delay);
}


export function closeWebSocket() {
    if (socket && socket.readyState === WebSocket.OPEN) {
        console.log("👋 Closing socket manually...");
        manualClose = true;
        socket.close(1000, "Manual close");
    } else {
        manualClose = true;
    }
}