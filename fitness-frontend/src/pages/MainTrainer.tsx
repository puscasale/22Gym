import { useEffect } from 'react';
import {  useNavigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { CgGym } from "react-icons/cg";
import { FaCalendarTimes, FaCalendarAlt, FaRegCalendar } from "react-icons/fa";
import SidebarTrainer from "../components/SidebarTrainer.tsx";

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
        width: auto;
        height: 200px;
        margin: 0 auto 2rem auto;
        display: block;
        object-fit: fill;
        transition: all 0.3s ease;
        transform: translateX(-125px);
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

    .main {
        flex: 1;
        background-color: #f3f4f6;
        padding: 2rem;
        overflow-y: auto;
    }

    .welcome {
        margin: 3rem 4rem 2rem 4rem;
    }

    .welcome h1 {
        font-size: 2.2rem;
        margin-bottom: 0.5rem;
        color: #84cc16;
    }

    .welcome p {
        color: #374151;
        font-size: 1.15rem;
        max-width: none;
        line-height: 2;
    }

    .cards {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 2.5rem;
        margin-top: 5rem;
        padding: 0 4rem;
    }

    .card {
        background-color: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 6px 12px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
    }

    .card:hover {
        transform: translateY(-4px);
    }

    .card h3 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        font-size: 1.2rem;
        color: #111827;
    }

    .card p {
        font-size: 0.95rem;
        color: #4b5563;
        margin: 1rem 0;
    }

    .card button {
        background-color: #84cc16;
        color: white;
        border: none;
        padding: 0.5rem 1.2rem;
        border-radius: 6px;
        font-weight: bold;
        cursor: pointer;
    }

    .card button:hover {
        background-color: #65a30d;
    }

    @media (max-width: 768px) {
        .cards {
            grid-template-columns: 1fr;
            padding: 0 2rem;
        }
    }
`;

export default function MainTrainer() {
    const navigate = useNavigate();

    const storedUser = sessionStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const displayName = user?.fullName || user?.username || "Trainer";

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);



    return (
        <>
            <GlobalStyle />
            <div className="container">
                <SidebarTrainer/>

                <div className="main">
                    <div className="welcome">
                        <h1>Welcome back, {displayName}!</h1>
                        <p>
                            You can efficiently manage your gym activities through your trainer account.
                            Whether you want to schedule new classes, update existing sessions, or track your participants,
                            everything is just a few clicks away.
                        </p>
                    </div>

                    <div className="cards">
                        <div className="card">
                            <h3><CgGym /> ADD CLASS</h3>
                            <p>Create a new class and make it available for members instantly! Set the schedule, capacity, and details with just a few clicks.</p>
                            <button onClick={() => navigate('/add-class')}>ADD</button>
                        </div>

                        <div className="card">
                            <h3><FaCalendarAlt /> VIEW SCHEDULE</h3>
                            <p>Stay on top of your training sessions! View your complete schedule, track upcoming classes, and manage your sessions effortlessly.</p>
                            <button onClick={() => navigate('/view-schedule-trainer')}>VIEW</button>
                        </div>

                        <div className="card">
                            <h3><FaRegCalendar /> VIEW CLASSES</h3>
                            <p>Explore all available classes. Browse sessions, check details, and stay updated on upcoming workouts.</p>
                            <button onClick={() => navigate('/view-classes-trainer')}>VIEW</button>
                        </div>

                        <div className="card">
                            <h3><FaCalendarTimes /> CANCEL CLASS</h3>
                            <p>Easily adjust your schedule! Cancel a class when needed and keep your schedule flexible.</p>
                            <button onClick={() => navigate('/view-schedule-trainer')}>CANCEL</button>
                        </div>
                    </div>

                </div>
            </div>
        </>
    );
}
