export function Chatroom({ messages = [] }: { messages?: string[] }) {
  
  return (
    <>
      <div className="flex items-center justify-center min-h-screen bg-black">
        <div className="bg-black border border-gray-700 p-10 rounded-xl shadow-lg text-white w-full max-w-2xl h-[750px] flex flex-col">
          {/* Header */}
          <div className="text-lg space-y-5">
            <h1 className="text-3xl font-bold">Real Time Chat</h1>
            <p className="text-gray-400 text-md ">
              NOTE: Temporary room that expires after all users exit
            </p>

            {/* Room Info */}
            <div className=" text-amber-50 bg-neutral-700 rounded px-4 py-2 flex justify-between ">
              <span>Room code: #####</span>
              <span>Users: #</span>
            </div>
          </div>

          {/* Chat Box (Expands to Fill Available Space) */}
          <div className="border border-gray-700 p-6 rounded-xl shadow-lg text-white w-full flex-grow overflow-auto mt-6 font-semibold">
            {/* Chat messages will go here */}
            <div className="flex flex-col">
              {messages?.map((msg, index) => (
                <div
                  key={index}
                  className="bg-white text-black mb-2 p-2 rounded-md inline-block max-w-fit "
                >
                  <span>{msg}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Input & Send Button (Fixed at Bottom) */}
          <div className="mt-4 flex space-x-2">
            <input
              type="text"
              placeholder="Enter your message..."
              className="flex-1 bg-black text-white border border-gray-700 px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
            <button 
              onClick={() =>{
                const message = document.getElementById("message")?.value;
                wsRef.current.send(JSON.stringify({
                  type: "chat",
                  payload:{
                    message:message
                  }
                }))
              }}
              className="bg-white text-black px-4 py-2 rounded-md font-semibold">
              Send
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

