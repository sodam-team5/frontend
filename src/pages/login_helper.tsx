import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Login() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [helperId, setHelperId] = useState("");
  const [password, setPassword] = useState("");

  const loginButtonClick = () => {
    router.push("/main_helper");
  }

  const signUpButtonClick = () => {
    router.push("/signup");
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-xl font-bold">로그인</h1>

      <h3>이메일</h3>
      {/* 이메일 입력 */}
      <input
        type="text"
        placeholder="이메일"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded-lg w-64"
      />

      {/* 비밀번호 입력 */}
      <input
        type="text"
        placeholder="비밀번호"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded-lg w-64"
      />

      {/* 로그인 버튼 */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={loginButtonClick}>
        로그인
      </button>

      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={loginButtonClick}>
        구글 로그인
      </button>

      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={signUpButtonClick}>
        회원이 아니신가요?
      </button>

      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        계정 찾기
      </button>

    </div>
  );
}