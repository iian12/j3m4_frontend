// src/pages/AttendancePage.jsx
import React, { useState, useEffect, useCallback } from 'react';
import { getAttendanceHistory, checkAttendance, getScheduleList, createSchedule } from '../api/index.js';
import './AttendancePage.css';

const AttendancePage = ({ studyId }) => {
    const [schedules, setSchedules] = useState([]);
    const [selectedScheduleId, setSelectedScheduleId] = useState(null);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [students, setStudents] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [newSchedule, setNewSchedule] = useState({
        title: '',
        place: '',
        description: '',
        time: '',
    });

    // 일정 목록
    const fetchSchedules = useCallback(async () => {
        try {
            const res = await getScheduleList();
            const list = res?.data ?? [];
            setSchedules(list);
            if (list.length > 0) setSelectedScheduleId(String(list[0].id));
        } catch (e) {
            console.error(e);
            setError('일정 데이터를 불러오는 데 실패했습니다.');
        }
    }, []);

    useEffect(() => { fetchSchedules(); }, [fetchSchedules]);

    // 출석 데이터
    const fetchAttendance = useCallback(async () => {
        if (!selectedScheduleId) return;
        setIsLoading(true);
        setError(null);
        try {
            const dateString = selectedDate.toISOString().split('T')[0];
            // getAttendanceHistory(studyId, scheduleId, date)
            const res = await getAttendanceHistory(studyId, selectedScheduleId, dateString);
            setStudents(res?.data ?? []);
        } catch (e) {
            console.error(e);
            setError('출석 데이터를 불러오는 데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [studyId, selectedScheduleId, selectedDate]);

    useEffect(() => { fetchAttendance(); }, [fetchAttendance]);

    // 상태 변경
    const handleStatusChange = async (studentId, status) => {
        try {
            await checkAttendance(studyId, {
                studentId,
                status,
                scheduleId: selectedScheduleId,
                date: selectedDate.toISOString().split('T')[0],
            });
            setStudents(prev => prev.map(s => s.id === studentId ? { ...s, status } : s));
        } catch (e) {
            console.error(e);
            alert('출석 상태 변경 실패');
        }
    };

    // 새 일정
    const handleNewScheduleChange = (e) => {
        const { name, value } = e.target;
        setNewSchedule(prev => ({ ...prev, [name]: value }));
    };

    const handleCreateSchedule = async (e) => {
        e.preventDefault();
        try {
            const res = await createSchedule(newSchedule); // createSchedule에서 time을 ISO로 변환
            alert('일정 생성 완료!');
            setShowCreateModal(false);
            setNewSchedule({ title: '', place: '', description: '', time: '' });
            await fetchSchedules();
            if (res?.data?.id) setSelectedScheduleId(String(res.data.id));
        } catch (e) {
            console.error(e);
            alert('일정 생성 실패');
        }
    };

    // ---------- 여기부터 당신이 올린 JSX ----------
    return (
        <div className="attendance-container">
            <h2>출석 관리</h2>

            {/* 날짜 선택 */}
            <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={(e) => setSelectedDate(new Date(e.target.value))}
                className="date-picker"
            />

            {/* 일정 선택 */}
            <select
                value={selectedScheduleId || ''}
                onChange={(e) => setSelectedScheduleId(e.target.value)}
                className="date-picker"
            >
                {schedules.map((s) => (
                    <option key={s.id} value={s.id}>
                        {s.title} ({s.time ? new Date(s.time).toLocaleString() : '시간 미정'})
                    </option>
                ))}
            </select>

            {/* 새 일정 생성 */}
            <button onClick={() => setShowCreateModal(true)}>새 일정 생성</button>
            {showCreateModal && (
                <div className="modal">
                    <div className="modal-content">
                        <h3>새 일정 생성</h3>
                        <form onSubmit={handleCreateSchedule}>
                            <input
                                name="title"
                                placeholder="제목"
                                value={newSchedule.title}
                                onChange={handleNewScheduleChange}
                                required
                            />
                            <input
                                name="place"
                                placeholder="장소"
                                value={newSchedule.place}
                                onChange={handleNewScheduleChange}
                                required
                            />
                            <input
                                name="description"
                                placeholder="설명"
                                value={newSchedule.description}
                                onChange={handleNewScheduleChange}
                            />
                            <input
                                type="datetime-local"
                                name="time"
                                value={newSchedule.time}
                                onChange={handleNewScheduleChange}
                                required
                            />
                            <div style={{ marginTop: '0.5rem' }}>
                                <button type="submit">생성</button>
                                <button type="button" onClick={() => setShowCreateModal(false)}>
                                    취소
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* 로딩/에러 */}
            {isLoading && <p>데이터 불러오는 중...</p>}
            {error && <p className="error-message">{error}</p>}

            {/* 학생 리스트 */}
            {!isLoading && !error && students.length > 0 ? (
                <div className="student-list">
                    {students.map((student) => (
                        <div key={student.id} className={`student-item ${student.status || ''}`}>
                            <div className="student-info">
                                {student.name} ({student.studentId})
                            </div>
                            <div className="status-buttons">
                                <button
                                    className={student.status === 'present' ? 'active' : ''}
                                    onClick={() => handleStatusChange(student.id, 'present')}
                                >
                                    출석
                                </button>
                                <button
                                    className={student.status === 'late' ? 'active' : ''}
                                    onClick={() => handleStatusChange(student.id, 'late')}
                                >
                                    지각
                                </button>
                                <button
                                    className={student.status === 'absent' ? 'active' : ''}
                                    onClick={() => handleStatusChange(student.id, 'absent')}
                                >
                                    결석
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                !isLoading && !error && <p>선택한 일정에 대한 출석 데이터가 없습니다.</p>
            )}
        </div>
    );
};

export default AttendancePage;
