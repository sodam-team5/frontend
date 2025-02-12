import { SetStateAction, useState } from "react";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  const [role, setRole] = useState("");

  const handleUserRoleSelection = () => {
    setRole("user");
    sessionStorage.setItem("role", "user"); // 선택 즉시 sessionStorage에 저장
    router.push("/user/login");
  };

  const handleHelperRoleSelection = () => {
    setRole("helper");
    sessionStorage.setItem("role", "helper"); // 선택 즉시 sessionStorage에 저장
  };

  const loginPageButtonClick = () => {
    router.push("/helper/login");
  };

  const signUpPageButtonClick = () => {
    router.push("/helper/signup");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4">
      {role === "" ? (
        // 초기 화면: 어르신과 말벗 버튼 표시
        <>
          <button
            className="border-2 border-black rounded-lg px-4 py-2"
            onClick={handleUserRoleSelection}
          >
            어르신
          </button>

          <button
            className="border-2 border-black rounded-lg px-4 py-2"
            onClick={handleHelperRoleSelection}
          >
            말벗
          </button>
        </>
      ) : (
        // 말벗 버튼을 누르면 로그인 및 회원가입 버튼 표시
        <div className="flex flex-col gap-2">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg"
            onClick={loginPageButtonClick}
          >
            말벗으로 로그인
          </button>
          <button
            className="bg-green-500 text-white px-4 py-2 rounded-lg"
            onClick={signUpPageButtonClick}
          >
            말벗으로 회원가입
          </button>
        </div>
      )}
    </div>
  );
}