import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import SidebarMember from '../components/SidebarMember.tsx';
import { notifyError } from '../utils/Notify.ts';

interface Booking {
    id: number;
    fitnessClass: {
        id: number;
        name: string;
        date: string;
        startHour: string;
        endHour: string;
        description: string;
    };
    status: string;
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

    .booking-card {
        background-color: white;
        border-radius: 12px;
        padding: 1rem 1.5rem;
        margin-bottom: 1rem;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .booking-details {
        flex: 1;
    }

    .status {
        font-weight: bold;
        color: #4b5563;
    }

    .no-bookings {
        text-align: center;
        font-size: 1.2rem;
        color: #6b7280;
        margin-top: 2rem;
    }
`;

export default function ViewHistoryBookings() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const navigate = useNavigate();
    const storedUser = sessionStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const memberId = user ? user.id : null;

    useEffect(() => {
        if (!memberId) {
            navigate('/');
            return;
        }

        fetch(`http://localhost:8080/api/bookings/user/${memberId}`)
            .then(res => res.json())
            .then(data => setBookings(data))
            .catch(() => notifyError('Failed to load booking history'));
    }, [memberId, navigate]);

    return (
        <>
            <GlobalStyle />
            <div className="container">
                <SidebarMember />
                <div className="main">
                    <h1>Booking History</h1>
                    {bookings.length === 0 ? (
                        <div className="no-bookings">You have no booking history.</div>
                    ) : (
                        bookings.map(booking => (
                            <div key={booking.id} className="booking-card">
                                <div className="booking-details">
                                    <h3>{booking.fitnessClass.name}</h3>
                                    <p>{new Date(booking.fitnessClass.date).toLocaleDateString('en-GB')}</p>
                                    <p>{booking.fitnessClass.startHour} - {booking.fitnessClass.endHour}</p>
                                    <p>{booking.fitnessClass.description}</p>
                                    <p className="status">Status: {booking.status}</p>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
