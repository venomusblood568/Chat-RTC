import { useEffect, useRef, useState } from "react";
import "./App.css";
import { Chatroom } from "./pages/chatroom";
import { Home } from "./pages/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {
  const [messages, setMessage] = useState([]);
  const wsRef = useRef()

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onmessage = (event) => {
      setMessage(m => [...m, event.data])
    }
    wsRef.current = ws;


    //clean up
    return() => {
      ws.close
    }
  },[]);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chatroom" element={<Chatroom messages={messages} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
