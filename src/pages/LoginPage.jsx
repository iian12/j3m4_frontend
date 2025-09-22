// src/pages/LoginPage.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        // 실제 애플리케이션에서는 여기서 서버에 아이디/비밀번호를 보내 검증합니다.
        // 이 예제에서는 간단하게 입력만 하면 로그인 성공으로 처리합니다.
        if (username && password) {
            onLogin(); // App.jsx의 handleLogin 함수를 호출해 로그인 상태를 true로 변경
            navigate('/'); // 출석부 페이지로 이동
        } else {
            alert('아이디와 비밀번호를 입력하세요.');
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h1>로그인</h1>
                <div className="input-group">
                    <label htmlFor="username">학번</label>
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
            </form>
        </div>
    );
};

export default LoginPage;