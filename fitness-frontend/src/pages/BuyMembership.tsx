import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import SidebarMember from "../components/SidebarMember";
import { notifyError, notifySuccess } from "../utils/Notify";

interface Membership {
    id: number;
    type: string;
    months: number;
    price: number;
}

interface ExistingMembership {
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
        background-color: #f3f4f6;
    }

    .container {
        display: flex;
        height: 100vh;
        width: 100vw;
    }

    .main {
        flex: 1;
        padding: 3rem 4rem;
        background-color: #f9fafb;
        overflow-y: auto;
    }

    .membership-list {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
        margin-top: 2rem;
    }

    .membership-card {
        background: white;
        border-radius: 12px;
        padding: 1.5rem 2rem;
        margin-bottom: 1.5rem;
        display: flex;
        justify-content: space-between;
        align-items: center;
        box-shadow: 0 4px 8px rgba(0,0,0,0.05);
    }

    .membership-info {
        flex: 1;
    }

    .membership-info h3 {
        margin: 0 0 0.5rem 0;
        font-size: 1.2rem;
        color: #111827;
    }

    .membership-info p {
        margin: 0.25rem 0;
        color: #4b5563;
        font-size: 0.95rem;
    }

    .membership-action {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        gap: 0.5rem;
    }

    .price {
        font-weight: bold;
        font-size: 1.2rem;
        color: #6b7280;
    }

    .per-month {
        font-weight: normal;
        font-size: 0.9rem;
    }

    .buy-button {
        background-color: #84cc16;
        color: white;
        border: none;
        padding: 0.6rem 1.4rem;
        border-radius: 8px;
        font-weight: bold;
        cursor: pointer;
        font-size: 1rem;
        transition: background 0.2s ease-in-out;
    }

    .buy-button:hover {
        background-color: #65a30d;
    }

    .buy-button:disabled {
        background-color: #d1d5db;
        cursor: not-allowed;
    }

    .main p {
        font-size: 1rem;
        line-height: 1.6;
    }

    .description p {
        font-size: 1.3rem;
        line-height: 1.6;
        color: #374151;
    }
`;

export default function BuyMembership() {
    const [memberships, setMemberships] = useState<Membership[]>([]);
    const [existingMembership, setExistingMembership] = useState<ExistingMembership | null>(null);
    const navigate = useNavigate();

    const storedUser = sessionStorage.getItem('user');
    const user = storedUser ? JSON.parse(storedUser) : null;

    useEffect(() => {
        const storedUser = sessionStorage.getItem('user');
        const user = storedUser ? JSON.parse(storedUser) : null;

        if (!user) {
            navigate('/');
            return;
        }

        fetch("http://localhost:8080/api/membership/all")
            .then(res => res.json())
            .then(data => setMemberships(data))
            .catch(() => notifyError("Failed to load memberships"));

        fetch(`http://localhost:8080/api/membership/${user.id}/membership`)
            .then(res => {
                if (!res.ok) throw new Error();
                return res.json();
            })
            .then(data => setExistingMembership(data))
            .catch(() => setExistingMembership(null));
    }, [navigate]); // 🟢 fără `user` aici


    const hasActiveMembership = (): boolean => {
        if (!existingMembership) return false;
        return new Date(existingMembership.endDate) > new Date();
    };

    const handleBuy = async (membershipId: number) => {
        if (hasActiveMembership()) {
            notifyError("You already have an active membership.");
            return;
        }

        try {
            await fetch(`http://localhost:8080/api/membership/${user.id}/membership/${membershipId}`, {
                method: 'POST',
            });
            notifySuccess("Membership purchased successfully!");
            navigate("/view-membership");
        } catch {
            notifyError("Failed to purchase membership.");
        }
    };

    return (
        <>
            <GlobalStyle />
            <div className="container">
                <SidebarMember />

                <div className="main">
                    <h1>Choose the subscription that suits you</h1>

                    {hasActiveMembership() && (
                        <p style={{ color: '#dc2626', fontWeight: 'bold', marginTop: '1rem' }}>
                            You already have an active membership until{" "}
                            {new Date(existingMembership!.endDate).toLocaleDateString('en-GB')}.
                        </p>
                    )}

                    <div className="description">
                        <p>Select the subscription you wish to purchase from the list below. In the next step, you will be able to pay online using your bank card.</p>
                        <p>The prices shown are per month, regardless of the subscription duration. For subscriptions longer than one month, the total amount for the entire period will be charged upfront.</p>
                    </div>

                    <div className="membership-list">
                        {memberships.map((m) => {
                            const startDate = new Date();
                            const endDate = new Date();
                            endDate.setMonth(endDate.getMonth() + m.months);

                            return (
                                <div key={m.id} className="membership-card">
                                    <div className="membership-info">
                                        <h3>{`${m.type.toUpperCase()} ${m.months} ${m.months === 1 ? 'MONTH' : 'MONTHS'}`}</h3>
                                        <p>Start date: {startDate.toLocaleDateString('en-GB')}</p>
                                        <p>End date: {endDate.toLocaleDateString('en-GB')}</p>
                                        <p>Price: {m.price} RON</p>
                                    </div>
                                    <div className="membership-action">
                                        <span className="price">
                                            {m.price.toFixed(2)} RON <span className="per-month">per month</span>
                                        </span>
                                        <button
                                            className="buy-button"
                                            onClick={() => handleBuy(m.id)}
                                            disabled={hasActiveMembership()}
                                        >
                                            BUY
                                        </button>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
}
