import { useEffect, useState } from 'react';
import {  useNavigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import { notifyError, notifySuccess } from '../utils/Notify';
import SidebarMember from "../components/SidebarMember.tsx";
import Swal from "sweetalert2";

interface Membership {
    id: number;
    type: string;
    startDate: string;
    endDate: string;
    price: number;
}

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
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        transition: all 0.3s ease;
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
        padding: 3rem 4rem;
        background-color: #f9fafb;
    }

    .membership-box {
        background: white;
        padding: 2rem;
        border-radius: 12px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        margin-top: 2rem;
    }

    .membership-status {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-weight: bold;
        font-size: 1.1rem;
        margin-bottom: 1rem;
    }

    .status-active {
        color: #65a30d;
    }

    .details p {
        margin: 0.3rem 0;
        color: #374151;
    }

    .buttons {
        margin-top: 2rem;
        display: flex;
        justify-content: center;
        gap: 2rem;
    }

    .buttons button {
        background-color: #84cc16;
        color: white;
        font-weight: bold;
        padding: 0.75rem 2rem;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1rem;
    }

    .buttons button.cancel {
        background-color: #ef4444;
    }
`;

export default function ViewMembership() {
    const [membership, setMembership] = useState<Membership | null>(null);
    const navigate = useNavigate();

    const storedUser = sessionStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    useEffect(() => {
        if (!user) {
            navigate('/');
            return;
        }

        fetch(`http://localhost:8080/api/membership/${user.id}/membership`)
            .then((res) => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then((data) => setMembership(data))
            .catch();
    }, []);



    const handleCancel = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'This will cancel your current membership.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#6b7280',
            confirmButtonText: 'Yes, cancel it!'
        });

        if (result.isConfirmed) {
            try {
                await fetch(`http://localhost:8080/api/membership/${user.id}/membership`, {
                    method: 'DELETE',
                });
                notifySuccess("Membership cancelled.");
                setMembership(null);
            } catch {
                notifyError("Failed to cancel membership.");
            }
        }
    };


    return (
        <>
            <GlobalStyle />
            <div className="container">
                <SidebarMember/>

                <div className="main">
                    <h1>Your Membership Details</h1>
                    <p>Welcome to your membership page! Here, you can view all the details related to your active subscription, including its status, start and end dates, and price.</p>

                    <div className="membership-box">
                        {membership ? (
                            <>
                                <div className="membership-status">
                                    <span><strong>{membership.type}</strong></span>
                                    {new Date(membership.endDate) < new Date() ? (
                                        <span style={{ color: '#ef4444' }}>STATUS: INACTIVE</span>
                                    ) : (
                                        <span className="status-active">STATUS: ACTIVE</span>
                                    )}

                                </div>
                                <div className="details">
                                    <p>Start date: {new Date(membership.startDate).toLocaleDateString('en-GB')}</p>
                                    <p>End date: {new Date(membership.endDate).toLocaleDateString('en-GB')}</p>
                                    <p>Price: {membership.price} RON</p>
                                </div>
                            </>
                        ) : (
                            <p style={{
                                fontWeight: 'bold',
                                textAlign: 'center',
                                color: '#ef4444',
                                fontSize: '1.2rem'
                            }}>
                                You currently do not have an active membership.
                            </p>

                        )}

                        <p style={{ textAlign: 'center', fontWeight: 'bold', marginTop: '2rem' }}>
                            If you wish to renew or cancel your subscription, you can do so from the options below.
                        </p>

                        <div className="buttons">
                            <button onClick={() => navigate('/buy-membership')}>BUY</button>
                            <button className="cancel" onClick={handleCancel}>CANCEL</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}