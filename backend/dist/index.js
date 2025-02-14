"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ws_1 = require("ws");
const wss = new ws_1.WebSocketServer({ port: 8080 });
let allSockets = [];
wss.on("connection", (socket) => {
    let currentUserRoom = null;
    // For sending the message
    socket.on("message", (message) => {
        //string to object conversion
        const parsedMessage = JSON.parse(message.toString());
        if (parsedMessage.type === "join") {
            allSockets.push({
                socket,
                room: parsedMessage.payload.roomId,
            });
            currentUserRoom = parsedMessage.payload.roomId;
            if (currentUserRoom) {
                updateUserCount(currentUserRoom);
            }
            console.log(`User joined room: ${currentUserRoom}`);
        }
        if (parsedMessage.type === "chat" && currentUserRoom) {
            console.log(`Message in Rooms ${currentUserRoom}:${parsedMessage.payload.message}`);
            allSockets.forEach((user) => {
                if (user.room === currentUserRoom && user.socket.readyState === ws_1.WebSocket.OPEN) {
                    user.socket.send(JSON.stringify({
                        type: "chat",
                        payload: {
                            message: parsedMessage.payload.message
                        }
                    }));
                }
            });
        }
    });
    //code ensures that when a user disconnects, they are removed from the list of active sockets, and the room's user count is updated accordingly.
    socket.on("close", () => {
        if (currentUserRoom) {
            allSockets = allSockets.filter((user) => user.socket !== socket);
            updateUserCount(currentUserRoom);
        }
    });
});
function updateUserCount(room) {
    const roomUser = allSockets.filter((user) => user.room === room);
    const userCount = roomUser.length;
    for (let i = 0; i < roomUser.length; i++) {
        const user = roomUser[i];
        const message = {
            type: "user-count",
            payload: { userCount }
        };
        user.socket.send(JSON.stringify(message));
    }
    console.log(`Room ${room} user count: ${userCount}`);
}
