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
//             user: useAuthStore.getState().user.user,
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
import { useCallStore } from "../store/useCallStore";
import { wsURL } from "../utils/constants";
import { acceptAnswer, insertICECandidate } from "./webrtc";

let socket;

export function initSocket() {
    console.log("[initSocket] Initializing WebSocket...");

    if (socket) {
        console.log("[initSocket] Socket already exists, returning existing socket");
        return socket;
    }

    console.log("[initSocket] Creating new WebSocket connection to:", wsURL);
    socket = new WebSocket(wsURL);

    socket.onopen = () => {
        console.log("[initSocket] WebSocket connection established");

        const data = {
            type: 'initialize',
            user: useAuthStore.getState().user.user,
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
                    console.log("OFFER received", data);
                    useCallStore.getState().showIncomingCallModal(data.fromUserData, data.payload);
                    break;

                case "answer":
                    console.log("[initSocket] Handling 'answer' event");
                    acceptAnswer(data.payload);
                    break;

                case "icecandidate":
                    console.log("[initSocket] Handling 'icecandidate' event");
                    insertICECandidate(data.payload);
                    break;

                case "endCall":
                    console.log("[initSocket] Handling 'endCall' event");
                    // some logic
                    break;

                case "randomCallOffer":
                    console.log("[initSocket] Handling 'randomCallOffer' event");
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
            console.error("[sendMessage] WebSocket is not open (state:", socket.readyState, ")");
            return;
        }
        console.log("send message:", message);
        socket.send(JSON.stringify(message));
    } catch (error) {
        console.error("[sendMessage] Error while sending message:", error);
    }
}
