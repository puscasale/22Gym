import { useEffect} from 'react';
import {useNavigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { FaCalendarAlt, FaRegCalendar, FaUserCheck, FaShoppingCart } from "react-icons/fa";
import SidebarMember from '../components/SidebarMember';


const GlobalStyle = createGlobalStyle`
    body {
        margin: 0;
        font-family: 'Josefin Sans', sans-serif;
        background-color: #e5e7eb;
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
        margin-top: -100px;
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

    .sidebar nav a:hover {
        text-decoration: underline;
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
        background-color: #f3f4f6;
        padding: 2rem;
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

export default function MainMember() {
    const navigate = useNavigate();

    const storedUser = sessionStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    const displayName = user?.fullName || user?.username || "Member";

    useEffect(() => {
        if (!user) {
            navigate('/');
        }
    }, [user, navigate]);



    return (
        <>
            <GlobalStyle />
            <div className="container">
                <SidebarMember/>

                <div className="main">
                    <div className="welcome">
                        <h1>Welcome back, {displayName}!</h1>
                        <p>
                            You can manage your gym activity so much easier in your member account. Whether you want to renew your membership or book your favorite classes, everything is just a few clicks away.
                        </p>
                    </div>

                    <div className="cards">
                        <div className="card">
                            <h3><FaShoppingCart /> BUY MEMBERSHIP</h3>
                            <p>Buy a membership right now and pay for it online using your bank card. It will be activated immediately.</p>
                            <button onClick={() => navigate('/buy-membership')}>BUY</button>

                        </div>

                        <div className="card">
                            <h3><FaCalendarAlt /> BOOK CLASSES</h3>
                            <p>Book a class now and secure your spot instantly! Choose your preferred session, and your booking will be confirmed instantly.</p>
                            <button onClick={() => navigate('/view-classes-member')}>BOOK</button>

                        </div>

                        <div className="card">
                            <h3><FaRegCalendar /> UPCOMING CLASSES</h3>
                            <p>Stay on top of your schedule! View your active bookings and manage your upcoming classes with ease. Cancel your reservations anytime.</p>
                            <button onClick={() => navigate('/bookings')}>VIEW</button>

                        </div>

                        <div className="card">
                            <h3><FaUserCheck /> ACTIVE MEMBERSHIP</h3>
                            <p>Check your active membership now! Stay updated on your membership details, including type and expiration date.</p>
                            <button onClick={() => navigate('/view-membership')}>VIEW</button>

                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}