import React from 'react'

function Message({mess , sender , name}) {
  return (
    <div className={`flex w-full ${sender === "me" ? "justify-end" : "justify-start"}`}>
  <div className="p-3 rounded-2xl bg-blue-500 text-white flex flex-col max-w-xs">
    
    <span className="text-base text-xl text-black">{mess}</span>

    <span className="text-s text-white  mt-1 self-end opacity-80">
      {name}
    </span>

  </div>
</div>


  )
}

export default Message