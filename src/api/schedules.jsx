import api from "./axios";


export const createSchedule = (data) => {
// data: { title, place, description, time }
// 서버가 ISO 기대 시, 변환 보정
    const payload = {
        ...data,
        time: data.time ? new Date(data.time).toISOString() : undefined,
    };
    return api.post("/schedules/new", payload);
};


export const getScheduleList = () => api.get("/schedules/list");
export const getScheduleById = (id) => api.get(`/schedules/${id}`);
export const deleteSchedule = (id) => api.delete(`/schedules/${id}`);