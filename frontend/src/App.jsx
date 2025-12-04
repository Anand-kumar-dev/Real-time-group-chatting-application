import { useEffect, useState } from "react";
import Message from "./components/Message";

function App() {
  const [username, setusername] = useState("");
  const [submitted, setsubmitted] = useState();
  const [messages, setMessages] = useState([]);
  const [usermess, setusermess] = useState();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    setsubmitted(true);
  };

  const handleusermess = (e) => {
    e.preventDefault();

    setMessages((prev) => [
      ...prev,
      {
        mess: usermess,
        sender: "me",
      },
    ]);

    setusermess("");
  };

  return (
    <>
      <div className="flex justify-center items-center bg-black text-white w-screen h-screen">
        {/* {!submitted && (
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
        )} */}
        <div className="bg-black flex justify-center flex-col items-center text-white">
          <div className="flex p-2 gap-2">
            <h1 className="text-blue-500">group chat...</h1>
            <div className="flex">member</div>
          </div>
          <div className="flex bg-white flex-col gap-3 rounded-2xl   h-[calc(100vh-150px)] overflow-y-auto text-black w-4xl p-4">
            {messages.map((mess, index) => (
              <Message key={index} mess={mess.mess} sender={mess.sender} />
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
      </div>
    </>
  );
}

export default App;
