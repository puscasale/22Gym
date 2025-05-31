import { useEffect, useState } from 'react';
import { useParams, useNavigate} from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import SidebarMember from "../components/SidebarMember.tsx";
import { notifyError, notifySuccess } from "../utils/Notify.ts";

interface FitnessClass {
    id: number;
    name: string;
    date: string;
    startHour: string;
    endHour: string;
    description: string;
    trainerName: string;
    max_capacity: number;
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
        padding: 2rem 3rem;
        overflow-y: auto;
        transition: all 0.3s ease;
    }

    .class-banner {
        width: 100%;
        height: 250px;
        position: relative;
        border-radius: 12px 12px 0 0;
        overflow: hidden;
    }

    .class-banner::before {
        content: "";
        background: url('/img_1.png') center/cover no-repeat;
        position: absolute;
        inset: 0;
        z-index: 1;
    }

    .class-banner::after {
        content: "";
        position: absolute;
        inset: 0;
        background: rgba(0, 0, 0, 0.4); /* overlay negru */
        z-index: 2;
    }

    .class-banner div {
        position: relative;
        z-index: 3;
        color: white;
        font-weight: bold;
        font-size: 1.8rem;
        text-shadow: 1px 1px 4px black;
        text-align: center;
        margin: auto;
        padding-top: 70px;
    }

    .class-banner small {
        display: block;
        font-weight: normal;
        font-size: 1rem;
        margin-top: 0.5rem;
    }


    .details {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        margin-top: -1rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .details .info-box {
        background-color: #f3f4f6;
        padding: 1rem;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.5rem;
        font-size: 1rem;
    }

    .description {
        font-size: 1.3rem;
        color: #374151;
        line-height: 1.7;
    }

    .book-button {
        margin: 2rem auto 0 auto;
        display: block;
        padding: 1rem 3rem;
        background-color: #84cc16; /* verde smarald */
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 10px;
        font-size: 1.2rem;
        cursor: pointer;
        transition: background 0.2s ease-in-out;
    }

    .book-button:hover {
        background-color: #65a30d; /* verde închis */
    }


`;

export default function ViewClassMember() {
    const [fitnessClass, setFitnessClass] = useState<FitnessClass | null>(null);
    const { id } = useParams();
    const navigate = useNavigate();
    const [isFullyBooked, setIsFullyBooked] = useState(false);
    const [hasBooked, setHasBooked] = useState(false);


    const storedUser = sessionStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const memberId = user ? user.id : null;


    useEffect(() => {
        fetch(`http://localhost:8080/api/classes/${id}`)
            .then(res => res.json())
            .then(data => setFitnessClass(data))
            .catch(() => navigate('/view-classes-trainer'));

        fetch(`http://localhost:8080/api/bookings/class/${id}/isFullyBooked`)
            .then(res => res.json())
            .then(data => setIsFullyBooked(data))
            .catch(() => notifyError("Failed to check class availability"));

        if (memberId) {
            fetch(`http://localhost:8080/api/bookings/class/${id}/member/${memberId}/hasBooking`)
                .then(res => res.json())
                .then(data => setHasBooked(data))
                .catch(() => notifyError("Failed to check user booking"));
        }
    }, [id, navigate, memberId]);



    if (!fitnessClass) return null;

    const handleBook = async () => {
        if (!fitnessClass || isFullyBooked) return;

        const classDateTime = new Date(`${fitnessClass.date}T${fitnessClass.startHour}`);
        const now = new Date();

        if (classDateTime < now) {
            notifyError("Cannot book a class in the past.");
            return;
        }

        try {
            const response = await fetch("http://localhost:8080/api/bookings", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    classId: fitnessClass.id,
                    memberId: memberId,
                    status: "ACTIVE",
                }),
            });

            if (!response.ok) {
                const errorMessage = await response.text();
                notifyError(errorMessage);
                return;
            }

            notifySuccess("Booking successful!");
            setHasBooked(true);

        } catch {
            notifyError("Error booking the class");
        }
    };



    return (
        <>
            <GlobalStyle />
            <div className="container">
                <SidebarMember/>

                <div className="main">
                    <div className="class-banner">
                        <div>
                            {fitnessClass.name.toUpperCase()}
                            <small>{fitnessClass.trainerName}</small>
                        </div>
                    </div>


                    <div className="details">
                        <div className="info-box">
                            <FaCalendarAlt /> {new Date(fitnessClass.date).toLocaleDateString('en-GB')}
                        </div>
                        <div className="info-box">
                            <FaClock /> {fitnessClass.startHour.slice(0, 5)} - {fitnessClass.endHour.slice(0, 5)}
                        </div>
                        <div className="description">{fitnessClass.description}</div>
                        <button
                            className={`book-button ${isFullyBooked || hasBooked ? 'disabled' : ''}`}
                            onClick={handleBook}
                            disabled={isFullyBooked || hasBooked}
                        >
                            {isFullyBooked
                                ? "CLASS FULLY BOOKED"
                                : hasBooked
                                    ? "ALREADY BOOKED"
                                    : "BOOK THIS CLASS"}
                        </button>

                    </div>
                </div>
            </div>
        </>
    );
}