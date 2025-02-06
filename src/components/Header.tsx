import Image from "next/image"
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const Header = () => {

  const router = useRouter();

  const homeButtonClick = () => {
    router.push("/");
  }

  return (
    <header className="flex ml-[205px] mt-[85px]">
      <div className="">
        <button className="text-[27px] font-bold"
          onClick={homeButtonClick}> 소담
        </button >
      </div>

    </header>
  );
};

export default Header;