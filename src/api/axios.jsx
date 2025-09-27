import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api", // 백엔드 서버 주소
    headers: {
        "Content-Type": "application/json"
    }
});

// 요청마다 토큰 자동 추가
api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default api;
