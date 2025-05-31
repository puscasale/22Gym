import { useEffect } from "react";
import { Client, IMessage } from "@stomp/stompjs";

export function useStompSubscribe(
    subscriptions: { topic: string; handler: (payload: unknown) => void }[]
) {
    useEffect(() => {
        const client = new Client({
            brokerURL: "ws://localhost:8080/ws",
            reconnectDelay: 5000,
            heartbeatIncoming: 0,
            heartbeatOutgoing: 0,
        });

        client.onConnect = () => {
            console.log("✅ Connected to WebSocket");
            subscriptions.forEach(({ topic, handler }) => {
                client.subscribe(topic, (msg: IMessage) => {
                    handler(JSON.parse(msg.body));
                });
            });
        };

        client.onStompError = (frame) => {
            console.error("❌ STOMP error:", frame.headers["message"]);
            console.error("Details:", frame.body);
        };

        client.onWebSocketError = (event) => {
            console.error("❌ WebSocket connection error:", event);
        };

        client.activate();

        return () => {
            console.log("🔌 Disconnecting WebSocket");
            void client.deactivate();
        };
    }, [subscriptions]);
}
