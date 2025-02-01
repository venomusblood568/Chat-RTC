import { useEffect, useRef, useState } from "react";
import { generateRandomRoomId } from "../genRandom";

export function Home() {
  const[roomId, setroomId] = useState("")

  const createNewRoom = () => {
    const newRoomId = generateRandomRoomId();
    setroomId(newRoomId)
  }

  const copyRoomId = () =>{
    if(roomId){
      navigator.clipboard.writeText(roomId);
      alert("Room Id Copied to clipboard")
    }
  }

  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-black ">
        <div className="bg-black border border-gray-700 p-10 rounded-xl shadow-lg text-white w-full max-w-2xl h-[350px] ">
          <div className="space-y-4">
            <div className="text-lg">
              <h1 className="text-xl font-bold">Real Time Chat</h1>
              <p className="text-gray-400 text-md mt-1">
                NOTE : Temporary room that expires after all users exit
              </p>
            </div>
            {/* Create New Room Section */}
            <div className="flex items-center space-x-4">
              <button
                onClick={createNewRoom}
                className="bg-white text-black py-2 px-4 rounded-md font-semibold"
              >
                Create New Room
              </button>
              <input
                type="text"
                placeholder="Room Code ..."
                value={roomId}
                readOnly // Make the input read-only so users can't edit it
                className="bg-black text-white border border-gray-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 w-64"
              />
              <button 
                onClick = {copyRoomId}
                disabled = {!roomId}
                className="bg-white text-black py-2 px-5 rounded-md font-semibold">
                Copy....
              </button>
            </div>

            {/* Join Room Section */}
            <div className="mt-4 space-y-3">
              <input
                type="text"
                placeholder="Enter your name..."
                className="w-full bg-black text-white border border-gray-700 px-4 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
              />

              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="Enter Room Code..."
                  className="flex-1 bg-black text-white border border-gray-700 px-4 py-1 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
                />
                <button className="bg-white text-black px-4 py-1 rounded-md font-semibold">
                  Join Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

