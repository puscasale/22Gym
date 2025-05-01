import { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import {notifyError, notifySuccess} from "../utils/Notify.ts";
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
    }

    .form-container {
        background: white;
        border-radius: 12px;
        padding: 2rem;
        max-width: 800px;
        margin: auto;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    .form-container h2 {
        text-align: center;
        margin-bottom: 2rem;
        color: #111827;
    }

    .form-group {
        display: flex;
        flex-direction: column;
        margin-bottom: 1.5rem;
    }

    .form-group label {
        margin-bottom: 0.5rem;
        color: #374151;
    }

    .form-group input,
    .form-group textarea {
        padding: 0.8rem;
        border-radius: 8px;
        border: 1px solid #d1d5db;
        font-size: 1rem;
    }

    button.add-button {
        width: 100%;
        padding: 1rem;
        background-color: #84cc16;
        color: white;
        font-weight: bold;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        font-size: 1.1rem;
        transition: background-color 0.2s ease;
    }

    button.add-button:hover {
        background-color: #65a30d;
    }

    .info-banner {
        max-width: 800px;
        margin: 0 auto 2rem auto;
        padding: 1rem 1.5rem;
        background: white;
        border-left: 6px solid #65a30d;
        border-radius: 10px;
        box-shadow: 0 2px 6px rgba(0, 0, 0, 0.05);
    }

`;

export default function AddClassTrainer() {
    const [form, setForm] = useState({
        name: '',
        date: '',
        startHour: '',
        endHour: '',
        description: '',
        maxCapacity:''
    });


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        // Validări simple
        if (!form.name || !form.date || !form.startHour || !form.endHour || !form.description || !form.maxCapacity) {
            notifyError("Please complete all fields!");
            return;
        }

        const today = new Date();
        const selectedDate = new Date(form.date);
        if (selectedDate < today) {
            notifyError("The date cannot be in the past.");
            return;
        }

        if (form.startHour >= form.endHour) {
            notifyError("Start hour must be before end hour.");
            return;
        }

        const maxCapacityNumber = parseInt(form.maxCapacity, 10);
        if (isNaN(maxCapacityNumber) || maxCapacityNumber <= 0) {
            notifyError("Maximum capacity must be a positive number.");
            return;
        }

        try {
            const storedUser = sessionStorage.getItem('user');
            const trainerId = storedUser ? JSON.parse(storedUser).id : null;
            alert(trainerId);
            await fetch('http://localhost:8080/api/classes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...form,
                    trainerId,
                    maxCapacity: maxCapacityNumber
                })
            });

            notifySuccess("Class added successfully!");
        } catch  {
            notifyError("An error occurred. Please try again.");
        }
    };



    return (
        <>
            <GlobalStyle />
            <div className="container">
                <SidebarTrainer/>

                <div className="main">
                    <div className="info-banner">
                        <h1 style={{ margin: 0 }}>Add New Fitness Class</h1>
                        <p style={{ marginTop: '0.5rem', color: '#4b5563' }}>
                            Please complete the form below to add a new fitness class. Make sure to provide accurate details, including the class name, date, time, maximum capacity and a clear description for the members.
                        </p>
                    </div>

                    <form className="form-container" onSubmit={handleSubmit}>

                        <div className="form-group">
                            <label htmlFor="name">Class Name</label>
                            <input type="text" id="name" name="name" value={form.name} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="date">Date</label>
                            <input type="date" id="date" name="date" value={form.date} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="startHour">Start Hour</label>
                            <input type="time" id="startHour" name="startHour" value={form.startHour} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="endHour">End Hour</label>
                            <input type="time" id="endHour" name="endHour" value={form.endHour} onChange={handleChange} required />
                        </div>

                        <div className="form-group">
                            <label htmlFor="maxCapacity">Maximum Capacity</label>
                            <input type="number" id="maxCapacity" name="maxCapacity" value={form.maxCapacity} onChange={handleChange} required min="1" />
                        </div>

                        <div className="form-group">
                            <label htmlFor="description">Description</label>
                            <textarea id="description" name="description" rows={4} value={form.description} onChange={handleChange} required />
                        </div>

                        <button type="submit" className="add-button">Add Class</button>
                    </form>
                </div>
            </div>
        </>
    );
}
