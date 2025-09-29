import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getScheduleList, createSchedule, deleteSchedule } from '../api/index';
import './SchedulePage.css';

export default function SchedulePage() {
    const navigate = useNavigate();
    const [schedules, setSchedules] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState(null);

    // 새 일정 모달 상태
    const [showCreate, setShowCreate] = useState(false);
    const [form, setForm] = useState({
        title: '',
        place: '',
        description: '',
        time: '', // datetime-local
    });

    // ✅ 로그인 사용자 정보 확인 (MANAGER, ADMIN 외 접근 차단)
    useEffect(() => {
        const stored = localStorage.getItem('user');
        if (stored) {
            const u = JSON.parse(stored);
            if (!['MANAGER', 'ADMIN'].includes(u.role)) {
                alert('접근 권한이 없습니다.');
                navigate('/', { replace: true });
            }
        } else {
            navigate('/login', { replace: true });
        }
    }, [navigate]);

    // 일정 불러오기
    const load = useCallback(async () => {
        setLoading(true);
        setErr(null);
        try {
            const res = await getScheduleList();
            setSchedules(res?.data ?? []);
        } catch (e) {
            console.error(e);
            setErr('일정 목록을 불러오지 못했습니다.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => { load(); }, [load]);

    // 입력 변경
    const onChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    // 일정 생성
    const onCreate = async (e) => {
        e.preventDefault();
        try {
            await createSchedule(form); // time은 API에서 ISO 변환 처리됨
            setShowCreate(false);
            setForm({ title: '', place: '', description: '', time: '' });
            await load();
        } catch (e) {
            console.error(e);
            alert('일정 생성 실패');
        }
    };

    // 일정 삭제
    const onDelete = async (id) => {
        if (!window.confirm('해당 일정을 삭제할까요?')) return;
        try {
            await deleteSchedule(id);
            await load();
        } catch (e) {
            console.error(e);
            alert('삭제 실패');
        }
    };

    // 출석 페이지로 이동
    const goAttendance = (id) => {
        navigate(`/attendance?scheduleId=${id}`);
    };

    return (
        <div className="schedules-container">
            <h2>일정 관리</h2>

            <div className="toolbar">
                <button onClick={() => setShowCreate(true)}>새 일정</button>
            </div>

            {loading && <p>불러오는 중…</p>}
            {err && <p className="error">{err}</p>}

            <ul className="schedule-list">
                {schedules.map(s => (
                    <li key={s.id}>
                        <div
                            className="meta"
                            onClick={() => goAttendance(s.id)}
                            role="button"
                            tabIndex={0}
                        >
                            <div className="title">{s.title}</div>
                            <div className="sub">
                                {s.place} · {s.time ? new Date(s.time).toLocaleString() : '시간 미정'}
                            </div>
                        </div>
                        <button onClick={() => onDelete(s.id)}>삭제</button>
                    </li>
                ))}
                {(!loading && !err && schedules.length === 0) && (
                    <li className="empty">등록된 일정이 없습니다.</li>
                )}
            </ul>

            {showCreate && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>새 일정 생성</h3>
                        <form onSubmit={onCreate} className="new-schedule-form">
                            <input
                                name="title"
                                placeholder="제목"
                                value={form.title}
                                onChange={onChange}
                                required
                            />
                            <input
                                name="place"
                                placeholder="장소"
                                value={form.place}
                                onChange={onChange}
                                required
                            />
                            <input
                                name="description"
                                placeholder="설명"
                                value={form.description}
                                onChange={onChange}
                            />
                            <input
                                type="datetime-local"
                                name="time"
                                value={form.time}
                                onChange={onChange}
                                required
                            />
                            <div className="actions">
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
