import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import SidebarTrainer from "../components/SidebarTrainer.tsx";
import {notifyError, notifySuccess} from "../utils/Notify.ts";
import { useStompSubscribe } from "../hooks/useStompSubscribe";
import {MemberWithStatusDTO} from "../hooks/useClassWebSocket.tsx";




const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: 'Josefin Sans', sans-serif;
        background-color: #f3f4f6;
    }

    .container {
        display: flex;
        height: 100vh;
        width: 100vw;
    }

    .main {
        flex: 1;
        padding: 2rem 3rem;
        overflow-y: auto;
    }

    .participant-card {
        background-color: white;
        border-radius: 12px;
        padding: 1rem 1.5rem;
        margin-bottom: 1rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .no-participants {
        text-align: center;
        font-size: 1.2rem;
        color: #6b7280;
        margin-top: 2rem;
    }
`;

export default function ViewParticipants() {
    const [participants, setParticipants] = useState<MemberWithStatusDTO[]>([]);

    const { id } = useParams();

    useNavigate();
    useEffect(() => {
        fetch(`http://localhost:8080/api/bookings/class/${id}/participants`)
            .then(res => res.json())
            .then(data => setParticipants(data))
            .catch(() => notifyError("Failed to load participants"));
    }, [id]);

    useStompSubscribe([
        {
            topic: `/topic/class/${id}/joined`,
            handler: (payload) => {
                const member = payload as MemberWithStatusDTO;
                setParticipants((prev) => [...prev, member]);
                notifySuccess(`${member.username} just joined the class!`);
            },
        },
        {
            topic: `/topic/class/${id}/cancelled`,
            handler: (payload) => {
                const memberId = payload as number;
                const member = participants.find(p => p.id === memberId);
                if (member) notifySuccess(`${member.username} has cancelled`);
                setParticipants(prev => prev.filter(p => p.id !== memberId));
            },
        },
        {
            topic: `/topic/class/${id}/status-updated`,
            handler: (payload) => {
                const member = payload as MemberWithStatusDTO;
                setParticipants(prev =>
                    prev.map(p =>
                        p.id === member.id ? { ...p, status: member.status } : p
                    )
                );
                notifySuccess(`${member.username}'s status updated to ${member.status}`);
            },
        },
    ]);






    const markAttendance = async (memberId: number, status: "FINISHED" | "UNATTENDED") => {
        try {
            const res = await fetch(`http://localhost:8080/api/bookings/${id}/member/${memberId}/status?status=${status}`, {
                method: "PATCH",
            });

            if (!res.ok) {
                notifyError("Failed to update status");
                return;
            }

            // update local state
            setParticipants(prev =>
                prev.map(p =>
                    p.id === memberId ? { ...p, status } : p
                )
            );
        } catch {
            notifyError("Request error while updating status");
        }
    };


    return (
        <>
            <GlobalStyle />
            <div className="container">
                <SidebarTrainer />
                <div className="main">
                    <h1>Participants for Class </h1>
                    {participants.length === 0 ? (
                        <div className="no-participants">No participants for this class.</div>
                    ) : (
                        participants.map(participant => (
                            <div key={participant.id} className="participant-card">
                                <div>
                                    <strong>{participant.username}</strong><br />
                                    <small>{participant.email}</small>
                                </div>
                                <div style={{ display: 'flex', gap: '0.5rem' }}>
                                    <button
                                        onClick={() => markAttendance(participant.id, "FINISHED")}
                                        disabled={participant.status === "FINISHED"}
                                        style={{
                                            backgroundColor: participant.status === "FINISHED" ? "#1c750f" : "#84cc16",
                                            color: participant.status === "FINISHED" ? "white" : "#134509",
                                            padding: "0.5rem 1rem",
                                            borderRadius: "8px",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Attended
                                    </button>
                                    <button
                                        onClick={() => markAttendance(participant.id, "UNATTENDED")}
                                        disabled={participant.status === "UNATTENDED"}
                                        style={{
                                            backgroundColor: participant.status === "UNATTENDED" ? "#c2112b" : "#ff6d6d",
                                            color: participant.status === "UNATTENDED" ? "white" : "#991b1b",
                                            padding: "0.5rem 1rem",
                                            borderRadius: "8px",
                                            border: "none",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Unattended
                                    </button>
                                </div>
                            </div>

                        ))
                    )}
                </div>
            </div>
        </>
    );
}
