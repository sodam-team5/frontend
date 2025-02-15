import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";

export default function Login_helper() {
  const router = useRouter();
  const [role, setRole] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [helperEmail, setHelperEmail] = useState("");
  const [password, setPassword] = useState("");

  const loginButtonClick = () => {
    router.push("/helper/main");
  }

  const signUpButtonClick = () => {
    router.push("/helper/signup");
  }

  const userButtonClick = () => {
    router.push("/user/login");
  }

  return (
    <div>
      <div className="flex justify-end">
        <button className="flex flex-row justify-end mr-[205px]"
          onClick={userButtonClick}>
          <h2 className="font-bold"> 어르신 로그인 하기   &gt;&gt; </h2>
        </button>
      </div>

      <div className="flex flex-col items-center gap-4 p-6">

        <h1 className="text-[20px] font-bold">말벗 로그인</h1>

        <div className="flex flex-col">
          <h3 className="flex items-left mt-[40px] mb-[10px] font-bold">이메일</h3>

          <input
            type="text"
            value={helperEmail}
            onChange={(e) => setHelperEmail(e.target.value)}
            className="border border-[#000000] rounded-[5px] w-[200px] h-[22px]"
          />

          <h3 className="flex items-left mt-[20px] font-bold mb-[10px]">비밀번호</h3>



          <input
            type="text"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border border-[#000000] rounded-[5px] w-[200px] h-[22px]"
          />


          <button className=" mt-[30px] bg-gray-200 w-[220px] h-[38px] rounded-[10px] font-bold"
            onClick={loginButtonClick}>
            로그인 하기
          </button>

          <div className="flex items-center mt-[30px]">
            <hr className="flex-grow border-gray-300" />
            <span className="px-4 text-gray-500">또는</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          <div className="">
            <button className="mt-[30px] border py-2 rounded-lg flex items-center justify-center text-[13px] font-bold w-[220px] gap-[10px]"
              onClick={loginButtonClick}>
              <Image src="/images/google_logo.svg" alt="구글 로고" width={24} height={24} />
              구글 로그인
            </button>
          </div>


          <button className="text-[#616161] underline mt-[20px] text-[13px]"
            onClick={signUpButtonClick}>
            회원이 아니신가요?
          </button>

          <button className="text-[#616161] underline mt-[10px] text-[13px]">
            계정 찾기
          </button>


        </div>
      </div>

    </div>
  );
}