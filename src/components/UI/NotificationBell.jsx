import { useState, useEffect, useRef } from "react";
import { Bell, X } from "lucide-react";
import { useAuth } from "../../context/AuthProvider";
import useRealtime from "../../hooks/useRealtime";
import {
  getNotifications,
  getUnreadCount,
  markNotificationRead,
  markAllNotificationsRead,
} from "../../services/notifications";

const NotificationBell = () => {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [count, setCount] = useState(0);
  const [notifications, setNotifications] = useState([]);
  const ref = useRef(null);

  const fetchCount = async () => {
    try {
      const { data } = await getUnreadCount();
      setCount(data.count);
    } catch {
      /* ignore */
    }
  };

  const fetchNotifications = async () => {
    try {
      const { data } = await getNotifications();
      setNotifications(data);
    } catch {
      /* ignore */
    }
  };

  useEffect(() => {
    fetchCount();
  }, []);

  useRealtime("notification.sent", (payload) => {
    if (payload?.notification) {
      setCount((c) => c + 1);
      if (open) {
        setNotifications((prev) => [payload.notification, ...prev]);
      }
    } else {
      fetchCount();
      if (open) fetchNotifications();
    }
  }, [user?.id, open], 5000);

  useEffect(() => {
    if (open) fetchNotifications();
  }, [open]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleRead = async (id) => {
    await markNotificationRead(id);
    fetchCount();
    fetchNotifications();
  };

  const handleReadAll = async () => {
    await markAllNotificationsRead();
    setCount(0);
    fetchNotifications();
  };

  return (
    <div className="relative" ref={ref}>
      <button onClick={() => setOpen(!open)}
        className="relative p-1.5 rounded-md opacity-60 hover:opacity-100 hover:bg-[var(--bg)] transition-all">
        <Bell size={20} />
        {count > 0 && (
          <span className="absolute top-0.5 right-0.5 min-w-[16px] h-4 px-1 rounded-full bg-red-500 text-white text-[9px] flex items-center justify-center border-2 border-[var(--card)]">
            {count > 9 ? "9+" : count}
          </span>
        )}
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-80 bg-[var(--card)] border border-[var(--border)] rounded-xl shadow-xl z-50 overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--border)]">
            <span className="text-sm font-medium">Notifications</span>
            <div className="flex items-center gap-2">
              {count > 0 && (
                <button onClick={handleReadAll} className="text-[10px] text-cyan-500 hover:underline">
                  Mark all read
                </button>
              )}
              <button onClick={() => setOpen(false)} className="opacity-40 hover:opacity-100">
                <X size={14} />
              </button>
            </div>
          </div>
          <div className="max-h-80 overflow-y-auto">
            {notifications.length === 0 ? (
              <p className="text-xs opacity-40 p-4 text-center">No notifications</p>
            ) : (
              notifications.map((n) => (
                <button key={n.id} onClick={() => !n.read && handleRead(n.id)}
                  className={`w-full text-left px-4 py-3 border-b border-[var(--border)] last:border-0 hover:bg-[var(--bg)] transition-colors
                    ${!n.read ? "bg-cyan-500/5" : ""}`}>
                  <p className="text-xs leading-relaxed">{n.content}</p>
                  <p className="text-[10px] opacity-30 mt-1">
                    {new Date(n.created_at).toLocaleString()}
                  </p>
                </button>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationBell;
