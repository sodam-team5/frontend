import AccountSidebar from "@/components/AccountSidebar";
import LogoutButton from "@/components/LogoutButton";
import SettingButton from "@/components/SettingButton";

export default function DeletePage() {
  const handleDeleteAccount = () => {
    const isConfirmed = window.confirm("정말 탈퇴하시겠습니까?");
    if (isConfirmed) {
      console.log("탈퇴 진행");
    } else {
      console.log("탈퇴 취소");
    }
  };

  return (
    <div>
      <SettingButton />
      <LogoutButton />
      <div className="flex justify-center">
        <AccountSidebar />
        <div className="flex flex-row justify-center items-center">

          <form className="w-full max-w-sm bg-white p-6 border">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">계정 비밀번호를 입력해주세요</label>
              <input
                type="text"
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
              onClick={handleDeleteAccount}
            >
              탈퇴하기
            </button>
          </form >

        </div>

      </div>
    </div>
  )

};