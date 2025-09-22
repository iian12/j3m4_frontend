// src/App.jsx
import { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage.jsx';
import AttendancePage from './pages/AttendancePage.jsx';
import './App.css';

function App() {
    // 로그인 상태를 관리합니다. 실제로는 Redux나 Context API를 사용하는 것이 좋습니다.
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // 로그인 성공 시 호출될 함수
    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <BrowserRouter>
            <Routes>
                {/* '/login' 경로로 접속하면 LoginPage를 보여줍니다. */}
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />

                {/* 기본 '/' 경로로 접속하면 로그인 상태를 확인합니다. */}
                <Route
                    path="/"
                    element={
                        // 로그인 상태이면 출석부 페이지로, 아니면 로그인 페이지로 이동시킵니다.
                        isLoggedIn ? <AttendancePage /> : <Navigate to="/login" />
                    }
                />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
