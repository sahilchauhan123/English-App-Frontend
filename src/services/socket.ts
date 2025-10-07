// import { ToastAndroid } from "react-native";
// import useAuthStore from "../store/useAuthStore";
// import { useCallStore } from "../store/useCallStore";
// import { wsURL } from "../utils/constants";
// import { acceptAnswer } from "./webrtc";



// let socket;


// // type Message struct {
// // 	Type         string     `json:"type"`
// // 	User         types.User `json:"user,omitempty"`
// // 	Target       int64      `json:"target,omitempty"`
// // 	Payload      any        `json:"payload,omitempty"`
// // 	From         int64      `json:"from,omitempty"`
// // 	FromUserData any        `json:"fromUserData,omitempty"`
// // }

// export function initSocket() {

//     if (socket) return socket;

//     socket = new WebSocket(wsURL)

//     socket.onopen = () => {
//         console.log('WebSocket connection established');

//         const data = {
//             type: 'initialize',
//             user: useAuthStore.getState().user,
//         }
//         socket.send(JSON.stringify(data));
//     };

//     socket.onerror = (error) => {
//         console.error('WebSocket error:', error);
//     };

//     socket.onmessage = (msg) => {
//         const data = JSON.parse(msg.data);
//         console.log('Received message:', data);
//         switch (data.type) {
//             case "initialized":
//                 useCallStore.getState().setUsersList(data.online_users);
//                 break;

//             case "offer":
//                 useCallStore.getState().showIncomingCallModal(data.fromUserData, data.payload);
//                 break;
//             case "answer":
//                 acceptAnswer(data.payload);
//                 break;
//             case "icecandidate":
//             //some logic

//             case "endCall":
//             //some logic

//             case "randomCallOffer":
//             //some logic

//             case "canceledRandomMatch":
//             //some logic

//             case "rejectedCall":
//                 ToastAndroid.show(`Call Rejected By ${data.fromUserData.full_name}`, 2000)
//         }
//     }

//     return socket;
// }


// export function sendMessage(message: any) {
//     console.log("sending message : ", message)
//     try {
//         if (!socket || socket.readyState !== WebSocket.OPEN) {
//             console.error('WebSocket is not open. Cannot send message.');
//             return;
//         } else {
//             console.log("sending message : ", message)
//             socket.send(JSON.stringify(message));

//         }
//     } catch (error) {
//         console.log("error in sending message : ", error)
//     }
// }





import { ToastAndroid } from "react-native";
import useAuthStore from "../store/useAuthStore";
import { setOngoingCallId, startCallTimer, useCallStore } from "../store/useCallStore";
import { wsURL } from "../utils/constants";
import { acceptAnswer, acceptOffer, endCall, insertICECandidate, remoteEndCall, sendOffer } from "./webrtc";
import { navigate, navigateWithParams, navigationRef } from "../navigation/navigationService";
import { retrieveUserSession } from "../utils/tokens";

let socket;
const user = useAuthStore.getState().user;

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
        console.error("[initSocket] WebSocket error:", error);
    };

    socket.onmessage = (msg) => {
        try {
            const data = JSON.parse(msg.data);
            console.log("MSG from server :", data);

            switch (data.type) {
                case "initialized":
                    console.log("initialized success");
                    useCallStore.getState().setUsersList(data.online_users);
                    break;

                case "offer":
                    console.log("OFFER received");
                    if (data.randomCall) {
                        console.log("random offer received", data.fromUserData);
                        useCallStore.getState().setRandomUserData(data.fromUserData)
                        acceptOffer(data.payload, data.fromUserData)
                        navigateWithParams("CallScreen", data.fromUserData)
                        break;
                    }
                    console.log("normal offer received");
                    useCallStore.getState().showIncomingCallModal(data);
                    break;

                case "answer":
                    console.log("ANSWER received");
                    acceptAnswer(data.payload, data.from);
                    navigateWithParams("CallScreen", data.fromUserData)
                    break;

                case "icecandidate":
                    console.log("ICE CANDIDATE received");
                    insertICECandidate(data.payload);
                    break;
                case "callStarted":
                    console.log("call started ", data.callId);
                    // store ongoingcallid
                    setOngoingCallId(data.callId)
                    startCallTimer();

                case "endCall":
                    console.log("[initSocket] Handling 'endCall' event");
                    ToastAndroid.show(`Call Ended By ${data.fromUserData.full_name}`, 2000);
                    remoteEndCall();
                    navigate("Home")
                    // some logic
                    break;

                case "randomUserFound":
                    console.log("random user fouund : ", data.target)
                    sendOffer(data.target, true);
                    break;

                case "randomCallOffer":
                    // some logic
                    break;

                case "canceledRandomMatch":
                    console.log("[initSocket] Handling 'canceledRandomMatch' event");
                    // some logic
                    break;

                case "rejectedCall":
                    console.log("[initSocket] Handling 'rejectedCall' event");
                    ToastAndroid.show(`Call Rejected By ${data.fromUserData.full_name}`, 2000);
                    break;

                case "newUsersList":
                    if (data.usersCount < 1) {
                        console.log("refresh list :", data.error)
                        break;
                    }
                    useCallStore.getState().setUsersList(data.usersList);

                default:
                // console.log("[initSocket] Unknown message type:", data.data);
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
            console.error("[sendMessage] WebSocket is not open (state:", socket.readyState, ")");
            return;
        }
        console.log("send message:", message);
        socket.send(JSON.stringify(message));
    } catch (error) {
        console.error("[sendMessage] Error while sending message:", error);
    }
}
