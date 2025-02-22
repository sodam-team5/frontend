import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Image from "next/image";
import background from "../../../public/images/user_main_bg.svg";
import doubleArrow from "../../../public/images/double_arrow.svg";

export default function MainUser() {
  const router = useRouter();
  const [role, setRole] = useState("");
  const [userName, setUserName] = useState("홍길동");
  const [currentTime, setCurrentTime] = useState("");
  const timeFormat: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  const updateTime = () => {
    const now = new Date();
    const days = ["(일)", "(월)", "(화)", "(수)", "(목)", "(금)", "(토)"];
    const dayOfWeek = days[now.getDay()];
    const formattedTime = `${now.getFullYear()}년 ${
      now.getMonth() + 1
    }월 ${now.getDate()}일${dayOfWeek} ${now.getHours()}시 ${now.getMinutes()}분`;
    setCurrentTime(formattedTime);
  };

  useEffect(() => {
    const storedRole = sessionStorage.getItem("role");
    const storedName = sessionStorage.getItem("name");
    if (storedRole) {
      setRole(storedRole);
      //setUserName(storedName);
      updateTime();
      const interval = setInterval(updateTime, 60000);
      return () => clearInterval(interval);
    } else {
      router.push("/"); // 역할이 없으면 로그인 페이지로 이동
    }
  }, [router]);

  const dailyRecordButtonClick = () => {
    router.push("/user/dailyRecord");
  };

  const logoutButtonClick = () => {
    sessionStorage.removeItem("role");
    router.push("/");
  };

  const settingsPageButtonClick = () => {
    router.push("/settings");
  };

  return (
    <>
      <div className="flex h-screen">
        <div className="w-1/2 flex flex-col mt-20 ml-[100px] px-20">
          <div>
            <div className="text-gray-500 text-sm mb-4">{currentTime}</div>
            <div>
              <h2 className="text-2xl font-bold text-black">
                안녕하세요 {userName}님!
              </h2>
              <h2 className="text-2xl font-bold text-black">
                오늘 하루는 어떠셨나요?
              </h2>
            </div>
          </div>
          <button
            className="flex flex-row justify-center bg-[#f7e600] w-fit mt-[100px] rounded-lg px-[18px] py-[18px]"
            onClick={dailyRecordButtonClick}
          >
            오늘 하루 전하기
            <Image src={doubleArrow} alt="아이콘" />
          </button>
        </div>
        <div className="w-1/2 h-[80vh] relative">
          <Image src={background} alt="배경" fill className="object-cover" />
        </div>
      </div>
    </>
  );
}
