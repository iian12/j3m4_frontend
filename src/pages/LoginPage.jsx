import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api'; // Axios API
import './LoginPage.css';

export default function LoginPage({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await login({ studentId: username, password });
            const user = res.data.user;
            onLogin(user);
            localStorage.setItem('user', JSON.stringify(user));

            if (user.role === 'ADMIN') navigate('/admin');
            else if (user.role === 'MANAGER') navigate('/schedule');
            else navigate('/mypage');

            alert('로그인 성공!');
        } catch (err) {
            alert(err.response?.data?.message || '로그인 실패');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>로그인</h1>
                <div className="input-group">
                    <label htmlFor="studentId">학번</label>
                    <input
                        id="studentId"
                        name="studentId"
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="login-button">로그인</button>
            </form>
        </div>
    );
}
