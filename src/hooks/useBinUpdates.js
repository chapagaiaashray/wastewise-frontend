import { useEffect, useRef } from "react";
import { Client } from "@stomp/stompjs";

export default function useBinUpdates(onUpdate) {
  const clientRef = useRef(null);
  const connectedRef = useRef(false); // prevent duplicate activation

  useEffect(() => {
    if (connectedRef.current) return;

    const client = new Client({
      brokerURL: `${import.meta.env.VITE_API_BASE.replace(/^http/, "ws")}/ws`,
      reconnectDelay: 5000,
      debug: (str) => console.log("[STOMP DEBUG]", str),
      onConnect: () => {
        console.log("[WebSocket] ✅ Connected");
        connectedRef.current = true;

        client.subscribe("/topic/binUpdates", (message) => {
          try {
            const updatedBin = JSON.parse(message.body);
            onUpdate(updatedBin);
          } catch (err) {
            console.error("[WebSocket] ❌ Parse error:", err);
          }
        });
      },
      onWebSocketError: (e) => {
        console.error("[WebSocket] ❌ Socket error:", e);
      },
      onStompError: (frame) => {
        console.error("[WebSocket] ❗ Broker error:", frame.headers.message);
      },
    });

    clientRef.current = client;
    client.activate();

    return () => {
      // Only disconnect on real unmount
      if (clientRef.current && connectedRef.current) {
        clientRef.current.deactivate();
        connectedRef.current = false;
        console.log("[WebSocket] 🔌 Disconnected");
      }
    };
  }, [onUpdate]); // now stable due to useCallback
}
