import React from 'react';

export default function MyPage({ user }) {
    if (!user) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>사용자 정보를 불러올 수 없습니다.</p>;

    return (
        <div style={{ maxWidth: 500, margin: '2rem auto' }}>
            <h2>내 정보</h2>
            <div style={{ lineHeight: '1.8' }}>
                <p><strong>학번:</strong> {user.studentId}</p>
                <p><strong>이름:</strong> {user.name}</p>
                <p><strong>Unit:</strong> {user.unit}</p>
                <p><strong>역할:</strong> {user.role}</p>
                <p><strong>출석률:</strong> {user.attendanceRate ?? '0'}%</p>
            </div>
        </div>
    );
}
