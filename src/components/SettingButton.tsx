import { useRouter } from "next/router";

const SettingButton = () => {
  const router = useRouter()

  const settingButtonClick = () => {
    router.push("/helper/account/register")
  }

  return (
    <div className="mt-[-30px] ml-[1070px] absolute">

      <button className="border border-black border-[2px] font-bold flex flex-row justify-center items-center rounded-[7px] w-[107px] h-[30px] text-[13px] font-bold"
        onClick={ settingButtonClick }>
        계정 관리
      </button>

    </div>
  );
}

export default SettingButton;