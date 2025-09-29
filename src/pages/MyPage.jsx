import React from 'react';
import './MyPage.css';

export default function MyPage({ user }) {
    return (
        <div className="my-container">
            <h2>마이페이지</h2>
            <p>환영합니다, {user?.name || '사용자'}!</p>
            <div className="my-info">
                <p>학번: {user?.username}</p>
                <p>Unit: {user?.unit}</p>
                <p>출석률: {user?.attendanceRate}%</p>
            </div>
        </div>
    );
}
