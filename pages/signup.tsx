import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function SignUp() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [phone, setPhone] = useState("");
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");

  // role 값 불러오기
  useEffect(() => {
    const storedRole = sessionStorage.getItem("role");
    if (!storedRole) {
      router.push("/"); // role이 없으면 홈으로 이동
    } else {
      setRole(storedRole);
    }
  }, [router]);

  const handleSignUp = () => {
    router.push("/");
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6">
      <h1 className="text-xl font-bold">회원가입</h1>
      {/* // 말벗 회원가입 */}
      <>
        <input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          className="border p-2 rounded-lg w-64"
        />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border p-2 rounded-lg w-64"
        />
        <input
          type="tel"
          placeholder="전화번호"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="border p-2 rounded-lg w-64"
        />
        <button className="bg-blue-500 text-white px-4 py-2 rounded-lg w-64">
          전화번호 인증
        </button>
      </>


      {/* 회원가입 버튼 */}
      <button
        className="bg-green-500 text-white px-4 py-2 rounded-lg w-64"
        onClick={handleSignUp}
      >
        회원가입 완료
      </button>

    </div>
  );
}