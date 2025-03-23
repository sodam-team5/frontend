import axios from "axios";

const instance = axios.create({
  baseURL: "https://sodam-cloudrun-723860755736.asia-northeast3.run.app",
  timeout: 10000,
  withCredentials: true,
});

export const fetchInitialQuestion = async () => {
  try {
    const res = await instance.get("/questions");
    return res.data?.result || null;  // 데이터가 없으면 null 반환
  } catch (error) {
    console.error("초기 질문 가져오기 실패:", error);
    return null;
  }
};

export const fetchNextQuestion = async () => {
  try {
    const res = await instance.get("/questions/next");
    return res.data?.result || null;  // 데이터가 없으면 null 반환
  } catch (error) {
    console.error("다음 질문 가져오기 실패:", error);
    return null;
  }
};

export default instance;