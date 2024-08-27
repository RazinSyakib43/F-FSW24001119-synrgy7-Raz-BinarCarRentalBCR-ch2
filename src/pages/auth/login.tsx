import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

import bannerImage from '../../assets/images/login/loginImage.png';
import loginLogo from '../../assets/images/login/loginLogo.png';

import '../../style/login/style.css';

export function LoginPage() {
    const { login } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await login(email, password);
            navigate('/dashboard/');
        } catch (error) {
            console.error('Failed to login', error);
        }
    };

    return (
        <section className="loginPage">
            <div className="bannerImage">
                <img src={bannerImage} alt="" />
            </div>
            <div className="loginForm">
                <img className="loginLogo" src={loginLogo} alt="" />
                <div className="loginForm__header">
                    <h1 className="login_welcome_title">Welcome, Admin BCR!!</h1>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group
                    ">
                        <label className="loginLabel" htmlFor="email">Email</label>
                        <input type="email" className="form-control loginInput" id="email" aria-describedby="emailHelp"
                            placeholder="Contoh: johndee@gmail.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    <div className="form-group mt-3">
                        <label className="loginLabel" htmlFor="password">Password</label>
                        <input type="password" className="form-control loginInput" id="password" placeholder="6+ karakter" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit" className="btn loginButton mt-3">Sign In</button>
                </form>
            </div>
        </section>
    );
}
