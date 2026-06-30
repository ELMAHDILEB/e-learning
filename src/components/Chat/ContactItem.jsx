
const ContactItem = ({ contact, isSelected, onSelect }) => {
  return (
    <button
      onClick={() => onSelect(contact)}
      className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left border-b border-[var(--border)] last:border-0 ${
        isSelected ? "bg-cyan-500/10" : "hover:bg-[var(--bg)]"
      }`}
    >
      <div className="relative flex-shrink-0">
        <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-medium">
          {contact.avatar}
        </div>
        {contact.online && (
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-[var(--card)]" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between">
          <span className={`text-xs font-medium truncate ${isSelected ? "text-cyan-500" : ""}`}>
            {contact.name}
          </span>
          <span className="text-[10px] text-[var(--text)] opacity-40 flex-shrink-0 ml-1">{contact.time}</span>
        </div>
        <div className="flex items-center justify-between mt-0.5">
          <span className="text-[11px] text-[var(--text)] opacity-40 truncate">{contact.lastMsg}</span>
          {contact.unread > 0 && (
            <span className="flex-shrink-0 ml-1 w-4 h-4 rounded-full bg-cyan-500 text-white text-[9px] flex items-center justify-center">
              {contact.unread}
            </span>
          )}
        </div>
      </div>
    </button>
  );
};

export default ContactItem;