import { useEffect } from 'react';
import { Client, IMessage } from '@stomp/stompjs';

export interface MemberWithStatusDTO {
    id: number;
    username: string;
    email: string;
    status: 'ACTIVE' | 'CANCELLED' | 'FINISHED' | 'UNATTENDED';
}

type Callback = {
    onJoined?: (member: MemberWithStatusDTO) => void;
    onCancelled?: (memberId: number) => void;
    onStatusUpdated?: (member: MemberWithStatusDTO) => void;
};

export function useClassWebSocket(classId: number | string, callbacks: Callback) {
    useEffect(() => {
        if (!classId) return;


        const stompClient = new Client({
            brokerURL: "ws://localhost:8080/ws",
            reconnectDelay: 5000,
            debug: (str) => console.log('[STOMP DEBUG]', str),

            onConnect: () => {
                console.log('✅ Connected to WebSocket');

                stompClient.subscribe(`/topic/class/${classId}/joined`, (msg: IMessage) => {
                    console.log('📥 Joined:', msg.body);
                    const member = JSON.parse(msg.body);
                    callbacks.onJoined?.(member);
                });

                stompClient.subscribe(`/topic/class/${classId}/cancelled`, (msg: IMessage) => {
                    console.log('📥 Cancelled:', msg.body);
                    const memberId = JSON.parse(msg.body);
                    callbacks.onCancelled?.(memberId);
                });

                stompClient.subscribe(`/topic/class/${classId}/status-updated`, (msg: IMessage) => {
                    console.log('📥 Status updated:', msg.body);
                    const member = JSON.parse(msg.body);
                    callbacks.onStatusUpdated?.(member);
                });
            },

            onStompError: (frame) => {
                console.error('❌ STOMP error:', frame.headers['message']);
                console.error('Details:', frame.body);
            },

            onWebSocketError: (event) => {
                console.error('❌ WebSocket connection error:', event);
            },
        });

        stompClient.activate();

        return () => {
            console.log('🔌 Disconnecting WebSocket');
            stompClient.deactivate();
        };
    }, [classId]);
}
