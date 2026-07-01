import Echo from "laravel-echo";
import Pusher from "pusher-js";

let echoInstance = null;

export function initEcho(token, userId) {
  const key = import.meta.env.VITE_REVERB_APP_KEY;
  if (!key || !token || !userId) return null;

  if (echoInstance) {
    echoInstance.disconnect();
  }

  window.Pusher = Pusher;
  const apiUrl = import.meta.env.VITE_API_URL || "";

  echoInstance = new Echo({
    broadcaster: "reverb",
    key,
    wsHost: import.meta.env.VITE_REVERB_HOST || "localhost",
    wsPort: import.meta.env.VITE_REVERB_PORT ?? 8080,
    wssPort: import.meta.env.VITE_REVERB_PORT ?? 443,
    forceTLS: (import.meta.env.VITE_REVERB_SCHEME ?? "http") === "https",
    enabledTransports: ["ws", "wss"],
    authEndpoint: `${apiUrl}/api/broadcasting/auth`,
    auth: {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    },
  });

  window.Echo = echoInstance;
  localStorage.setItem("userId", String(userId));
  return echoInstance;
}

export function disconnectEcho() {
  if (echoInstance) {
    echoInstance.disconnect();
    echoInstance = null;
    window.Echo = null;
  }
  localStorage.removeItem("userId");
}

export function getEcho() {
  return echoInstance;
}

export function isEchoEnabled() {
  return Boolean(import.meta.env.VITE_REVERB_APP_KEY);
}
