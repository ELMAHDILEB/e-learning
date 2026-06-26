import { useState, useRef, useEffect } from "react";
import { Send, Search, MoreVertical, Phone, Video, Paperclip, Smile, ArrowLeft } from "lucide-react";
import useSearch from "../../hooks/useSearch";

const CONTACTS = [
  { id: 1, name: "Sara Idrissi", role: "Instructor", avatar: "SI", online: true, unread: 2, lastMsg: "Can you review my course?", time: "09:12" },
  { id: 2, name: "Youssef Alami", role: "Student", avatar: "YA", online: true, unread: 0, lastMsg: "Thank you so much!", time: "08:45" },
  { id: 3, name: "Omar Tazi", role: "Instructor", avatar: "OT", online: false, unread: 1, lastMsg: "When will it be published?", time: "Yesterday" },
  { id: 4, name: "Fatima Zahra", role: "Student", avatar: "FZ", online: false, unread: 0, lastMsg: "I have a question about...", time: "Yesterday" },
  { id: 5, name: "Rim Kettani", role: "Instructor", avatar: "RK", online: true, unread: 0, lastMsg: "Course is ready for review", time: "Mon" },
  { id: 6, name: "Hassan Ouali", role: "Student", avatar: "HO", online: false, unread: 0, lastMsg: "Got it, thanks!", time: "Mon" },
  { id: 7, name: "Leila Bakkali", role: "Instructor", avatar: "LB", online: true, unread: 3, lastMsg: "Please check the update", time: "Sun" },
  { id: 8, name: "Bilal Mrani", role: "Student", avatar: "BM", online: false, unread: 0, lastMsg: "Okay I understand", time: "Sun" },
];

const INITIAL_MESSAGES = {
  1: [
    { id: 1, from: "them", text: "Hello! I just submitted my new React course for review.", time: "09:00" },
    { id: 2, from: "me", text: "Hi Sara! I'll take a look at it today.", time: "09:05" },
    { id: 3, from: "them", text: "Can you review my course?", time: "09:12" },
  ],
  2: [
    { id: 1, from: "them", text: "I finished the Python course, it was amazing!", time: "08:30" },
    { id: 2, from: "me", text: "Glad to hear that Youssef!", time: "08:40" },
    { id: 3, from: "them", text: "Thank you so much!", time: "08:45" },
  ],
  3: [
    { id: 1, from: "them", text: "I updated my course content.", time: "Yesterday" },
    { id: 2, from: "them", text: "When will it be published?", time: "Yesterday" },
  ],
  4: [{ id: 1, from: "them", text: "I have a question about the course material...", time: "Yesterday" }],
  5: [{ id: 1, from: "them", text: "Course is ready for review", time: "Mon" }],
  6: [{ id: 1, from: "them", text: "Got it, thanks!", time: "Mon" }],
  7: [
    { id: 1, from: "them", text: "I added new lectures to the course.", time: "Sun" },
    { id: 2, from: "them", text: "Please check the update", time: "Sun" },
    { id: 3, from: "them", text: "Also updated the thumbnails", time: "Sun" },
  ],
  8: [{ id: 1, from: "them", text: "Okay I understand", time: "Sun" }],
};

const Chat = () => {
  const [contacts, setContacts] = useState(CONTACTS);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [selected, setSelected] = useState(null);
  const [input, setInput] = useState("");
  const { search, setSearch, filtered: filteredContacts } = useSearch(contacts, ["name"]);
  const [showChat, setShowChat] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [selected, messages]);


  const handleSelect = (contact) => {
    setSelected(contact);
    setShowChat(true);
    setContacts((prev) =>
      prev.map((c) => (c.id === contact.id ? { ...c, unread: 0 } : c))
    );
  };

  const handleBack = () => {
    setShowChat(false);
    setSelected(null);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg = {
      id: Date.now(),
      from: "me",
      text: input.trim(),
      time: new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => ({
      ...prev,
      [selected.id]: [...(prev[selected.id] || []), newMsg],
    }));
    setContacts((prev) =>
      prev.map((c) => (c.id === selected.id ? { ...c, lastMsg: input.trim(), time: newMsg.time } : c))
    );
    setInput("");
  };

  const currentMessages = messages[selected?.id] || [];

  return (
    <div className="flex h-[calc(100vh-130px)] bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">

      {/* Contacts Sidebar */}
      <div className={`
        flex flex-col border-r border-[var(--border)] bg-[var(--card)]
        w-full md:w-[280px] md:flex-shrink-0
        ${showChat ? "hidden md:flex" : "flex"}
      `}>
        <div className="p-4 border-b border-[var(--border)]">
          <h2 className="text-sm font-medium mb-3">Messages</h2>
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text)] opacity-40" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors"
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {filteredContacts.map((contact) => (
            <button
              key={contact.id}
              onClick={() => handleSelect(contact)}
              className={`w-full flex items-center gap-3 px-4 py-3 transition-colors text-left border-b border-[var(--border)] last:border-0 ${
                selected?.id === contact.id ? "bg-cyan-500/10" : "hover:bg-[var(--bg)]"
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
                  <span className={`text-xs font-medium truncate ${selected?.id === contact.id ? "text-cyan-500" : ""}`}>
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
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className={`
        flex-1 flex flex-col min-w-0 bg-[var(--card)]
        w-full md:flex
        ${showChat ? "flex" : "hidden md:flex"}
      `}>
        {selected ? (
          <>
            {/* Chat Header */}
            <div className="h-[60px] flex items-center justify-between px-4 border-b border-[var(--border)] flex-shrink-0">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleBack}
                  className="md:hidden p-1.5 rounded-lg hover:bg-[var(--bg)] text-[var(--text)] opacity-60 hover:opacity-100 transition-all"
                >
                  <ArrowLeft size={18} />
                </button>
                <div className="relative">
                  <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-medium">
                    {selected.avatar}
                  </div>
                  {selected.online && (
                    <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-500 rounded-full border-2 border-[var(--card)]" />
                  )}
                </div>
                <div>
                  <p className="text-sm font-medium">{selected.name}</p>
                  <p className="text-[10px] text-[var(--text)] opacity-40">
                    {selected.online ? "Online" : "Offline"} · {selected.role}
                  </p>
                </div>
              </div>
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

            {/* Messages */}
            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {currentMessages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.from === "me" ? "justify-end" : "justify-start"}`}>
                  {msg.from === "them" && (
                    <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-white text-[9px] font-medium mr-2 flex-shrink-0 mt-1">
                      {selected.avatar}
                    </div>
                  )}
                  <div className={`max-w-[75%] sm:max-w-[65%] flex flex-col gap-1 ${msg.from === "me" ? "items-end" : "items-start"}`}>
                    <div className={`px-3 py-2 rounded-2xl text-sm ${
                      msg.from === "me"
                        ? "bg-cyan-500 text-white rounded-tr-sm"
                        : "bg-[var(--bg)] text-[var(--text)] rounded-tl-sm"
                    }`}>
                      {msg.text}
                    </div>
                    <span className="text-[10px] text-[var(--text)] opacity-30">{msg.time}</span>
                  </div>
                </div>
              ))}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div className="px-4 py-3 border-t border-[var(--border)] flex items-center gap-2">
              <button className="p-2 rounded-lg hover:bg-[var(--bg)] text-[var(--text)] opacity-40 hover:opacity-100 transition-all">
                <Paperclip size={16} />
              </button>
              <button className="p-2 rounded-lg hover:bg-[var(--bg)] text-[var(--text)] opacity-40 hover:opacity-100 transition-all">
                <Smile size={16} />
              </button>
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 text-sm rounded-xl bg-[var(--bg)] border border-[var(--border)] text-[var(--text)] outline-none focus:border-cyan-500 transition-colors"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim()}
                className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Send size={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 hidden md:flex flex-col items-center justify-center gap-3 text-[var(--text)] opacity-30">
            <div className="w-16 h-16 rounded-full bg-[var(--bg)] flex items-center justify-center">
              <Send size={24} />
            </div>
            <p className="text-sm">Select a conversation</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;