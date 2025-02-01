import { WebSocketServer, WebSocket } from "ws";

const wss = new WebSocketServer({ port: 8080 });

let userCount = 0;

//schema 
interface User{
  socket: WebSocket,
  room: string
}

let allSockets: User[] = [];

wss.on("connection", (socket) => {

  userCount = userCount + 1;
  console.log("User connected #", userCount);

  // For sending the message
  socket.on("message", (message) => {
    //string to object conversion
   //@ts-ignore
    const parsedMessage = JSON.parse(message)
    if(parsedMessage.type === "join"){
      allSockets.push({
        socket,
        room: parsedMessage.payload.roomId
      })
    }

    if(parsedMessage.type === "chat"){
      // Find the room of the user who sent the message
      let currentUserRoom = null;
      for (let i = 0; i < allSockets.length; i++) {
        if (allSockets[i].socket === socket) {
          currentUserRoom = allSockets[i].room;
        }
      }

      for (let i = 0; i < allSockets.length; i++) {
        if(allSockets[i].room === currentUserRoom){
          allSockets[i].socket.send(parsedMessage.payload.message)
        }
      }
    }
  });
});
