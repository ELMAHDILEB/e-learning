import { useEffect, useRef } from "react";
import { isEchoEnabled } from "../lib/echo";

/**
 * Real-time listener hook.
 * Uses WebSocket via Laravel Echo when Reverb is configured,
 * otherwise falls back to polling.
 */
export default function useRealtime(eventName, callback, deps = [], pollMs = 3000) {
  const callbackRef = useRef(callback);
  callbackRef.current = callback;

  useEffect(() => {
    const userId = localStorage.getItem("userId");

    if (isEchoEnabled() && window.Echo && userId) {
      const channel = window.Echo.private(`user.${userId}`);
      channel.listen(`.${eventName}`, (data) => callbackRef.current(data));

      return () => {
        channel.stopListening(`.${eventName}`);
      };
    }

    callbackRef.current(null);
    const interval = setInterval(() => callbackRef.current(null), pollMs);
    return () => clearInterval(interval);
  }, deps);
}
