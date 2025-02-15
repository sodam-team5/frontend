import AccountSidebar from "@/components/AccountSidebar";
import LogoutButton from "@/components/LogoutButton";
import SettingButton from "@/components/SettingButton";

export default function DeletePage() {

  return (
    <div>
      <SettingButton />
      <LogoutButton />
      <div className="flex justify-center">
        <AccountSidebar />
        <h1>회원 탈퇴하기 </h1>

      </div>

    </div>
  )

};