import useAuthStore from "../store/useAuthStore";
import { useCallStore } from "../store/useCallStore";
import { wsURL } from "../utils/constants";



let socket;


// type Message struct {
// 	Type         string     `json:"type"`
// 	User         types.User `json:"user,omitempty"`
// 	Target       int64      `json:"target,omitempty"`
// 	Payload      any        `json:"payload,omitempty"`
// 	From         int64      `json:"from,omitempty"`
// 	FromUserData any        `json:"fromUserData,omitempty"`
// }

export function initSocket() {

    if (socket) return socket;

    socket = new WebSocket(wsURL)

    socket.onopen = () => {
        console.log('WebSocket connection established');

        const data = {
            type: 'initialize',
            user: useAuthStore.getState().user.user,
        }
        socket.send(JSON.stringify(data));
    };

    socket.onerror = (error) => {
        console.error('WebSocket error:', error);
    };

    socket.onmessage = (msg) => {
        const data = JSON.parse(msg.data);
        console.log('Received message:', data);
        switch (data.type) {
            case "initialized":
                console.log("1")
                useCallStore.getState().setUsersList(data.online_users);
                break;
            case "offer":
                // store offer
                useCallStore.getState().showIncomingCallModal(data.from, data.payload);
                break;
            case "answer":
            //some logic

            case "icecandidate":
            //some logic

            case "endCall":
            //some logic

            case "randomCallOffer":
            //some logic

            case "canceledRandomMatch":
            //some logic

            case "rejectedCall":
            //some logic

        }
    }

    return socket;
}


export function sendMessage(message: any) {
    if (!socket || socket.readyState !== WebSocket.OPEN) {
        console.error('WebSocket is not open. Cannot send message.');
        return;
    }
    socket.send(JSON.stringify(message));
}