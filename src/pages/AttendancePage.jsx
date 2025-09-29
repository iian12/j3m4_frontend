import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAttendanceHistory, checkAttendance } from "../api";
import "./AttendancePage.css";

export default function AttendancePage({ role, user }) {
    const { scheduleId } = useParams();
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const today = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
                const res = await getAttendanceHistory(user.studyId, scheduleId, today);
                setStudents(res.data || []);
            } catch (err) {
                alert("출석 데이터를 불러오지 못했습니다.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchAttendance();
    }, [scheduleId, user.studyId]);

    const handleStatusChange = (id, status) => {
        if (role === "USER") {
            alert("출석체크 권한이 없습니다.");
            return;
        }
        setStudents(prev => prev.map(s => s.id === id ? { ...s, status } : s));
    };

    const handleSave = async () => {
        if (role === "USER") {
            alert("출석체크 권한이 없습니다.");
            return;
        }

        try {
            const today = new Date().toISOString().split("T")[0];
            for (let s of students) {
                await checkAttendance(user.studyId, {
                    studentId: s.studentId,
                    status: s.status,
                    scheduleId,
                    date: today
                });
            }
            alert("출석 저장 완료!");
        } catch (err) {
            alert("출석 저장 실패");
            console.error(err);
        }
    };

    if (loading) return <p>불러오는 중…</p>;

    return (
        <div className="attendance-container">
            <h1>출석체크</h1>
            <div className="student-list">
                {students.map(s => (
                    <div
                        key={s.id}
                        className={`student-item ${
                            s.status === "출석" ? "present" :
                                s.status === "지각" ? "late" : "absent"
                        }`}
                    >
                        <div className="student-info">
                            <span className="student-name">{s.name}</span>
                            <span className="student-id">{s.studentId}</span>
                        </div>
                        <div className="status-buttons">
                            <button
                                className={s.status === "출석" ? "present-btn" : ""}
                                onClick={() => handleStatusChange(s.id, "출석")}
                                disabled={role === "USER"}
                            >
                                출석
                            </button>
                            <button
                                className={s.status === "지각" ? "late-btn" : ""}
                                onClick={() => handleStatusChange(s.id, "지각")}
                                disabled={role === "USER"}
                            >
                                지각
                            </button>
                            <button
                                className={s.status === "결석" ? "absent-btn" : ""}
                                onClick={() => handleStatusChange(s.id, "결석")}
                                disabled={role === "USER"}
                            >
                                결석
                            </button>
                        </div>
                    </div>
                ))}
            </div>
            <button className="save-btn" onClick={handleSave} disabled={role === "USER"}>
                저장
            </button>
        </div>
    );
}
