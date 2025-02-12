import Link from "next/link";
import { useRouter } from "next/router";

const AccountSidebar = () => {
  const router = useRouter();

  const menuItems = [
    { name: "어르신 계정 등록하기", path: "/helper/account/register" },
    { name: "어르신 계정 수정하기", path: "/helper/account/edit" },
    { name: "회원정보 수정하기", path: "/helper/account/modify" },
    { name: "회원 탈퇴하기", path: "/helper/account/delete" },
  ];

  return (
    <div className="fixed left-[185px] top-[173px]  w-[249px] h-[244px] bg-gray-200 p-4">
      {menuItems.map((item) => (
        <Link key={item.path} href={item.path}>
          <button
            className={`w-[249px] text-gray-600 py-2 px-4 my-2 text-left rounded-lg ${router.pathname === item.path ? "font-bold text-gray-800" : ""
              }`}
          >
            {item.name}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default AccountSidebar;