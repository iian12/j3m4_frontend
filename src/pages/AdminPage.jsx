import React, { useEffect, useState } from 'react';
import { api } from '../api';

export default function AdminPage() {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPending = async () => {
            try {
                const res = await api.get('/users/pending');
                setPendingUsers(res.data || []);
            } catch (err) {
                console.error('대기 회원 조회 실패:', err);
                alert('대기 회원 조회 실패');
            } finally {
                setLoading(false);
            }
        };
        fetchPending();
    }, []);

    const approveUser = async (id) => {
        if (!window.confirm('이 회원을 승인하시겠습니까?')) return;
        try {
            await api.post(`/users/approve/${id}`);
            setPendingUsers((prev) => prev.filter((u) => u.id !== id));
            alert('승인 완료!');
        } catch (err) {
            console.error('승인 실패:', err);
            alert('승인 실패');
        }
    };

    if (loading) return <p style={{ textAlign: 'center', marginTop: '2rem' }}>불러오는 중...</p>;

    return (
        <div style={{ maxWidth: 600, margin: '2rem auto' }}>
            <h2>회원 승인</h2>
            {pendingUsers.length === 0 ? (
                <p>대기 중인 회원이 없습니다.</p>
            ) : (
                pendingUsers.map((u) => (
                    <div
                        key={u.id}
                        style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            padding: '0.5rem 1rem',
                            marginBottom: '0.5rem'
                        }}
                    >
                        <span>{u.name} ({u.studentId})</span>
                        <button onClick={() => approveUser(u.id)}>승인</button>
                    </div>
                ))
            )}
        </div>
    );
}
