import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';
import LoginBg from '../assets/image.jpg';
import {notifyError} from "../utils/Notify.ts"; // Imaginea de background, pui corect calea!

const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@400;600&display=swap');

  body {
    margin: 0;
    padding: 0;
    font-family: 'Josefin Sans', sans-serif;
    overflow: hidden;
  }

  .container {
    display: flex;
    height: 100vh;
    width: 100vw;
    overflow: hidden;
    margin: 0;
    padding: 0;
  }

  .leftSide {
    width: 35%;
    height: 100%;
    position: relative;
  }

  .bgImage {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .rightSide {
    width: 65%;
    background-color: #f3f4f6;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .formBox {
    width: 100%;
    max-width: 28rem;
    padding: 3rem 2rem;
    background-color: #f3f4f6;
  }

  .title {
    font-size: 3rem;
    font-weight: 700;
    color: #1f2937;
    margin-bottom: 0.5rem;
  }

  .subtitle {
    font-size: 1.125rem;
    color: #6b7280;
    margin-bottom: 2rem;
  }

  .form {
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
  }

  .label {
    font-size: 0.875rem;
    font-weight: 600;
    margin-bottom: 0.25rem;
  }

  .input {
    width: 100%;
    padding: 0.75rem;
    border-radius: 0.5rem;
    background-color: #e5e7eb;
    border: 1px solid #d1d5db;
    outline: none;
  }

  .button {
    width: 106%;
    background-color: #84cc16;
    color: white;
    font-weight: bold;
    padding: 0.75rem;
    border-radius: 0.5rem;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }

  .button:hover {
    background-color: #65a30d;
  }

  .signupText {
    font-size: 0.875rem;
    text-align: center;
    color: #4b5563;
  }

  .signupLink {
    color: #3b82f6;
    text-decoration: none;
  }

  .signupLink:hover {
    text-decoration: underline;
  }
`;

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!username || !password) {
            notifyError('Please fill in all fields!');
            return;
        }

        try {
            const url = new URL('http://localhost:8080/api/auth/login');
            url.searchParams.append('username', username);
            url.searchParams.append('password', password);

            const response = await fetch(url.toString(), { method: 'POST' });
            const text = await response.text();

            if (!response.ok) {
                notifyError(`Username or password incorect`);
                return;
            }

            const user = JSON.parse(text);
            sessionStorage.setItem("user", JSON.stringify(user));
            if (user.userType === 'MEMBER') {
                navigate('/main-member');
            } else {
                navigate('/main-trainer');
            }
        } catch (error) {
            console.error('Login error:', error);
            notifyError('An error occurred during login. Please try again.');
        }
    };


    return (
        <>
            <GlobalStyle />
            <div className="container">
                <div className="leftSide">
                    <img src={LoginBg} alt="Background" className="bgImage" />
                </div>

                <div className="rightSide">
                    <div className="formBox">
                        <h1 className="title">Welcome Back!</h1>
                        <p className="subtitle">Log in to continue your fitness journey!</p>

                        <form className="form" onSubmit={handleLogin}>
                            <div>
                                <label className="label">Username</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="label">Password</label>
                                <input
                                    type="password"
                                    className="input"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>

                            <button type="submit" className="button">Login</button>

                            <p className="signupText">
                                Don’t have an account yet?{' '}
                                <Link to="/signup" className="signupLink">Sign-up</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
