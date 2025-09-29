import api from "./axios";

// 로그인 / 회원가입
export const login = (data) => api.post("/auth/login", data); // { studentId, password }
export const signup = (data) => api.post("/users/join", data); // { studentId, password, name, email, phoneNumber }

// 출석 체크
export const checkAttendance = (studyId, data) =>
    api.post(`/attendance/check`, { studyId, ...data }); // data: { studentId, status, scheduleId, date }

// 출석 기록 조회
export const getAttendanceHistory = (studyId, scheduleId, date) =>
    api.get(`/attendance/history/${studyId}`, { params: { scheduleId, date } });

// 일정 관련
export const getScheduleList = () => api.get("/schedules");
export const getScheduleById = (id) => api.get(`/schedules/${id}`);
export const createSchedule = (data) =>
    api.post("/schedules/new", { ...data, time: new Date(data.time).toISOString() });
export const deleteSchedule = (id) => api.delete(`/schedules/${id}`);

// 관리자용 유저 승인
export const getPendingUsers = () => api.get("/users/pending");
export const approveUser = (id) => api.post(`/users/approve/${id}`);
