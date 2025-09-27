// src/App.jsx

import React, { useState } from 'react';
// useNavigate를 import 합니다.
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AttendancePage from './pages/AttendancePage';

// 라우터 컨텍스트 안에서만 useNavigate를 호출할 수 있으므로 App 컴포넌트를 분리합니다.
const AppContent = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate(); // 페이지 이동을 위해 useNavigate hook 사용

    const handleLogin = (userData) => {
        setUser(userData);
    };

    // ✅ 1. handleLogout 함수에 navigate 로직 추가
    const handleLogout = () => {
        localStorage.removeItem('token');
        setUser(null);
        navigate('/'); // 로그아웃 후 홈으로 이동
    };

    // ... useEffect 로직 ...

    return (
        <>
            <nav style={{ padding: '1rem', background: '#f0f0f0', display: 'flex', gap: '1rem' }}>
                <Link to="/">홈</Link>
                {user ? (
                    // ✅ 2. 사용자가 로그인 상태일 때 로그아웃 버튼 표시
                    <button onClick={handleLogout}>로그아웃</button>
                ) : (
                    <Link to="/login">로그인</Link>
                )}
            </nav>
            <main>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route
                        path="/attendance"
                        element={
                            user && user.studyId ? (
                                <AttendancePage studyId={user.studyId} />
                            ) : (
                                <Navigate to="/login" replace />
                            )
                        }
                    />
                </Routes>
            </main>
        </>
    );
};

// 최상위 컴포넌트에서 Router를 설정합니다.
function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}

export default App;