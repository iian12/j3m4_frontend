import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import SchedulePage from './pages/SchedulePage';
import AttendancePage from './pages/AttendancePage';
import AdminPage from './pages/AdminPage';
import MyPage from './pages/MyPage';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) setUser(JSON.parse(savedUser));
    }, []);

    const handleLogin = (loggedUser) => {
        setUser(loggedUser);
        localStorage.setItem('user', JSON.stringify(loggedUser));
    };

    const isAuthed = !!user;

    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
                <Route path="/signup" element={<SignupPage />} />

                {/* MANAGER & ADMIN 공통 페이지 */}
                <Route
                    path="/schedule"
                    element={
                        isAuthed && ['MANAGER', 'ADMIN'].includes(user.role)
                            ? <SchedulePage />
                            : <Navigate to="/login" replace />
                    }
                />
                <Route
                    path="/attendance"
                    element={
                        isAuthed && ['MANAGER', 'ADMIN'].includes(user.role)
                            ? <AttendancePage studyId={user.studyId} />
                            : <Navigate to="/login" replace />
                    }
                />

                {/* USER 전용 페이지 */}
                <Route
                    path="/mypage"
                    element={
                        isAuthed && user.role === 'USER'
                            ? <MyPage user={user} />
                            : <Navigate to="/login" replace />
                    }
                />

                {/* ADMIN 전용 페이지 */}
                <Route
                    path="/admin"
                    element={
                        isAuthed && user.role === 'ADMIN'
                            ? <AdminPage />
                            : <Navigate to="/login" replace />
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
