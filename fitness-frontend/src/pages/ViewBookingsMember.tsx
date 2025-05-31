import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import SidebarMember from "../components/SidebarMember.tsx";
import { notifyError, notifySuccess } from "../utils/Notify.ts";

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

    .cancel-button {
        background-color: #dc2626;
        color: white;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 8px;
        cursor: pointer;
        font-weight: bold;
    }

    .cancel-button:hover {
        background-color: #b91c1c;
    }

    .no-bookings {
        text-align: center;
        font-size: 1.2rem;
        color: #6b7280;
        margin-top: 2rem;
    }
`;

export default function ViewBookingsMember() {
    const [bookings, setBookings] = useState<Booking[]>([]);
    const navigate = useNavigate();
    const storedUser = sessionStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;
    const memberId = user ? user.id : null;
    const today = new Date().toISOString().split('T')[0];

    useEffect(() => {
        if (!memberId) {
            navigate('/');
            return;
        }

        fetch(`http://localhost:8080/api/bookings/user/${memberId}`)
            .then(res => res.json())
            .then(data => {
                // Filtrăm doar rezervările ACTIVE
                const activeBookings = data.filter((booking: Booking) => booking.status === "ACTIVE");

                const todayBookings = activeBookings.filter(
                    (booking: Booking) => booking.fitnessClass.date === today
                );

                if (todayBookings.length > 0) {
                    setBookings(todayBookings);
                } else {
                    // Sortăm rezervările active după dată
                    const sortedBookings = activeBookings.sort((a: Booking, b: Booking) =>
                        new Date(a.fitnessClass.date).getTime() - new Date(b.fitnessClass.date).getTime()
                    );

                    // Găsim următoarea clasă viitoare
                    const nextBooking = sortedBookings.find(
                        (booking: Booking) => new Date(booking.fitnessClass.date) > new Date(today)
                    );

                    setBookings(nextBooking ? [nextBooking] : []);
                }
            })
            .catch(() => notifyError("Failed to load bookings"));
    }, [memberId, navigate, today]);


    const handleCancel = async (bookingId: number) => {
        try {
            const response = await fetch(`http://localhost:8080/api/bookings/${bookingId}`, {
                method: 'DELETE'
            });

            if (!response.ok) {
                notifyError("Failed to cancel booking");
                return;
            }

            notifySuccess("Booking cancelled successfully");
            setBookings(bookings.filter(b => b.id !== bookingId));
        } catch {
            notifyError("Error cancelling booking");
        }
    };

    return (
        <>
            <GlobalStyle />
            <div className="container">
                <SidebarMember />
                <div className="main">
                    <h1>Your Bookings</h1>

                    {bookings.length === 0 ? (
                        <div className="no-bookings">You have no upcoming bookings.</div>
                    ) : (
                        bookings.map(booking => (
                            <div key={booking.id} className="booking-card">
                                <div className="booking-details">
                                    <h3>{booking.fitnessClass.name}</h3>
                                    <p>{booking.fitnessClass.date} - {booking.fitnessClass.startHour} to {booking.fitnessClass.endHour}</p>
                                    <p>{booking.fitnessClass.description}</p>
                                </div>
                                <button className="cancel-button" onClick={() => handleCancel(booking.id)}>
                                    Cancel Booking
                                </button>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </>
    );
}
