// src/pages/AttendancePage.jsx
import { useState } from 'react';
import StudentList from '../components/StudentList';

// 초기 학생 데이터
const initialStudents = [
    { id: 1, studentId: '2025001', name: '홍길동', status: 'present' },
    { id: 2, studentId: '2025002', name: '김철수', status: 'present' },
    { id: 3, studentId: '2025003', name: '이영희', status: 'absent' },
    { id: 4, studentId: '2025004', name: '박지성', status: 'late' },
    { id: 5, studentId: '2025005', name: '손흥민', status: 'present' },
];

// Date 객체를 'YYYY-MM-DD' 형식의 문자열로 변환하는 함수
const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};


const AttendancePage = () => {
    const [students, setStudents] = useState(initialStudents);
    const [selectedDate, setSelectedDate] = useState(new Date());

    // 날짜가 변경될 때 호출될 함수
    const handleDateChange = (e) => {
        setSelectedDate(new Date(e.target.value));
        // 실제 앱에서는 선택된 날짜에 맞는 출석 데이터를 서버에서 불러와야 합니다.
        // 여기서는 간단히 학생 목록을 초기 상태로 리셋합니다.
        setStudents(initialStudents);
    };

    const dateString = selectedDate.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    });

    const handleStatusChange = (id, newStatus) => {
        setStudents(
            students.map((student) =>
                student.id === id ? { ...student, status: newStatus } : student
            )
        );
    };

    return (
        <div className="app-container">
            <header className="app-header">
                <h1>[출석부]</h1>
                <p className="date-display">{dateString}</p>
                <div className="date-picker-container">
                    <label htmlFor="attendance-date">날짜 선택: </label>
                    <input
                        type="date"
                        id="attendance-date"
                        value={formatDate(selectedDate)}
                        onChange={handleDateChange}
                    />
                </div>
            </header>
            <main>
                <StudentList students={students} onStatusChange={handleStatusChange} />
            </main>
        </div>
    );
};

export default AttendancePage;