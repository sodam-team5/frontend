import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Main() {
  const router = useRouter();
  const [role, setRole] = useState("");

  useEffect(() => {
    const storedRole = sessionStorage.getItem("role");
    if (storedRole) {
      setRole(storedRole);
    } else {
      router.push("/"); // 역할이 없으면 로그인 페이지로 이동
    }
  }, [router]);

  const dailyRecordButtonClick = () => {
    router.push("/dailyRecord");
  };

  const conversationListButtonClick = () => {
    router.push("/chatRecommend");
  };

  const logoutButtonClick = () => {
    sessionStorage.removeItem("role");
    router.push("/");
  };

  const settingsPageButtonClick = () => {
    router.push("/settings");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {role === "user" ? (
        <button
          className="border-2 border-black rounded-lg px-4 py-2"
          onClick={dailyRecordButtonClick}
        >
          일상 기록 하러 가기
        </button>
      ) : role === "helper" ? (
        <button
          className="border-2 border-black rounded-lg px-4 py-2"
          onClick={conversationListButtonClick}
        >
          대화 추천 목록 보기
        </button>
      ) : null}
      <button
        className="border-2 border-black rounded-lg px-4 py-2"
        onClick={logoutButtonClick}
      >
        로그아웃
      </button>

      <button
        className="border-2 border-black rounded-lg px-4 py-2"
        onClick={settingsPageButtonClick}
      >
        설정
      </button>

    </div>
  );
}
