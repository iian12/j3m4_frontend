// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Link 추가

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            onLogin();
            // 로그인 성공 시 '/attendance' 경로로 이동하도록 수정
            navigate('/attendance');
        } else {
            alert('학번과 비밀번호를 입력하세요.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h1>로그인</h1>
                <div className="input-group">
                    <label htmlFor="username">학번 (ID)</label>
                    <input
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button type="submit" className="login-button">로그인</button>
                {/* 회원가입 링크 추가 */}
                <div className="form-footer">
                    계정이 없으신가요? <Link to="/signup">회원가입</Link>
                </div>
            </form>
        </div>
    );
};

export default LoginPage;