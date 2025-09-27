import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { login } from '../api/auth';
import './LoginPage.css'; // 🔹 CSS import

const LoginPage = ({ onLogin }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!username || !password) return alert('학번과 비밀번호를 입력하세요.');

        try {
            const res = await login({ studentId: username, password });
            localStorage.setItem('token', res.data.token);
            if (onLogin) onLogin(res.data.user);
            alert('로그인 성공!');
            navigate('/attendance');
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
                        type="text"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
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
