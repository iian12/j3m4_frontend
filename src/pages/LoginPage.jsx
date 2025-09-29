import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../api';
import './LoginPage.css';

export default function LoginPage({ onLogin }) {
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

            // ✅ studyId 기본값 보정 + role 저장
            const safeUser = {
                ...(user || {}),
                studyId: user?.studyId ?? username
            };

            onLogin?.(safeUser);
            localStorage.setItem('user', JSON.stringify(safeUser));
            alert('로그인 성공!');

            // ✅ 역할별 이동
            switch (safeUser.role) {
                case 'ADMIN':
                    navigate('/admin', { replace: true });
                    break;
                case 'MANAGER':
                    navigate('/schedule', { replace: true });
                    break;
                default: // USER
                    navigate('/mypage', { replace: true });
                    break;
            }
        } catch (error) {
            console.error('로그인 실패:', error);
            alert('로그인 실패. 아이디/비밀번호 확인');
        }
    };

    return (
        <div className="login-container">
            <div className="login-form">
                <h1>로그인</h1>
                <form onSubmit={handleSubmit}>
                    <div className="input-group">
                        <label>학번</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div className="input-group">
                        <label>비밀번호</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <button className="login-button" type="submit">로그인</button>
                </form>
            </div>
        </div>
    );
}