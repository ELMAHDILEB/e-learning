import { useState, useRef } from "react";
import { Send, Paperclip, Smile, X } from "lucide-react";

const EMOJIS = [
  "😀", "😃", "😄", "😁", "😆", "😅", "🤣", "😂",
  "😊", "😇", "🙂", "🙃", "😉", "😌", "😍", "🥰",
  "😘", "😗", "😚", "😙", "🥲", "😋", "😛", "😜",
  "🤪", "😝", "🤑", "🤗", "🤭", "🤫", "🤔", "🤐",
  "🤨", "😐", "😑", "😶", "😏", "😒", "🙄", "😬",
  "🤥", "😌", "😔", "😪", "🤤", "😴", "😷", "🤒",
  "🤕", "🤢", "🤮", "🤮", "🤧", "🤨", "😈", "👿",
  "💀", "☠️", "💩", "🤡", "👹", "👺", "👻", "👽",
  "🎉", "🎊", "🎈", "❤️", "🧡", "💛", "💚", "💙",
  "💜", "🖤", "🤍", "🤎", "💔", "💕", "💞", "💓",
  "💗", "💖", "💘", "💝", "💟", "👍", "👎", "👏",
  "🙌", "👐", "🤝", "🤲", "🤜", "🤛", "✊", "👊",
];

const MessageInput = ({ input, onInputChange, onSend, attachedFiles = [], onFilesChange = () => {} }) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const fileInputRef = useRef(null);

  const handleEmojiClick = (emoji) => {
    onInputChange(input + emoji);
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    onFilesChange([...attachedFiles, ...files]);
  };

  const removeFile = (index) => {
    onFilesChange(attachedFiles.filter((_, i) => i !== index));
  };

  const handleSendWithFiles = () => {
    // Send message + files info
    if (input.trim() || attachedFiles.length > 0) {
      onSend();
      // Files cleared by parent component (Chat.jsx)
      setShowEmojiPicker(false);
    }
  };

  return (
    <div className="border-t border-[var(--border)] bg-[var(--card)]">
      {/* Emoji Picker */}
      {showEmojiPicker && (
        <div className="p-3 border-b border-[var(--border)] bg-[var(--bg)] max-h-40 overflow-y-auto">
          <div className="flex flex-wrap gap-1">
            {EMOJIS.map((emoji, index) => (
              <button
                key={index}
                onClick={() => handleEmojiClick(emoji)}
                className="p-2 hover:bg-[var(--card)] rounded text-lg transition-colors"
              >
                {emoji}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Attached Files Preview */}
      {attachedFiles.length > 0 && (
        <div className="px-4 py-2 bg-[var(--bg)] border-b border-[var(--border)] flex flex-wrap gap-2">
          {attachedFiles.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-3 py-1 bg-[var(--card)] border border-[var(--border)] rounded-lg text-xs"
            >
              <span className="truncate max-w-[150px]">📎 {file.name}</span>
              <button
                onClick={() => removeFile(index)}
                className="text-[var(--text)] opacity-50 hover:opacity-100"
              >
                <X size={14} />
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="px-4 py-3 flex items-center gap-2">
        {/* File Button */}
        <button
          onClick={() => fileInputRef.current?.click()}
          className="p-2 rounded-lg hover:bg-[var(--bg)] text-[var(--text)] opacity-40 hover:opacity-100 transition-all"
          title="Attach files"
        >
          <Paperclip size={16} />
        </button>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />

        {/* Emoji Button */}
        <button
          onClick={() => setShowEmojiPicker(!showEmojiPicker)}
          className={`p-2 rounded-lg transition-all ${
            showEmojiPicker
              ? "bg-cyan-500/20 text-cyan-500 opacity-100"
              : "hover:bg-[var(--bg)] text-[var(--text)] opacity-40 hover:opacity-100"
          }`}
          title="Emoji picker"
        >
          <Smile size={16} />
        </button>

        {/* Message Input */}
        <input
          type="text"
          value={input}
          onChange={(e) => onInputChange(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSendWithFiles()}
          placeholder="Type a message..."
          className="flex-1 px-4 py-2 text-sm rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors"
        />

        {/* Send Button */}
        <button
          onClick={handleSendWithFiles}
          disabled={!input.trim() && attachedFiles.length === 0}
          className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        >
          <Send size={16} />
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
