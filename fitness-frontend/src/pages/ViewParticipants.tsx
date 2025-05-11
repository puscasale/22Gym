import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import SidebarTrainer from "../components/SidebarTrainer.tsx";
import { notifyError } from "../utils/Notify.ts";

interface Participant {
    id: number;
    username: string;
    email: string;
}

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
    const [participants, setParticipants] = useState<Participant[]>([]);
    const { id } = useParams();
    useNavigate();
    useEffect(() => {
        fetch(`http://localhost:8080/api/bookings/class/${id}/participants`)
            .then(res => res.json())
            .then(data => setParticipants(data))
            .catch(() => notifyError("Failed to load participants"));
    }, [id]);

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
                                <span>{participant.username}</span>
                                <span>{participant.email}</span>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
