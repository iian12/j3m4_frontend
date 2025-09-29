import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api", // 실제 서버 주소
    headers: { "Content-Type": "application/json" },
    withCredentials: true, // 세션 기반 인증 사용 시 필요
});

export default api;
