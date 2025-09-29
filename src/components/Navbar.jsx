import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ user, onLogout }) {
    const navigate = useNavigate();

    // user가 없으면 Navbar 아예 렌더링 안함
    if (!user) return null;

    const handleLogout = () => {
        if (window.confirm("로그아웃 하시겠습니까?")) {
            onLogout();
            navigate("/login"); // 로그아웃 후 로그인 페이지로 이동
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-logo">[메뉴]</div>
            <ul className="navbar-menu">
                <li><Link to="/">홈</Link></li>
                <li><Link to="/mypage">마이페이지</Link></li>
                <li><Link to="/schedule">일정관리</Link></li>
                <li><Link to="/admin">관리자페이지</Link></li>
                <li>
                    <button className="logout-btn" onClick={handleLogout}>
                        로그아웃
                    </button>
                </li>
            </ul>
        </nav>
    );
}
