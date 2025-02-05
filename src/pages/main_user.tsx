import { useRouter } from "next/router";
import { useEffect, useState } from "react";

export default function Mainuser() {
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
    router.push("/dailyRecord_user");
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


      {/* 어르신 탭 - 요약*/}


      <button
        className="border-2 border-black rounded-lg px-4 py-2"
        onClick={dailyRecordButtonClick}>
        오늘 하루 전하기
      </button>



      <button
        className="border-2 border-black rounded-lg px-4 py-2"
        onClick={logoutButtonClick}
      >
        로그아웃
      </button>



    </div>
  );
}
