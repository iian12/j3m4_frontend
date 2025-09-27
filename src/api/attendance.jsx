import api from "./axios";

// 출석 체크 (수정된 함수)
export const checkAttendance = (studyId, data) => // ✅ data 인자 추가
    api.post(`/attendance/check`, { studyId, ...data }); // ✅ 요청 body에 studyId와 data 결합

// 출석 기록 조회
export const getAttendanceHistory = (studyId, date) => // 날짜 조회도 가능하도록 date 인자 추가
    api.get(`/attendance/history/${studyId}`, { params: { date } });