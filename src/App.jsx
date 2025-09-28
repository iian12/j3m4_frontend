import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import AttendancePage from "./pages/AttendancePage";


const AppContent = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();


    const handleLogin = (userData) => {
        setUser(userData);
    };


    const handleLogout = () => {
        localStorage.removeItem("token");
        setUser(null);
        navigate("/", { replace: true });
    };


// 새로고침 대비 — 토큰 존재 시, 서버에서 me 조회하거나(선택) 최소 저장된 사용자 복원 로직 추가 가능
    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token && !user) {

// setUser({ studyId: "TEMP" });
        }
    }, [user]);


    const isAuthed = !!user && !!user.studyId; // ✅ 보호 조건 통일


    return (
        <>
            <nav style={{ padding: "1rem", background: "#f0f0f0", display: "flex", gap: "1rem" }}>
                <Link to="/">홈</Link>
                {isAuthed ? (
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
                        element={isAuthed ? <AttendancePage studyId={user.studyId} /> : <Navigate to="/login" replace />}
                    />
                </Routes>
            </main>
        </>
    );
};


function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}


export default App;