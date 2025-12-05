import { useEffect, useState } from "react";
import Message from "./components/Message";
import { socket } from "./socket";
import { connect, io } from "socket.io-client";

function App() {
  const [username, setusername] = useState("");
  const [submitted, setsubmitted] = useState();
  const [messages, setMessages] = useState([]);
  const [usermess, setusermess] = useState("");
  const [someconnect, setsomeconnect] = useState("");
  const [member, setmember] = useState([]);

  useEffect(() => {
    socket.on("connect", () => {
      console.log(socket.id);
    });

    socket.on("members", (list) => {
      console.log(list);
      setmember(list);
    });

    socket.on("message", (data) => {
      setMessages((prev) => [
        ...prev,
        {
          mess: data.mess,
          sender: "other",
          name: data.name,
        },
      ]);
    });

    socket.on("onconnect", (msg) => {
      setsomeconnect(msg);

      setTimeout(() => {
        setsomeconnect("");
      }, 3000);
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    setsubmitted(true);

    socket.emit("onconnect", {
      name: username,
    });
  };

  const handleusermess = (e) => {
    e.preventDefault();
    setMessages((prev) => [
      ...prev,
      {
        mess: usermess,
        sender: "me",
        name: username,
      },
    ]);

    socket.emit("message", {
      name: username,
      mess: usermess,
      sender: "other",
    });

    setusermess("");
  };

  return (
    <>
      <div className="flex justify-center items-center bg-black text-white w-screen h-screen">
        {!submitted ? (
          <div className="w-fit h-2xl bg-blue-400 p-2 rounded-xl">
            <h2 className="p-4 text-black text-2xl font-bold">
              enter your name ...
            </h2>
            <input
              type="text"
              onChange={(e) => {
                setusername(e.target.value);
              }}
              className="bg-white text-black rounded-xl p-2 text-xl"
            />
            <button
              type="submit"
              onClick={handleSubmit}
              className="p-2 rounded-xl ml-2"
            >
              Submit
            </button>
          </div>
        ) : (
          <div className="bg-black flex justify-center flex-col items-center text-white">
            <div className="flex p-2 gap-8 justify-center items-center">
              <h1 className="text-blue-500">
                group chat...
                <select className="text-xl text-white p-4 border-0">
                  {member.map((user, i) => (
                    <option className="bg-black" key={i} value={user}>
                      {user}
                     { console.log(user)}
                    </option>
                  ))}
                </select>
                {someconnect ? (
                  <span> {someconnect.name} is connecting</span>
                ) : (
                  ``
                )}
              </h1>
              <div className="flex text-xl p-2">
                sgined in as
                <div className="font-bold pl-2">{username}</div>
              </div>
            </div>
            <div className="flex bg-white flex-col gap-3 rounded-2xl   h-[calc(100vh-150px)] overflow-y-auto text-black w-4xl p-4">
              {messages.map((mess, index) => (
                <Message
                  key={index}
                  mess={mess.mess}
                  sender={mess.sender}
                  name={mess.name}
                />
              ))}
            </div>

            {/* input and send */}

            <div className="flex gap-2 w-full mt-4 items-center">
              <input
                onChange={(e) => {
                  setusermess(e.target.value);
                }}
                value={usermess}
                className="flex-1 p-2 rounded-xl bg-white text-black text-xl"
                type="text"
              />
              <button
                onClick={handleusermess}
                className="bg-blue-600 px-4 py-2 rounded-xl text-white"
              >
                Send
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
