import { useState } from 'react';
import styles from './LoginPage.module.css';
import axios from "axios"; // Folosim același fișier de stil

const SignupPage = () => {
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [agreeTerms, setAgreeTerms] = useState(false);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            alert('Parolele nu se potrivesc!');
            return;
        }
        if (!agreeTerms) {
            alert('Trebuie să fii de acord cu termenii!');
            return;
        }
        try {
            const response = await axios.post('http://localhost:8080/api/auth/signup', {
                username,
                email,
                password
            });
            console.log('Sign-up successful:', response.data);
            alert("Sign-up reușit!");
            // aici poți salva userul în localStorage sau redirect
        } catch (error) {
            console.error('Sign-up failed:', error);
            alert("Sign-up failed!");
        }

    };

    return (
        <div className={styles.container}>
            <div className={styles.leftSide}>
                <img src="/image.jpg" alt="Background" className={styles.bgImage} />
            </div>

            <div className={styles.rightSide}>
                <div className={styles.formBox}>
                    <h1 className={styles.title}>Create an Account</h1>

                    <form className={styles.form} onSubmit={handleSignup}>
                        <div>
                            <label className={styles.label}>Full Name</label>
                            <input
                                type="text"
                                className={styles.input}
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className={styles.label}>E-mail</label>
                            <input
                                type="email"
                                className={styles.input}
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

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

                        <div>
                            <label className={styles.label}>Confirm Password</label>
                            <input
                                type="password"
                                className={styles.input}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                        </div>

                        <div>
                            <label className={styles.label}>
                                <input
                                    type="checkbox"
                                    checked={agreeTerms}
                                    onChange={(e) => setAgreeTerms(e.target.checked)}
                                    style={{ marginRight: '0.5rem' }}
                                />
                                I agree to the <a href="#" className={styles.signupLink}>Terms & Conditions</a>
                            </label>
                        </div>

                        <button type="submit" className={styles.button}>Sign-up</button>

                        <p className={styles.signupText}>
                            Already have an account?{' '}
                            <a href="/" className={styles.signupLink}>Log in</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
