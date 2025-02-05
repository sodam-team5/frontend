import Image from "next/image"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Header = () => {

  const router = useRouter();

  const homeButtonClick = () => {
    router.push("/");
  }

  return (
    <header className="h-[50px] bg-green-900 flex items-center justify-center">
      <div className="">
        <button className="text-[15px] text-white "
          onClick={homeButtonClick}> 서비스 이름</button >
      </div>

    </header>
  );
};

export default Header;