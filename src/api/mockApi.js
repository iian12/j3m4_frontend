// src/api/mockApi.js
let schedules = [
    { id: 1, title: '수업 A', place: '강의실 101', description: 'C언어 수업', time: new Date().toISOString() },
    { id: 2, title: '수업 B', place: '강의실 102', description: '디지털 기술', time: new Date().toISOString() },
];

let pendingUsers = [
    { id: 1, name: '홍길동', studentId: '20230001' },
    { id: 2, name: '김철수', studentId: '20230002' },
];

export const api = {
    get: async (url) => {
        await new Promise(r => setTimeout(r, 200)); // 모의 딜레이
        if (url === '/schedules') return { data: schedules };
        if (url === '/users/pending') return { data: pendingUsers };
        return { data: [] };
    },
    post: async (url, body) => {
        await new Promise(r => setTimeout(r, 200));
        if (url === '/schedules') {
            const newItem = { ...body, id: Date.now() };
            schedules.push(newItem);
            return { data: newItem };
        }
        if (url.startsWith('/users/approve/')) {
            const id = parseInt(url.split('/').pop());
            pendingUsers = pendingUsers.filter(u => u.id !== id);
            return { data: { success: true } };
        }
        return { data: {} };
    },
    delete: async (url) => {
        await new Promise(r => setTimeout(r, 200));
        if (url.startsWith('/schedules/')) {
            const id = parseInt(url.split('/').pop());
            schedules = schedules.filter(s => s.id !== id);
            return { data: { success: true } };
        }
        return { data: {} };
    }
};
