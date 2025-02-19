import AccountSidebar from "@/components/AccountSidebar";
import LogoutButton from "@/components/LogoutButton";
import SettingButton from "@/components/SettingButton";
import { useState } from "react";

export default function EditInforPage() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("말벗 성함:", name);
    console.log("말벗 생년월일:", birthdate);
    // API 요청
  };



  return (
    <div>
      <SettingButton />
      <LogoutButton />

      <div className="flex justify-center">
        <AccountSidebar />

        <div className="flex flex-row justify-center items-center">

          <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 border">
            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">본인의 성함을 입력해주세요.</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}

                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 font-medium mb-2">본인의 생년월일을 입력해주세요.</label>
              <input
                type="text"
                value={birthdate}
                placeholder="예) 19590723"
                onChange={(e) => setBirthdate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>


            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            >
              저장하기
            </button>
          </form >

        </div>

      </div>

    </div>
  )

};