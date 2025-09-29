import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getScheduleList, createSchedule, deleteSchedule } from "../api";
import "./SchedulePage.css";

export default function SchedulePage({ role }) {
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [showCreate, setShowCreate] = useState(false);
    const [form, setForm] = useState({ title: "", place: "", description: "", time: "" });
    const navigate = useNavigate();

    const loadSchedules = async () => {
        setLoading(true);
        try {
            const res = await getScheduleList();
            setSchedules(res.data || []);
        } catch (err) {
            alert("일정 불러오기 실패");
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadSchedules(); }, []);

    const onChange = e => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    const onCreate = async e => {
        e.preventDefault();
        try {
            await createSchedule(form);
            setForm({ title: "", place: "", description: "", time: "" });
            setShowCreate(false);
            loadSchedules();
        } catch (err) {
            alert("일정 생성 실패");
            console.error(err);
        }
    };
    const onDelete = async id => {
        if (!window.confirm("이 일정을 삭제하시겠습니까?")) return;
        try {
            await deleteSchedule(id);
            loadSchedules();
        } catch (err) {
            alert("삭제 실패");
            console.error(err);
        }
    };
    const goToAttendance = scheduleId => navigate(`/attendance/${scheduleId}`);

    return (
        <div className="schedules-container">
            <h2>일정 관리</h2>
            {role !== "USER" && <button className="new-btn" onClick={() => setShowCreate(true)}>➕ 새 일정</button>}

            {loading ? <p>불러오는 중…</p> : (
                <ul className="schedule-list">
                    {schedules.map(s => (
                        <li key={s.id}>
                            <div className="schedule-info">
                                <strong>{s.title}</strong>
                                <div>{s.place} | {s.time ? new Date(s.time).toLocaleString() : "시간 미정"}</div>
                                {s.description && <div className="schedule-desc">{s.description}</div>}
                            </div>
                            <div className="schedule-actions">
                                <button
                                    className="attendance-btn"
                                    onClick={() => goToAttendance(s.id)}
                                    disabled={role === "USER"}
                                >
                                    출석체크
                                </button>
                                {role !== "USER" && <button className="delete-btn" onClick={() => onDelete(s.id)}>삭제</button>}
                            </div>
                        </li>
                    ))}
                    {schedules.length === 0 && <li>등록된 일정이 없습니다.</li>}
                </ul>
            )}

            {showCreate && role !== "USER" && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>새 일정 등록</h3>
                        <form onSubmit={onCreate} className="new-schedule-form">
                            <input name="title" placeholder="제목" value={form.title} onChange={onChange} required />
                            <input name="place" placeholder="장소" value={form.place} onChange={onChange} required />
                            <input name="description" placeholder="설명" value={form.description} onChange={onChange} />
                            <input type="datetime-local" name="time" value={form.time} onChange={onChange} required />
                            <div className="form-actions">
                                <button type="submit">생성</button>
                                <button type="button" onClick={() => setShowCreate(false)}>취소</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
