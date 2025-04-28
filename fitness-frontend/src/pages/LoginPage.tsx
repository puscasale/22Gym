import { useState } from 'react';
import axios from 'axios';
import styles from './LoginPage.module.css';
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await axios.post(`http://localhost:8080/api/auth/login`, null, {
                params: {
                    username,
                    password
                }
            });

            const user = response.data;
            console.log('Login successful:', user);
            alert("Login reușit!");

            if (user.membership) {
                navigate('/main-member');  // dacă are membership => Member
            } else {
                navigate('/main-trainer'); // altfel => Trainer
            }

        } catch (error) {
            console.error('Login failed:', error);
            alert("Login eșuat! Verifică datele.");
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <img src="/image.jpg" alt="Background" className={styles.bgImage} />
            </div>

            <div className={styles.rightSide}>
                <div className={styles.formBox}>
                    <h1 className={styles.title}>Welcome Back!</h1>
                    <p className={styles.subtitle}>Log in to continue your fitness journey!</p>

                    <form className={styles.form} onSubmit={handleLogin}>
                        <div>
                            <label className={styles.label}>Username</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className={styles.label}>Password</label>
                            <input
                                type="password"
                                className={styles.input}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>

                        <button type="submit" className={styles.button}>Login</button>

                        <p className={styles.signupText}>
                            Don’t have an account yet?{' '}
                            <Link to="/signup" className={styles.signupLink}>Sign-up</Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
