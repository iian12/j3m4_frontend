// src/App.jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import AttendancePage from './pages/AttendancePage';
import HomePage from './pages/HomePage';       // 추가
import SignUpPage from './pages/SignUpPage';   // 추가
import './App.css';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <BrowserRouter>
            <Routes>
                {/* 1. 초기 페이지 경로 */}
                <Route path="/" element={<HomePage />} />

                {/* 2. 회원가입 페이지 경로 */}
                <Route path="/signup" element={<SignUpPage />} />

                {/* 3. 로그인 페이지 경로 */}
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

                {/* 4. 출석부 페이지 경로 (로그인해야 접근 가능) */}
                <Route
                    path="/attendance"
                    element={
                        isLoggedIn ? <AttendancePage /> : <Navigate to="/login" />
                    }
                />

                {/* 잘못된 경로로 접근 시 초기 페이지로 이동 */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;