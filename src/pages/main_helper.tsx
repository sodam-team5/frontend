import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Mainhelper() {
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

  const logoutButtonClick = () => {
    sessionStorage.removeItem("role");
    router.push("/");
  };

  const settingsPageButtonClick = () => {
    router.push("/settings_helper");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {/* 어르신 탭 - 요약*/}


      <div
        className="border-2 border-black rounded-lg w-[300px] h-[400px] px-4 py-2">
        요약 및 대화추천 내용
      </div>




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
        계정관리
      </button>
    </div>
  );
}
