// src/pages/SignUpPage.jsx
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { signup } from '../api/auth';
import './LoginPage.css'; // 공용 CSS import

const SignUpPage = () => {
    const [formData, setFormData] = useState({
        studentId: '',
        password: '',
        name: '',
        email: '',
        phoneNumber: ''
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(formData);
            alert('회원가입 성공! 관리자 승인 후 로그인 가능합니다.');
            navigate('/login');
        } catch (err) {
            console.error('회원가입 실패:', err);
            alert('회원가입 실패. 다시 시도해주세요.');
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h1>회원가입</h1>

                {/* 여기서 입력 필드 삽입 */}
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
                <div className="input-group">
                    <label htmlFor="phoneNumber">휴대전화</label>
                    <input
                        type="phoneNumber"
                        id="phoneNumber"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                    />
                </div>

                <button type="submit" className="login-button">가입 요청</button>

                <div className="form-footer">
                    이미 계정이 있으신가요? <Link to="/login">로그인</Link>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;
