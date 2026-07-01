import { useState, useEffect, useRef } from "react";
import { Bot, Send, Sparkles, Loader2 } from "lucide-react";
import { askAi, getAiHistory, summarizeLesson } from "../../services/ai";

const AiAssistant = ({ lessonId, lessonTitle }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [summarizing, setSummarizing] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    if (open && lessonId) {
      getAiHistory(lessonId)
        .then(({ data }) => setMessages(data.messages || []))
        .catch(() => setMessages([]));
    }
  }, [open, lessonId]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleAsk = async () => {
    if (!input.trim() || loading) return;
    const question = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: question, id: Date.now() }]);
    setLoading(true);
    try {
      const { data } = await askAi(lessonId, question);
      setMessages((prev) => [...prev, { role: "assistant", content: data.answer, id: Date.now() + 1 }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Sorry, I couldn't process your question.", id: Date.now() + 1 }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSummarize = async () => {
    setSummarizing(true);
    try {
      const { data } = await summarizeLesson(lessonId);
      setMessages((prev) => [...prev, { role: "assistant", content: data.summary, id: Date.now() }]);
    } finally {
      setSummarizing(false);
    }
  };

  if (!open) {
    return (
      <button onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2 px-4 py-3 rounded-full bg-cyan-500 hover:bg-cyan-600 text-white shadow-lg shadow-cyan-500/25 transition-all">
        <Bot size={20} />
        <span className="text-sm font-medium">AI Assistant</span>
      </button>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-40 w-[360px] max-w-[calc(100vw-2rem)] bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-2xl flex flex-col overflow-hidden"
      style={{ height: "480px" }}>
      <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)] bg-cyan-500/5">
        <div className="flex items-center gap-2">
          <Bot size={18} className="text-cyan-500" />
          <div>
            <p className="text-sm font-medium">AI Assistant</p>
            <p className="text-[10px] opacity-40 truncate max-w-[200px]">{lessonTitle}</p>
          </div>
        </div>
        <button onClick={() => setOpen(false)} className="text-xs opacity-40 hover:opacity-100 px-2 py-1">✕</button>
      </div>

      <div className="px-3 py-2 border-b border-[var(--border)]">
        <button onClick={handleSummarize} disabled={summarizing}
          className="flex items-center gap-1.5 text-xs text-cyan-500 hover:underline disabled:opacity-50">
          {summarizing ? <Loader2 size={12} className="animate-spin" /> : <Sparkles size={12} />}
          Summarize this lesson
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 flex flex-col gap-2">
        {messages.length === 0 && (
          <p className="text-xs opacity-40 text-center py-6">
            Ask me anything about this lesson!
          </p>
        )}
        {messages.map((msg, i) => (
          <div key={msg.id ?? i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
            <div className={`max-w-[85%] px-3 py-2 rounded-xl text-xs leading-relaxed whitespace-pre-wrap
              ${msg.role === "user" ? "bg-cyan-500 text-white" : "bg-[var(--bg)] border border-[var(--border)]"}`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="px-3 py-2 rounded-xl bg-[var(--bg)] border border-[var(--border)]">
              <Loader2 size={14} className="animate-spin opacity-40" />
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="px-3 py-3 border-t border-[var(--border)] flex items-center gap-2">
        <input type="text" value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleAsk()}
          placeholder="Ask about this lesson..."
          className="flex-1 px-3 py-2 text-xs rounded-lg bg-[var(--bg)] border border-[var(--border)] outline-none focus:border-cyan-500" />
        <button onClick={handleAsk} disabled={!input.trim() || loading}
          className="p-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-white disabled:opacity-40">
          <Send size={14} />
        </button>
      </div>
    </div>
  );
};

export default AiAssistant;
