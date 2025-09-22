// src/App.jsx
import { useState } from 'react';
import StudentList from './components/StudentList';
import './App.css';

// 초기 학생 데이터
const initialStudents = [
    { id: 1, studentId: '2025001', name: '홍길동', status: 'present' },
    { id: 2, studentId: '2025002', name: '김철수', status: 'present' },
    { id: 3, studentId: '2025003', name: '이영희', status: 'absent' },
    { id: 4, studentId: '2025004', name: '박지성', status: 'late' },
    { id: 5, studentId: '2025005', name: '손흥민', status: 'present' },
];

function App() {
    const [students, setStudents] = useState(initialStudents);

    // 날짜 정보
    const today = new Date();
    const dateString = today.toLocaleDateString('ko-KR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long',
    });

    // 학생의 출석 상태를 변경하는 함수
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
                <h1> [출석부]</h1>
                <p className="date-display">{dateString}</p>
            </header>
            <main>
                <StudentList students={students} onStatusChange={handleStatusChange} />
            </main>
        </div>
    );
}

export default App;
