import React, { useEffect, useState } from "react";
import { getPendingUsers, approveUser } from "../api";
import "./AdminPage.css";

export default function AdminPage() {
    const [pendingUsers, setPendingUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadPending = async () => {
        setLoading(true);
        try {
            const res = await getPendingUsers();
            setPendingUsers(res.data || []);
        } catch (err) {
            alert("대기중인 회원을 불러오지 못했습니다.");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadPending(); }, []);

    const handleApprove = async (id) => {
        if (!window.confirm("승인하시겠습니까?")) return;
        try {
            await approveUser(id);
            setPendingUsers(prev => prev.filter(u => u.id !== id));
            alert("승인 완료!");
        } catch (err) {
            alert("승인 실패");
            console.error(err);
        }
    };

    if (loading) return <p style={{ textAlign: "center", marginTop: "2rem" }}>불러오는 중...</p>;

    return (
        <div className="admin-container">
            <h2>회원 승인</h2>
            {pendingUsers.length === 0 ? <p>대기중인 회원이 없습니다.</p> : (
                <ul className="pending-list">
                    {pendingUsers.map(u => (
                        <li key={u.id} className="pending-item">
                            <span>{u.name} ({u.studentId})</span>
                            <button onClick={() => handleApprove(u.id)}>승인</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
