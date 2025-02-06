import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

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

  const helperButtonClick = () => {
    router.push("/login_helper");
  }

  return (
    <div>
      <div className="flex justify-end">
        <button className="flex flex-row justify-end mr-[205px]"
          onClick={helperButtonClick}>
          <h2 className="font-bold"> 말벗 로그인 하기 &gt;&gt; </h2>
        </button>
      </div>


      <div className="flex flex-col items-center gap-4 p-6">

        <h1 className="text-[20px] font-bold">어르신 로그인</h1>

        <div className="flex flex-col items-left">
          <h3 className="flex items-left pt-[45px]">어르신 성함을 입력해주세요</h3>

          <div className="flex flex-row pt-[10px] gap-2">
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded-lg w-64"
            />
            <button className="border px-4 py-2  rounded-lg">
              입력하기
            </button>

            {/* 입력 성공 or 실패 상태 확인 */}
          </div>
        </div>



        <div className="flex flex-col items-left">
          <h3 className="flex items-left pt-[15px]">말벗 성함을 입력해주세요</h3>

          <div className="flex flex-row pt-[10px] gap-2">
            <input
              type="text"
              placeholder="이름"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 rounded-lg w-64"
            />
            <button className="border px-4 py-2 rounded-lg">
              입력하기
            </button>
            {/* 입력 성공 or 실패 상태 확인 */}
          </div>
        </div>

        <div className="pt-[10px]">

        </div>
        <button className="bg-gray-300 w-[220px] h-[38px] rounded-lg"
          onClick={loginButtonClick}>
          로그인 하기
        </button>
      </div>

      {/* 입력하기 버튼 누르고 녹음 확인 되면  */}
      {/* 줄 추가 */}
      <div className="flex justify-center">
        <div className="w-[1045px] h-[138px] bg-[#FFFBF6] fixed bottom-0">
          <div className="flex justify-center pt-[10px]">
            <div className="flex-col justify-center">
              <Image src="/images/recording_img.svg" alt="녹음 중" width={48} height={48}>
              </Image>
              <h5>듣고 있어요...</h5>
            </div>
          </div>
        </div>
      </div>

      {/* 현재 마이크 상태 */}


    </div>
  );
}