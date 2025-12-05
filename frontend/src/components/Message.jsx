export default function Message({ mess, sender, name }) {
  const isMe = sender === "me";

  return (
    <div className={`flex w-full ${isMe ? "justify-end" : "justify-start"}`}>
      <div
        className={`max-w-[70%] px-4 py-3 rounded-2xl shadow-lg text-sm
        ${isMe ? "bg-blue-600 text-white rounded-br-none" : "bg-zinc-800 text-gray-200 rounded-bl-none"}`}
      >
        <p>{mess}</p>
        <span className="text-xs opacity-60 mt-1 block text-right">{name}</span>
      </div>
    </div>
  );
}
