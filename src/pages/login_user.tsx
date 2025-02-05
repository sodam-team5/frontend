import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Login_user() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [helperId, setHelperId] = useState("");
  const [password, setPassword] = useState("");

  const loginButtonClick = () => {
    router.push("/main_user");
  }

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-xl font-bold">어르신 로그인</h1>

      <h3>어르신 성함을 입력</h3>
      {/* 어르신 이름 입력 */}
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded-lg w-64"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        입력하기
      </button>

      <h3>말벗 성함을 입력</h3>
      {/* 말벗 이름 입력 */}
      <input
        type="text"
        placeholder="이름"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="border p-2 rounded-lg w-64"
      />
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        입력하기
      </button>


      {/* 로그인 버튼 */}
      <button className="bg-blue-500 text-white px-4 py-2 rounded-lg"
        onClick={loginButtonClick}>
        로그인
      </button>
    </div>
  );
}