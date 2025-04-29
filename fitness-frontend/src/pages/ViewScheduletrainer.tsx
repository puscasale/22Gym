import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import Logo from '../assets/logobanner.png';
import { notifyError, notifySuccess } from '../utils/Notify';
import Swal from "sweetalert2";

interface FitnessClass {
    id: number;
    name: string;
    date: string;
    startHour: string;
    endHour: string;
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
    }

    table {
        width: 100%;
        border-collapse: collapse;
        background: white;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }

    th, td {
        padding: 1rem;
        text-align: center;
        border-bottom: 1px solid #e5e7eb;
    }

    th {
        background-color: #84cc16;
        color: white;
        font-weight: bold;
    }

    button.action-button {
        margin: 0 5px;
        padding: 0.5rem 0.8rem;
        background-color: #111827;
        color: white;
        border: none;
        border-radius: 6px;
        cursor: pointer;
        font-size: 0.9rem;
    }

    button.action-button.delete {
        background-color: #ef4444;
    }
`;

export default function ViewScheduleTrainer() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [classes, setClasses] = useState<FitnessClass[]>([]);
    const [selectedDate, setSelectedDate] = useState(() => new Date().toISOString().split('T')[0]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch('http://localhost:8080/api/classes')
            .then((res) => res.json())
            .then((data) => setClasses(data))
            .catch(() => notifyError('Failed to load classes'));
    }, []);

    const handleViewParticipants = (id: number) => {
        navigate(`/view-participants/${id}`);
    };

    const handleEditClass = (id: number) => {
        navigate(`/edit-class/${id}`);
    };

    const handleDeleteClass = async (id: number) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#84cc16',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        });

        if (result.isConfirmed) {
            try {
                await fetch(`http://localhost:8080/api/classes/${id}`, { method: 'DELETE' });
                setClasses(prev => prev.filter(c => c.id !== id));
                notifySuccess('Class deleted successfully!');
            } catch {
                notifyError('Failed to delete class');
            }
        }
    };

    const handleLogout = () => {
        sessionStorage.clear();
        navigate('/');
    };

    const filteredClasses = classes.filter(cls => cls.date === selectedDate);

    return (
        <>
            <GlobalStyle />
            <div className="container">
                <aside className={`sidebar ${sidebarOpen ? '' : 'closed'}`}>
                    <img className="logo" src={Logo} alt="22GYM Logo" />
                    <button className="toggle-button" onClick={() => setSidebarOpen(!sidebarOpen)}>
                        {sidebarOpen ? 'Hide' : 'Show'}
                    </button>
                    <nav>
                        <Link to="/main-trainer">Home</Link>
                        <Link to="/view-classes-trainer">View Classes</Link>
                        <Link to="/view-schedule-trainer">View Schedule</Link>
                        <Link to="#">Add Class</Link>
                        <Link to="#">Settings</Link>
                    </nav>
                    <div className="sidebar-footer">
                        <a href="#" onClick={handleLogout}>Logout</a>
                    </div>
                </aside>

                <div className="main">
                    <h1 style={{ marginBottom: '1rem' }}>Your Schedule</h1>

                    <div style={{ marginBottom: '2rem' }}>
                        <label style={{ fontWeight: 'bold', marginRight: '1rem' }}>Select Date:</label>
                        <input
                            type="date"
                            value={selectedDate}
                            onChange={(e) => setSelectedDate(e.target.value)}
                            style={{ padding: '0.5rem', borderRadius: '8px', border: '1px solid #d1d5db' }}
                        />
                    </div>

                    <table>
                        <thead>
                        <tr>
                            <th>Class Name</th>
                            <th>Date</th>
                            <th>Start Hour</th>
                            <th>End Hour</th>
                            <th>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {filteredClasses.map((cls) => (
                            <tr key={cls.id}>
                                <td>{cls.name}</td>
                                <td>{new Date(cls.date).toLocaleDateString('en-GB')}</td>
                                <td>{cls.startHour.slice(0, 5)}</td>
                                <td>{cls.endHour.slice(0, 5)}</td>
                                <td>
                                    <button className="action-button" onClick={() => handleViewParticipants(cls.id)}>View Participants</button>
                                    <button className="action-button" onClick={() => handleEditClass(cls.id)}>Edit</button>
                                    <button className="action-button delete" onClick={() => handleDeleteClass(cls.id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}
