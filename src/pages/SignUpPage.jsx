import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LoginPage.css';   // 회원가입도 동일한 스타일 사용

export default function SignUpPage() {
    // 모든 key를 '' 로 초기화 → uncontrolled 방지
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
        setFormData((prev) => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // 실제 API 호출 대신 알림만
        alert('회원가입 완료! 관리자 승인 후 로그인 가능합니다.');
        navigate('/login');
    };

    return (
        <div className="login-container">
            <form className="sign-form" onSubmit={handleSubmit}>
                <h1>회원가입</h1>

                <div className="input-group">
                    <label htmlFor="studentId">학번</label>
                    <input
                        id="studentId"
                        name="studentId"
                        type="text"
                        value={formData.studentId}      // ✅ 빈 문자열 보장
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="password">비밀번호</label>
                    <input
                        id="password"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="name">이름</label>
                    <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="email">이메일</label>
                    <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="input-group">
                    <label htmlFor="phoneNumber">휴대전화</label>
                    <input
                        id="phoneNumber"
                        name="phoneNumber"
                        type="text"
                        value={formData.phoneNumber}
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
}
