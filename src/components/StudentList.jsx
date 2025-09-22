// src/components/StudentList.jsx
import StudentItem from './StudentItem';

const StudentList = ({ students, onStatusChange }) => {
    return (
        <div className="student-list">
            {students.map((student) => (
                <StudentItem
                    key={student.id}
                    student={student}
                    onStatusChange={onStatusChange}
                />
            ))}
        </div>
    );
};

export default StudentList;