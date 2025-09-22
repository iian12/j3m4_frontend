// src/pages/SignUpPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        studentId: '',
        password: '',
        name: '',
        email: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 실제로는 이 부분에서 서버로 회원가입 데이터를 전송합니다.
        // 예: axios.post('/api/register', formData);

        console.log('회원가입 정보:', formData);

        // 요청이 성공적으로 보내졌다고 가정하고 사용자에게 알림
        alert('회원가입 요청이 관리자에게 전송되었습니다. 승인 후 로그인이 가능합니다.');

        // 알림 후 로그인 페이지로 이동
        navigate('/login');
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h1>회원가입</h1>
                <div className="input-group">
                    <label htmlFor="studentId">학번 (ID)</label>
                    <input
                        type="text"
                        id="studentId"
                        name="studentId"
                        value={formData.studentId}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="name">이름</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="input-group">
                    <label htmlFor="email">이메일</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>
                <button type="submit" className="login-button">
                    가입 요청
                </button>
                <div className="form-footer">
                    이미 계정이 있으신가요? <Link to="/login">로그인</Link>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;