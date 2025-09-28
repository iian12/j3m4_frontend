// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/index.js';          // <- 통합 api index에서 import
import './LoginPage.css';                // CSS

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) {
            alert('학번과 비밀번호를 입력하세요.');
            return;
        }

        try {
            const res = await login({ studentId: username, password });
            const { token, user } = res?.data || {};
            if (token) localStorage.setItem('token', token);

            // studyId 없을 경우 username으로 대체
            const safeUser = { ...(user || {}), studyId: user?.studyId ?? username };

            onLogin?.(safeUser);
            alert('로그인 성공!');
            navigate('/attendance', { replace: true });
        } catch (err) {
            console.error('로그인 실패:', err);
            alert('로그인 실패. 아이디/비밀번호 확인');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h1>로그인</h1>

                <div className="input-group">
                    <label htmlFor="username">학번 (ID)</label>
                    <input
                        id="username"
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
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>

                <button type="submit" className="login-button">로그인</button>

                <div className="form-footer">
                    계정이 없으신가요? <Link to="/signup">회원가입</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;
