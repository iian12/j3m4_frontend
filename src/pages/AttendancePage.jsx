// src/pages/AttendancePage.jsx

import React, { useState, useEffect, useCallback } from 'react';
import { getAttendanceHistory, checkAttendance } from '../api/attendance';
import StudentList from '../components/StudentList'; // StudentList 컴포넌트 import
import './AttendancePage.css'; // 페이지 스타일링을 위한 CSS

const AttendancePage = ({ studyId }) => {
    const [students, setStudents] = useState([]);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // 데이터 조회 함수 (useCallback으로 최적화)
    const fetchAttendance = useCallback(async () => {
        setIsLoading(true);
        setError(null);
        try {
            // API 함수에 날짜를 'YYYY-MM-DD' 형식으로 전달
            const dateString = selectedDate.toISOString().split('T')[0];
            const res = await getAttendanceHistory(studyId, dateString);
            setStudents(res.data);
        } catch (err) {
            console.error('출석 기록 불러오기 실패', err);
            setError('데이터를 불러오는 데 실패했습니다.');
        } finally {
            setIsLoading(false);
        }
    }, [studyId, selectedDate]);

    // studyId나 selectedDate가 변경될 때마다 데이터를 다시 불러옵니다.
    useEffect(() => {
        fetchAttendance();
    }, [fetchAttendance]);

    // 날짜 변경 핸들러
    const handleDateChange = (event) => {
        setSelectedDate(new Date(event.target.value));
    };

    // 출석 상태 변경 핸들러
    const handleStatusChange = async (studentId, status) => {
        try {
            // API 요청 시 studyId와 함께 학생 ID, 새로운 상태를 전송
            await checkAttendance(studyId, { studentId, status });
            // 화면 상태를 즉시 업데이트하여 사용자 경험 향상
            setStudents(
                students.map(s =>
                    s.id === studentId ? { ...s, status } : s
                )
            );
        } catch (err) {
            console.error('출석 체크 실패', err);
            alert('출석 상태 변경에 실패했습니다.');
        }
    };

    return (
        <div className="attendance-container">
            <h2>출석 관리</h2>
            <input
                type="date"
                value={selectedDate.toISOString().split('T')[0]}
                onChange={handleDateChange}
                className="date-picker"
            />
            {isLoading && <p>데이터를 불러오는 중입니다...</p>}
            {error && <p className="error-message">{error}</p>}
            {!isLoading && !error && (
                <StudentList
                    students={students}
                    onStatusChange={handleStatusChange}
                />
            )}
        </div>
    );
};

export default AttendancePage;