// src/api/index.js
export * from './axios';        // 필요 시 api 인스턴스도 쓰려면
export { default as api } from './axios';

export * from './attendance';   // checkAttendance, getAttendanceHistory
export * from './auth';         // login, signup
export * from './schedules';    // createSchedule, getScheduleList, getScheduleById
