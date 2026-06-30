import { useEffect, useRef } from "react";

const MessagesList = ({ messages, selectedContact }) => {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
      {messages.map((msg) => (
        <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
          {msg.from === "them" && (
            <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-white text-[9px] font-medium mr-2 flex-shrink-0 mt-1">
              {selectedContact.avatar}
            </div>
          )}
          <div className={`max-w-[75%] sm:max-w-[65%] flex flex-col gap-1 ${msg.from === "me" ? "items-end" : "items-start"}`}>
            {/* Message Text */}
            {msg.text && (
              <div
                className={`px-3 py-2 rounded-2xl text-sm ${
                  msg.from === "me"
                    ? "bg-cyan-500 text-white rounded-tr-sm"
                    : "bg-[var(--bg)] text-[var(--text)] rounded-tl-sm"
                }`}
              >
                {msg.text}
              </div>
            )}
            
            {/* Files Display */}
            {msg.files && msg.files.length > 0 && (
              <div className="flex flex-col gap-1 w-full">
                {msg.files.map((file, index) => (
                  <div
                    key={index}
                    className={`px-3 py-2 rounded-2xl text-xs flex items-center gap-2 max-w-full ${
                      msg.from === "me"
                        ? "bg-cyan-600 text-white rounded-tr-sm"
                        : "bg-[var(--bg)] text-[var(--text)] border border-[var(--border)] rounded-tl-sm"
                    }`}
                  >
                    <span>📎</span>
                    <span className="truncate flex-1">{file.name}</span>
                    <span className="opacity-70 flex-shrink-0">
                      {file.size ? `${(file.size / 1024).toFixed(0)}KB` : ""}
                    </span>
                  </div>
                ))}
              </div>
            )}

            {/* Timestamp */}
            <span className="text-[10px] text-[var(--text)] opacity-30">{msg.time}</span>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessagesList;
