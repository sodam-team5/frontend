import AccountSidebar from "@/components/AccountSidebar";
import LogoutButton from "@/components/LogoutButton";
import SettingButton from "@/components/SettingButton";

export default function EditInforPage() {



  return (
    <div>
      <SettingButton />
      <LogoutButton />

      <div className="flex justify-center">
        <AccountSidebar />
        <h1>회원 정보 수정하기 페이지</h1>

      </div>

    </div>
  )

};