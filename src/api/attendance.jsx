import api from "./axios";


// ✅ 출석 체크 — body: { studyId, studentId, status, scheduleId, date }
export const checkAttendance = (studyId, data) =>
    api.post(`/attendance/check`, { studyId, ...data });


// ✅ 출석 기록 조회 — params: { date, scheduleId }
export const getAttendanceHistory = (studyId, scheduleId, date) =>
    api.get(`/attendance/history/${studyId}`, { params: { date, scheduleId } });