// src/components/StudentItem.jsx

const StudentItem = ({ student, onStatusChange }) => {
    // 상태에 따라 다른 클래스를 부여하기 위한 함수
    const getStatusClass = (status) => {
        switch (status) {
            case 'absent':
                return 'absent';
            case 'late':
                return 'late';
            default:
                return 'present';
        }
    };

    return (
        <div className={`student-item ${getStatusClass(student.status)}`}>
            <div className="student-info">
                <span className="student-id">{student.studentId}</span>
                <span className="student-name">{student.name}</span>
            </div>
            <div className="status-buttons">
                <button
                    className={student.status === 'present' ? 'active' : ''}
                    onClick={() => onStatusChange(student.id, 'present')}
                >
                    출석
                </button>
                <button
                    className={student.status === 'absent' ? 'active' : ''}
                    onClick={() => onStatusChange(student.id, 'absent')}
                >
                    결석
                </button>
                <button
                    className={student.status === 'late' ? 'active' : ''}
                    onClick={() => onStatusChange(student.id, 'late')}
                >
                    지각
                </button>
            </div>
        </div>
    );
};

export default StudentItem;