import { useEffect, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { FaCalendarAlt } from 'react-icons/fa';
import SidebarMember from "../components/SidebarMember.tsx";

interface FitnessClass {
    id: number;
    name: string;
    date: string;
    startHour: string;
    endHour: string;
    description: string;
    trainer: {
        fullName: string;
    };
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

    .sidebar {
        background-color: #111827;
        color: white;
        padding: 2rem 1rem;
        width: 250px;
        transition: all 0.3s ease;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        position: relative;
    }

    .sidebar.closed {
        width: 80px;
        padding: 2rem 0.5rem;
    }

    .logo {
        width: 100%;
        height: 120px;
        margin: 0 auto 2rem auto;
        display: block;
        object-fit: contain;
        transition: all 0.3s ease;
    }

    .sidebar.closed .logo {
        width: 60px;
        height: 60px;
    }

    .sidebar nav {
        display: flex;
        flex-direction: column;
        gap: 2rem;
        padding-left: 10px;
    }

    .sidebar nav a {
        font-size: 1.2rem;
        color: white;
        text-decoration: none;
        transition: all 0.3s ease;
    }

    .sidebar.closed nav a {
        font-size: 0;
        opacity: 0;
        visibility: hidden;
    }

    .sidebar-footer {
        border-top: 1px solid #374151;
        padding-top: 1.5rem;
        margin-top: 2rem;
        text-align: center;
    }

    .sidebar-footer a {
        font-size: 1.1rem;
        color: white;
        text-decoration: none;
    }

    .main {
        flex: 1;
        padding: 2rem 3rem;
        overflow-y: auto;
        transition: all 0.3s ease;
    }

    .toggle-button {
        position: absolute;
        top: 1rem;
        right: -40px;
        background-color: #111827;
        color: white;
        border: none;
        padding: 8px 12px;
        cursor: pointer;
        z-index: 10;
        border-radius: 4px;
        font-size: 0.9rem;
        transition: all 0.3s ease;
    }

    .header {
        display: flex;
        align-items: center;
        gap: 1rem;
        font-size: 1.5rem;
        margin-bottom: 2rem;
        color: #111827;
    }

    .date-picker {
        margin-left: auto;
        font-size: 1rem;
        padding: 0.4rem;
        border-radius: 4px;
        border: 1px solid #ccc;
    }

    .schedule-grid {
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        gap: 1.5rem;
    }

    .day-column {
        background-color: white;
        border: 4px solid #84cc16;
        border-radius: 8px;
        padding: 1rem;
        min-height: 600px;
    }

    .day-header {
        font-weight: bold;
        font-size: 1rem;
        margin-bottom: 1rem;
        text-align: center;
    }

    .class-card {
        margin-bottom: 1rem;
        border-top: 1px solid #ccc;
        padding-top: 0.5rem;
        font-size: 0.9rem;
        color: #1f2937;
    }

    .class-card strong {
        font-size: 0.95rem;
        display: block;
        margin-bottom: 0.3rem;
    }

    .class-name {
        font-size: 1.1rem;
        font-weight: 600;
        color: #14532d;
        margin-bottom: 0.2rem;
    }

    .trainer-name {
        font-size: 0.85rem;
        color: #6b7280;
    }
`;

export default function ViewClassesMember() {
    const [classes, setClasses] = useState<FitnessClass[]>([]);
    const [startDate, setStartDate] = useState(getMonday(new Date()));
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/api/classes')
            .then(res => res.json())
            .then(data => setClasses(data))
            .catch(err => console.error("Failed to fetch classes", err));
    }, []);

    const daysOfWeek = Array.from({ length: 5 }, (_, i) => {
        const date = new Date(startDate);
        date.setDate(startDate.getDate() + i);
        return date;
    });

    const getClassesForDate = (date: Date) =>
        classes.filter(c => {
            const classDate = new Date(c.date);
            return (
                classDate.getFullYear() === date.getFullYear() &&
                classDate.getMonth() === date.getMonth() &&
                classDate.getDate() === date.getDate()
            );
        });

    const handleDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const date = new Date(e.target.value);
        setStartDate(getMonday(date));
    };



    return (
        <>
            <GlobalStyle />
            <div className="container">
                <SidebarMember/>

                <div className="main">
                    <div className="header">
                        <FaCalendarAlt />
                        <span>Classes Schedule</span>
                        <input
                            type="date"
                            className="date-picker"
                            value={startDate.toISOString().split('T')[0]}
                            onChange={handleDateChange}
                        />
                    </div>

                    <div className="schedule-grid">
                        {daysOfWeek.map(day => (
                            <div key={day.toDateString()} className="day-column">
                                <div className="day-header">
                                    {day.toLocaleDateString('en-US', { weekday: 'long' })}
                                </div>
                                {getClassesForDate(day).map(cls => (
                                    <div
                                        key={cls.id}
                                        className="class-card"
                                        onClick={() => navigate(`/view-class-member/${cls.id}`)}
                                        style={{ cursor: 'pointer' }}
                                    >
                                        <strong>{formatHour(cls.startHour)} - {formatHour(cls.endHour)}</strong>
                                        <div className="class-name">{cls.name}</div>
                                        <div className="trainer-name">{cls.trainer.fullName}</div>
                                    </div>

                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}

function getMonday(d: Date): Date {
    const date = new Date(d);
    const day = date.getDay();
    const diff = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(diff));
}

function formatHour(time: string): string {
    return time.slice(0, 5); // returnează doar HH:MM
}
