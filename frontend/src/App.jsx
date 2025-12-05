import { useEffect, useState } from "react";
import Message from "./components/Message";
import { socket } from "./socket";

function App() {
  const [username, setusername] = useState("");
  const [submitted, setsubmitted] = useState(false);
  const [messages, setMessages] = useState([]);
  const [usermess, setusermess] = useState("");
  const [someconnect, setsomeconnect] = useState("");
  const [somedisconnect, setsomedisconnect] = useState("");
  const [member, setmember] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("members", (list) => {
      setmember(list);
    });

    socket.on("message", (data) => {
      setMessages((prev) => [
        ...prev,
        { mess: data.mess, sender: "other", name: data.name },
      ]);
    });

    socket.on("onconnect", (msg) => {
      setsomeconnect(msg);
      setTimeout(() => setsomeconnect(""), 3000);
    });

    socket.on("userLeft", (data) => {
      setsomedisconnect(data);
      setTimeout(() => setsomedisconnect(""), 3000);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setsubmitted(true);
    socket.emit("onconnect", { name: username });
  };

  const handleusermess = (e) => {
    e.preventDefault();

    setMessages((prev) => [
      ...prev,
      { mess: usermess, sender: "me", name: username },
    ]);

    socket.emit("message", {
      name: username,
      mess: usermess,
      sender: "other",
    });

    setusermess("");
  };

  return (
    <div className="flex justify-center items-center bg-[#0a0a0a] text-white w-screen h-screen p-4">

      {/* ---------------- NAME INPUT ---------------- */}
      {!submitted ? (
        <div className="w-full max-w-md bg-[#111] border border-zinc-800 p-6 rounded-2xl shadow-xl">
          <h2 className="text-2xl font-bold mb-4 text-white">Enter your name</h2>

          <input
            type="text"
            onChange={(e) => setusername(e.target.value)}
            className="bg-black border border-zinc-700 text-white w-full p-3 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 transition"
          />

          <button
            onClick={handleSubmit}
            className="mt-4 w-full bg-blue-600 hover:bg-blue-500 py-3 rounded-lg font-medium transition"
          >
            Continue
          </button>
        </div>
      ) : (
        /* ---------------- MAIN CHAT PAGE ---------------- */
        <div className="w-full max-w-4xl flex flex-col h-full">

          {/* ---- TOP NAV ---- */}
          <div className="w-full bg-[#111] border border-zinc-800 px-4 py-3 rounded-2xl flex justify-between items-center mb-4 shadow-lg">
            
            <div className="flex flex-col gap-1">
              <h1 className="text-xl font-semibold text-white">Group Chat</h1>
              
              <select className="bg-black text-white px-3 py-2 rounded-lg border border-zinc-700">
                {member.map((user, i) => (
                  <option className="bg-black" key={i}>
                    {user}
                  </option>
                ))}
              </select>
            </div>

            <div className="text-sm text-gray-300">
              Signed in as <span className="font-bold text-blue-400">{username}</span>
            </div>
          </div>

          {/* CONNECT / DISCONNECT NOTICES */}
          {someconnect && (
            <div className="text-green-400 text-center mb-2">{someconnect.name} joined</div>
          )}
          {somedisconnect && (
            <div className="text-red-400 text-center mb-2">{somedisconnect.name} left</div>
          )}

          {/* ---- MESSAGES ---- */}
          <div className="flex-1 bg-[#0f0f0f] border border-zinc-800 rounded-2xl p-4 overflow-y-auto shadow-inner flex flex-col gap-3">
            {messages.map((mess, index) => (
              <Message
                key={index}
                mess={mess.mess}
                sender={mess.sender}
                name={mess.name}
              />
            ))}
          </div>

          {/* ---- INPUT BOX ---- */}
          <div className="flex gap-2 mt-4">
            <input
              value={usermess}
              onChange={(e) => setusermess(e.target.value)}
              className="flex-1 p-3 rounded-xl bg-black border border-zinc-700 text-white outline-none focus:ring-2 focus:ring-blue-600 transition"
              type="text"
              placeholder="Type a message..."
            />

            <button
              onClick={handleusermess}
              className="bg-blue-600 hover:bg-blue-500 px-6 py-3 rounded-xl text-white font-medium transition"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
