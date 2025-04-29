import React, { useState } from 'react';
import { createGlobalStyle } from 'styled-components';
import {Link, useNavigate} from 'react-router-dom';
import SignupBg from '../assets/image.jpg';
import {notifyError, notifySuccess} from "../utils/Notify.ts"; // Imaginea de background, verifică calea!

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
    width: 105%;
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

export default function SignupPage() {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if(!fullName || !email || !username || !password || !confirmPassword){
            notifyError("Please fill in all fields!")
            return;
        }

        if (password !== confirmPassword) {
            notifyError("Passwords do not match!")
            return;
        }
        if (!agreeTerms) {
            alert('You need to agree to the terms!');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                }),
            });

            const text = await response.text();

            if (!response.ok) {
                notifyError(`Sign-up failed: ${text}`);
                return;
            }

            console.log('Sign-up successful:', text);
            notifySuccess('Sign-up reușit!');
            navigate("/");
        } catch (error) {
            console.error('Sign-up error:', error);
            alert('Eroare la sign-up.');
        }
    };

    return (
        <>
            <GlobalStyle />
            <div className="container">
                <div className="leftSide">
                    <img src={SignupBg} alt="Background" className="bgImage" />
                </div>

                <div className="rightSide">
                    <div className="formBox">
                        <h1 className="title">Create an Account</h1>

                        <form className="form" onSubmit={handleSignup}>
                            <div>
                                <label className="label">Full Name</label>
                                <input
                                    type="text"
                                    className="input"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="label">E-mail</label>
                                <input
                                    type="email"
                                    className="input"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>

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

                            <div>
                                <label className="label">Confirm Password</label>
                                <input
                                    type="password"
                                    className="input"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>

                            <div>
                                <label className="label" style={{ display: 'flex', alignItems: 'center' }}>
                                    <input
                                        type="checkbox"
                                        checked={agreeTerms}
                                        onChange={(e) => setAgreeTerms(e.target.checked)}
                                        style={{ marginRight: '0.5rem' }}
                                    />
                                    I agree to the <a href="#" className="signupLink">Terms & Conditions</a>
                                </label>
                            </div>

                            <button type="submit" className="button">Sign-up</button>

                            <p className="signupText">
                                Already have an account?
                                <Link to="/" className="signupLink"> Log in</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}
