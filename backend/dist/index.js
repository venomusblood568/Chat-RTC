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
                room: parsedMessage.payload.roomId
            });
            currentUserRoom = parsedMessage.payload.roomId;
            if (currentUserRoom) {
                updateUserCount(currentUserRoom);
            }
            console.log(`User joined room: ${currentUserRoom}`);
        }
        if (parsedMessage.type === "chat") {
            // Find the room of the user who sent the message
            if (currentUserRoom) {
                for (let i = 0; i < allSockets.length; i++) {
                    if (allSockets[i].room === currentUserRoom) {
                        allSockets[i].socket.send(parsedMessage.payload.message);
                    }
                }
            }
        }
    });
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
