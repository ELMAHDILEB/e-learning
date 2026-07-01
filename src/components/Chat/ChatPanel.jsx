import { useState, useRef, useEffect, useCallback } from "react";
import { Send, Search, ArrowLeft, UserPlus } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";
import useRealtime from "../../hooks/useRealtime";
import {
  getConversations,
  getContacts,
  getMessages,
  sendMessage,
  startConversation,
  formatContact,
  roleLabel,
} from "../../services/messages";

const POLL_MS = 3000;

const ChatPanel = () => {
  const { user } = useAuth();
  const [conversations, setConversations] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [selected, setSelected] = useState(null);
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [search, setSearch] = useState("");
  const [showChat, setShowChat] = useState(false);
  const [showNewChat, setShowNewChat] = useState(false);
  const [loading, setLoading] = useState(true);
  const [sending, setSending] = useState(false);
  const bottomRef = useRef(null);
  const lastMsgIdRef = useRef(0);

  const loadConversations = useCallback(async () => {
    try {
      const { data } = await getConversations();
      setConversations(data);
    } catch {
      /* ignore */
    } finally {
      setLoading(false);
    }
  }, []);

  const loadContacts = useCallback(async () => {
    try {
      const { data } = await getContacts();
      setContacts(data.map(formatContact));
    } catch {
      /* ignore */
    }
  }, []);

  const loadMessages = useCallback(async (convId, afterId = null) => {
    try {
      const { data } = await getMessages(convId, afterId || undefined);
      if (afterId && data.length) {
        setMessages((prev) => [...prev, ...data]);
      } else if (!afterId) {
        setMessages(data);
      }
      if (data.length) {
        lastMsgIdRef.current = data[data.length - 1].id;
      }
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    loadConversations();
    loadContacts();
  }, [loadConversations, loadContacts]);

  useRealtime("message.sent", (payload) => {
    if (payload?.message) {
      const msg = payload.message;
      if (msg.conversation_id === conversationId) {
        setMessages((prev) => {
          if (prev.some((m) => m.id === msg.id)) return prev;
          return [...prev, msg];
        });
        lastMsgIdRef.current = msg.id;
      }
    }
    loadConversations();
    if (conversationId && !payload?.message) {
      if (lastMsgIdRef.current) {
        loadMessages(conversationId, lastMsgIdRef.current);
      } else {
        loadMessages(conversationId);
      }
    }
  }, [user?.id, conversationId, loadConversations, loadMessages], POLL_MS);

  useEffect(() => {
    if (!conversationId) return;
    loadMessages(conversationId);
  }, [conversationId, loadMessages]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const openConversation = async (conv) => {
    setSelected(conv.other_user);
    setConversationId(conv.id);
    setShowChat(true);
    setShowNewChat(false);
    lastMsgIdRef.current = 0;
    await loadMessages(conv.id);
    loadConversations();
  };

  const startNewChat = async (contact) => {
    try {
      const { data } = await startConversation(contact.id);
      setSelected(contact);
      setConversationId(data.id);
      setShowChat(true);
      setShowNewChat(false);
      setMessages([]);
      lastMsgIdRef.current = 0;
      loadConversations();
    } catch {
      /* ignore */
    }
  };

  const handleSend = async () => {
    if (!input.trim() || !conversationId || sending) return;
    setSending(true);
    try {
      const { data } = await sendMessage(conversationId, input.trim());
      setMessages((prev) => [...prev, data]);
      lastMsgIdRef.current = data.id;
      setInput("");
      loadConversations();
    } finally {
      setSending(false);
    }
  };

  const formatTime = (dateStr) => {
    const d = new Date(dateStr);
    return d.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit" });
  };

  const filteredConversations = conversations.filter((c) =>
    c.other_user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  const filteredContacts = contacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const avatar = (name) =>
    name?.split(" ").map((n) => n[0]).join("").slice(0, 2).toUpperCase() || "?";

  return (
    <div className="flex h-[calc(100vh-130px)] bg-[var(--card)] rounded-xl border border-[var(--border)] overflow-hidden">
      {/* Sidebar */}
      <div className={`flex flex-col border-r border-[var(--border)] w-full md:w-[280px] md:flex-shrink-0 ${showChat ? "hidden md:flex" : "flex"}`}>
        <div className="p-4 border-b border-[var(--border)]">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-medium">Messages</h2>
            <button onClick={() => setShowNewChat(!showNewChat)}
              className="p-1.5 rounded-lg hover:bg-[var(--bg)] text-cyan-500" title="New conversation">
              <UserPlus size={16} />
            </button>
          </div>
          <div className="relative">
            <Search size={13} className="absolute left-3 top-1/2 -translate-y-1/2 opacity-40" />
            <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-8 pr-3 py-2 text-xs rounded-lg bg-[var(--bg)] border border-[var(--border)] outline-none focus:border-cyan-500" />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {showNewChat ? (
            filteredContacts.map((contact) => (
              <button key={contact.id} onClick={() => startNewChat(contact)}
                className="w-full flex items-center gap-3 px-4 py-3 hover:bg-[var(--bg)] text-left border-b border-[var(--border)]">
                <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-medium">
                  {contact.avatar}
                </div>
                <div>
                  <p className="text-xs font-medium">{contact.name}</p>
                  <p className="text-[10px] opacity-40">{contact.role}</p>
                </div>
              </button>
            ))
          ) : loading ? (
            <p className="text-xs opacity-40 p-4">Loading...</p>
          ) : filteredConversations.length === 0 ? (
            <p className="text-xs opacity-40 p-4">No conversations yet. Start a new chat.</p>
          ) : (
            filteredConversations.map((conv) => (
              <button key={conv.id} onClick={() => openConversation(conv)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-left border-b border-[var(--border)] transition-colors
                  ${conversationId === conv.id ? "bg-cyan-500/10" : "hover:bg-[var(--bg)]"}`}>
                <div className="w-9 h-9 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-medium flex-shrink-0">
                  {avatar(conv.other_user?.name)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-xs font-medium truncate ${conversationId === conv.id ? "text-cyan-500" : ""}`}>
                      {conv.other_user?.name}
                    </span>
                    {conv.last_message && (
                      <span className="text-[10px] opacity-40 flex-shrink-0 ml-1">
                        {formatTime(conv.last_message.created_at)}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-0.5">
                    <span className="text-[11px] opacity-40 truncate">
                      {conv.last_message?.content || "No messages yet"}
                    </span>
                    {conv.unread > 0 && (
                      <span className="flex-shrink-0 ml-1 w-4 h-4 rounded-full bg-cyan-500 text-white text-[9px] flex items-center justify-center">
                        {conv.unread}
                      </span>
                    )}
                  </div>
                </div>
              </button>
            ))
          )}
        </div>
      </div>

      {/* Chat area */}
      <div className={`flex-1 flex flex-col min-w-0 ${showChat ? "flex" : "hidden md:flex"}`}>
        {selected ? (
          <>
            <div className="h-[60px] flex items-center gap-3 px-4 border-b border-[var(--border)]">
              <button onClick={() => { setShowChat(false); setSelected(null); }}
                className="md:hidden p-1.5 rounded-lg hover:bg-[var(--bg)] opacity-60">
                <ArrowLeft size={18} />
              </button>
              <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white text-xs font-medium">
                {avatar(selected.name)}
              </div>
              <div>
                <p className="text-sm font-medium">{selected.name}</p>
                <p className="text-[10px] opacity-40">{roleLabel(selected.role) || selected.role}</p>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4 flex flex-col gap-3">
              {messages.map((msg) => {
                const isMe = msg.sender_id === user?.id;
                return (
                  <div key={msg.id} className={`flex ${isMe ? "justify-end" : "justify-start"}`}>
                    {!isMe && (
                      <div className="w-6 h-6 rounded-full bg-cyan-500 flex items-center justify-center text-white text-[9px] font-medium mr-2 flex-shrink-0 mt-1">
                        {avatar(msg.sender?.name)}
                      </div>
                    )}
                    <div className={`max-w-[75%] flex flex-col gap-1 ${isMe ? "items-end" : "items-start"}`}>
                      <div className={`px-3 py-2 rounded-2xl text-sm ${isMe ? "bg-cyan-500 text-white rounded-tr-sm" : "bg-[var(--bg)] rounded-tl-sm"}`}>
                        {msg.content}
                      </div>
                      <span className="text-[10px] opacity-30">{formatTime(msg.created_at)}</span>
                    </div>
                  </div>
                );
              })}
              <div ref={bottomRef} />
            </div>

            <div className="px-4 py-3 border-t border-[var(--border)] flex items-center gap-2">
              <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Type a message..."
                className="flex-1 px-4 py-2 text-sm rounded-xl bg-[var(--bg)] border border-[var(--border)] outline-none focus:border-cyan-500" />
              <button onClick={handleSend} disabled={!input.trim() || sending}
                className="p-2 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white disabled:opacity-40">
                <Send size={16} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex-1 hidden md:flex flex-col items-center justify-center gap-3 opacity-30">
            <Send size={24} />
            <p className="text-sm">Select a conversation or start a new chat</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatPanel;
