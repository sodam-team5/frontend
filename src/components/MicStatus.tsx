import Image from "next/image"
import { useMic } from "@/context/MicContext"

const MicStatus = () => {
  const { onRec } = useMic();

  console.log("MicStatus 렌더링됨. 현재 onRec 상태:", onRec);

  return (
    <div>
      <div className="flex flex-row items-center">
        {!onRec ? (
          <>
            {/* 꺼짐 */}
            <div className="w-[25px] h-[25px] bg-[#FFC6C2] rounded-full flex items-center justify-center">
              <Image src="/images/mic_alert.svg" alt="마이크 알림" width={18} height={19} />
            </div>
            <h6 className="pl-[5px] text-[12px]">현재 마이크가 꺼져 있습니다</h6>

          </>
        ) : (
          <>
            {/* 켜짐 */}
            <div className="w-[25px] h-[25px] bg-[#B4FAA4] rounded-full flex items-center justify-center">
              <Image src="/images/mic.svg" alt="마이크 알림" width={18} height={19} />
            </div>
            <h6 className="pl-[5px] text-[12px]">현재 마이크가 켜져 있습니다</h6>

          </>
        )}
      </div>
    </div>
  );
}

export default MicStatus;