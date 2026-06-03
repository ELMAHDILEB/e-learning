import { X } from "lucide-react";

const UserModal = ({ title, onClose, onConfirm, confirmLabel = "Save", confirmClass = "bg-cyan-500 hover:bg-cyan-600 text-white", children }) => (
  <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
    <div className="bg-[var(--card)] border border-[var(--border)] rounded-xl w-full max-w-md shadow-xl">
      <div className="flex items-center justify-between px-5 py-4 border-b border-[var(--border)]">
        <h2 className="text-sm font-medium">{title}</h2>
        <button onClick={onClose} className="text-[var(--text)] opacity-40 hover:opacity-100 transition-opacity">
          <X size={18} />
        </button>
      </div>
      <div className="px-5 py-4">{children}</div>
      <div className="flex justify-end gap-2 px-5 py-4 border-t border-[var(--border)]">
        <button
          onClick={onClose}
          className="px-4 py-2 text-sm rounded-lg border border-[var(--border)] text-[var(--text)] hover:bg-[var(--bg)] transition-colors"
        >
          Cancel
        </button>
        <button
          onClick={onConfirm}
          className={`px-4 py-2 text-sm rounded-lg font-medium transition-colors ${confirmClass}`}
        >
          {confirmLabel}
        </button>
      </div>
    </div>
  </div>
);

export default UserModal;