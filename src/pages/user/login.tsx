import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import MicStatus from "@/components/MicStatus";
import LoginRecordButton from "@/components/LoginRecordButton";

export default function Login_user() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [helpername, setHelperName] = useState("");

  const loginButtonClick = () => {
    router.push("/user/main");
  };

  const helperButtonClick = () => {
    router.push("/helper/login");
  };

  return (
    <div>
      <div className="flex justify-end">
        <button
          className="flex flex-row justify-end mr-[205px]"
          onClick={helperButtonClick}
        >
          <h2 className="font-bold"> 말벗 로그인 하기 &gt;&gt; </h2>
        </button>
      </div>

      <div className="flex flex-col items-center gap-4 p-6">
        <h1 className="text-[20px] font-bold">어르신 로그인</h1>

        <div className="flex flex-col">
          <h3 className="flex items-left pt-[45px] font-bold">
            어르신 성함을 입력해주세요
          </h3>

          <div className="flex flex-row pt-[10px] gap-2 w-[295px] h-[35px]">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border border-[#000000] border-2 p-2 rounded-[5px] w-[200px]"
            />

            <LoginRecordButton />

            {/* 입력 성공 or 실패 상태 확인 */}
          </div>
        </div>

        <div className="border-t pt-[5px] border-[#9B9B9B]"></div>

        <div className="flex flex-col items-left">
          <h3 className="flex items-left pt-[15px] font-bold">
            말벗 성함을 입력해주세요
          </h3>

          <div className="flex flex-row pt-[10px] gap-2 w-[295px] h-[35px]">
            <input
              type="text"
              value={helpername}
              onChange={(e) => setHelperName(e.target.value)}
              className="border border-[#000000] border-2 p-2 rounded-[5px] w-[200px]"
            />
            <button className="font-bold border border-[#000000] rounded-[5px] text-[12px] w-[79px]">
              입력하기
            </button>
            {/* 입력 성공 or 실패 상태 확인 */}
          </div>
        </div>

        <div className="pt-[10px]"></div>

        <button
          className="bg-gray-300 w-[220px] h-[38px] rounded-[10px] font-bold"
          onClick={loginButtonClick}
        >
          로그인 하기
        </button>
      </div>

      {/* 입력하기 버튼 누르고 녹음 확인 되면  */}
      <div className="flex justify-center">
        <div className="w-[1045px] h-[138px] bg-[#FFFBF6] fixed bottom-0 border-t border-[#9B9B9B]">
          <div className="flex justify-center pt-[10px]">
            <div className="absolute top-3 right-4">
              <MicStatus />
            </div>

            <div className="flex flex-col items-center">
              <Image
                src="/images/recording_img.svg"
                alt="녹음 중"
                width={48}
                height={48}
              ></Image>
              <h5 className="mt-2">듣고 있어요...</h5>
            </div>
          </div>
        </div>
      </div>

      {/* 현재 마이크 상태 */}
    </div>
  );
}
