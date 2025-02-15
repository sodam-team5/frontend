import Link from "next/link";
import { useRouter } from "next/router";

const AccountSidebar = () => {
  const router = useRouter();

  const menuItems = [
    { name: "어르신 계정 등록하기", path: "/helper/account/register" },
    { name: "어르신 계정 수정하기", path: "/helper/account/modify" },
    { name: "회원정보 수정하기", path: "/helper/account/editinfor" },
    { name: "회원 탈퇴하기", path: "/helper/account/delete" },
  ];

  return (
    <div className="fixed left-[185px] top-[173px]  w-[249px] h-[244px] bg-[#F5F5F5] p-4 rounded-[15px]">
      <h2 className="font-bold text-[14px]">Menu</h2>
      <hr className="flex-grow border-t-2 border-gray-400 h-[3px] my-[10px] " />

      {menuItems.map((item) => (
        <Link key={item.path} href={item.path}>
          <button
            className={`flex flex-col py-[10px] text-[13px] w-[249px] text-gray-600 px-4 text-left rounded-lg 
            ${router.pathname === item.path ? "font-bold text-gray-800" : ""}
              `}>
            <span>{item.name} </span>
          </button>
        </Link>
      ))}
    </div>
  );
};

export default AccountSidebar;