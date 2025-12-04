import React from 'react'

function Message({mess , sender}) {
  return (
     <div className={`flex w-full ${sender == "me" ?"justify-end" : "justify-start"}`}>
              <div className="p-3 rounded-2xl bg-blue-500 text-black flex justify-end">
               {mess}
              </div>
            </div>
  )
}

export default Message