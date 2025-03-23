import Image from "next/image";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
  const currentPath = router.pathname;
  const homeButtonClick = () => {
    router.push("/");
  };

  return (
    <header className="flex ml-[205px] mt-[85px]">
      <div className="flex">
        <button onClick={homeButtonClick}>
          <Image src="/images/logo.svg" alt="logo" width={47} height={32} />
        </button>
      </div>
    </header>
  );
};

export default Header;
