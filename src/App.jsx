// src/App.jsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignUpPage from "./pages/SignUpPage";
import MyPage from "./pages/MyPage";
import AdminPage from "./pages/AdminPage";
import SchedulePage from "./pages/SchedulePage";
import AttendancePage from "./pages/AttendancePage";

function AppRoutes({ user, setUser }) {
    const location = useLocation();

    useEffect(() => {
        if (location.state?.alert) {
            alert(location.state.alert);
        }
    }, [location.state]);

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />

            <Route
                path="/login"
                element={<LoginPage onLogin={setUser} />}
            />
            <Route path="/signup" element={<SignUpPage />} />

            <Route
                path="/mypage"
                element={
                    user && user.isApproved ? (
                        <MyPage user={user} />
                    ) : (
                        <Navigate to="/login" />
                    )
                }
            />

            <Route
                path="/admin"
                element={
                    user?.role === "ADMIN" ? (
                        <AdminPage />
                    ) : (
                        <Navigate to="/" state={{ alert: "관리자만 접근 가능합니다." }} />
                    )
                }
            />

            <Route
                path="/schedule"
                element={user ? <SchedulePage role={user.role} /> : <Navigate to="/login" />}
            />

            <Route
                path="/attendance/:scheduleId"
                element={user ? <AttendancePage role={user.role} /> : <Navigate to="/login" />}
            />

            <Route path="*" element={<Navigate to="/" />} />
        </Routes>
    );
}

export default function App() {
    const [user, setUser] = useState(null);

    // 처음에는 로그아웃 상태
    useEffect(() => {
        const stored = localStorage.getItem("user");
        if (stored) setUser(JSON.parse(stored));
    }, []);

    const handleLogout = () => {
        setUser(null);
        localStorage.removeItem("user");
    };

    return (
        <Router>
            {/* 로그인 상태일 때만 Navbar 표시 */}
            {user && <Navbar user={user} onLogout={handleLogout} />}

            {/* 라우트 */}
            <AppRoutes user={user} setUser={setUser} />
        </Router>
    );
}
