import { MoreVertical, Phone, Video, ArrowLeft } from "lucide-react";

const ChatHeader = ({ contact, onBack }) => {
  return (
    <div className="h-[60px] flex items-center justify-between px-4 border-b border-[var(--border)] flex-shrink-0">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="md:hidden p-1.5 rounded-lg hover:bg-[var(--bg)] text-[var(--text)] opacity-60 hover:opacity-100 transition-all"
        >
          <ArrowLeft size={18} />
        </button>
        <div className="relative">
          <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-medium">
            {contact.avatar}
          </div>
          {contact.online && (
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-[var(--card)]" />
          )}
        </div>
        <div>
          <p className="text-sm font-medium">{contact.name}</p>
          <p className="text-[10px] text-[var(--text)] opacity-40">
            {contact.online ? "Online" : "Offline"} · {contact.role}
          </p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1">
        <button className="p-2 rounded-lg hover:bg-[var(--bg)] text-[var(--text)] opacity-50 hover:opacity-100 transition-all">
          <Phone size={16} />
        </button>
        <button className="p-2 rounded-lg hover:bg-[var(--bg)] text-[var(--text)] opacity-50 hover:opacity-100 transition-all">
          <Video size={16} />
        </button>
        <button className="p-2 rounded-lg hover:bg-[var(--bg)] text-[var(--text)] opacity-50 hover:opacity-100 transition-all">
          <MoreVertical size={16} />
        </button>
      </div>
    </div>
  );
};

export default ChatHeader;