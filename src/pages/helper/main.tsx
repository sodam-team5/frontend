import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import axios from "axios";

export default function MainHelper() {
  const router = useRouter();
  const [role, setRole] = useState("");

  const [elders, setElders] = useState([]); // 어르신 목록
  const [selectedTab, setSelectedTab] = useState(""); // 선택된 어르신 ID
  const [dates, setDates] = useState([]); // 기록일 목록
  const [selectedDate, setSelectedDate] = useState(""); // 선택된 날짜
  const [details, setDetails] = useState([]); // 상세 기록 리스트

  const instance = axios.create({
    baseURL: "https://sodam-cloudrun-723860755736.asia-northeast3.run.app",
    timeout: 10000,
    withCredentials: true, //세션 토큰
  });

  useEffect(() => {
    const storedRole = sessionStorage.getItem("role");
    //sessionStorage.setItem("token", accessToken);
    if (storedRole) {
      setRole(storedRole);
      fetchElders();
    } else {
      router.push("/");
    }
  }, [router]);

  const fetchElders = async () => {
    try {
      const res = await instance.get("/elders");
      if (res.data.isSuccess) {
        const elderList = res.data.result.elderList;
        setElders(elderList);
        if (elderList.length > 0) {
          setSelectedTab(elderList[0].elderID); // 첫 번째 어르신 자동 선택
        }
      }
    } catch (error) {
      console.error("어르신 목록 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    if (selectedTab) {
      fetchDates(selectedTab);
    }
  }, [selectedTab]);

  const fetchDates = async (elderId) => {
    try {
      const res = await instance.get(`/elders/${elderId}/records`);
      if (res.data.isSuccess) {
        const dateList = res.data.result.answerDateDtoList;
        setDates(dateList);
        if (dateList.length > 0) {
          setSelectedDate(dateList[0].recordDate); // 첫 날짜 자동 선택
        }
      }
    } catch (error) {
      console.error("기록일 목록 불러오기 실패:", error);
    }
  };

  useEffect(() => {
    if (selectedTab && selectedDate) {
      fetchDetails(selectedTab, selectedDate);
    }
  }, [selectedDate, selectedTab]);

  const fetchDetails = async (elderId, recordDate) => {
    try {
      const res = await instance.get(
        `/elders/${elderId}/records/${recordDate}`
      );
      if (res.data.isSuccess) {
        setDetails(res.data.result.answerDetailDtoList);
      }
    } catch (error) {
      console.error("상세 내용 불러오기 실패:", error);
    }
  };

  const logoutButtonClick = () => {
    sessionStorage.removeItem("role");
    router.push("/");
  };

  const settingsPageButtonClick = () => {
    router.push("/helper/account/register");
  };

  return (
    <>
      {/* 상단 헤더 */}
      <div className="flex justify-end items-start mb-6 mr-20">
        <div className="flex space-x-2">
          <button
            className="border-2 border-black rounded-lg px-4 py-2"
            onClick={logoutButtonClick}
          >
            로그아웃
          </button>
          <button
            className="bg-gray-200 rounded-lg px-4 py-2"
            onClick={settingsPageButtonClick}
          >
            계정관리
          </button>
        </div>
      </div>

      {/* 탭 */}
      <div className="flex bg-gray-100 border border-gray-300 rounded-t-md overflow-hidden ml-20 mr-20 mb-5">
        {elders.map((elder) => (
          <button
            key={elder.elderID}
            className={`w-1/2 py-2 font-semibold ${
              selectedTab === elder.elderID ? "bg-white" : "text-gray-600"
            }`}
            onClick={() => setSelectedTab(elder.elderID)}
          >
            {elder.name}
          </button>
        ))}
      </div>

      {/* 메인 카드 */}
      <div className="flex border border-gray-300 rounded-b-md overflow-hidden h-[600px] ml-20 mr-20">
        {/* 좌측 기록일 목록 */}
        <div className="w-1/3 border-r border-gray-300 p-4 text-sm overflow-y-auto">
          <p className="font-bold mb-4">기록일</p>
          <ul className="text-gray-800">
            {dates.map((dateItem, idx) => (
              <li
                key={idx}
                className={`py-2 border-t border-gray-200 ${
                  selectedDate === dateItem.recordDate ? "font-bold" : ""
                } cursor-pointer`}
                onClick={() => setSelectedDate(dateItem.recordDate)}
              >
                {new Date(dateItem.recordDate).toLocaleDateString("ko-KR", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  weekday: "short",
                })}
              </li>
            ))}
          </ul>
        </div>

        {/* 우측 상세 내용 */}
        <div className="w-2/3 p-6 text-sm text-gray-800 space-y-8 overflow-y-auto">
          {details?.map((topic, idx) => (
            <div key={idx}>
              <div className="bg-yellow-300 font-semibold w-fit px-2 py-1 mb-2">
                {topic.interestName}
              </div>
              <p className="font-semibold mb-1">{topic.questionText}</p>

              {topic.summaryText && (
                <>
                  <p className="mt-4 font-semibold">📌 요약</p>
                  <p className="text-[13px] ml-4">{topic.summaryText}</p>
                </>
              )}

              {topic.recommendationText && (
                <>
                  <p className="mt-4 font-semibold">📌 추천 대화 주제</p>
                  <p className="text-[13px] ml-4">{topic.recommendationText}</p>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
