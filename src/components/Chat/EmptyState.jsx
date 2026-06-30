import { Send } from "lucide-react";

const EmptyState = () => {
  return (
    <div className="flex-1 hidden md:flex flex-col items-center justify-center gap-3 text-[var(--text)] opacity-30">
      <div className="w-16 h-16 rounded-full bg-[var(--bg)] flex items-center justify-center">
        <Send size={24} />
      </div>
      <p className="text-sm">Select a conversation</p>
    </div>
  );
};

export default EmptyState;