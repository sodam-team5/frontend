import { useState, useEffect, useCallback } from "react";
import { useMic } from "@/context/MicContext";

const LoginRecordButton = () => {
  const { onRec, setOnRec } = useMic(); // ✅ 전역 상태 사용
  const [isRecording, setIsRecording] = useState(false); // 🔥 개별 버튼 상태 추가
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [media, setMedia] = useState<MediaRecorder | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState(null);

  const onRecAudio = async () => {
    try {
      if (onRec) return; // 이미 다른 곳에서 녹음 중이면 실행 X

      const userStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(userStream);
      setStream(userStream);
      setMedia(mediaRecorder);

      let audioChunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => {
        audioChunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(audioChunks, { type: "audio/webm" });
        const fileUrl = URL.createObjectURL(blob);
        
        setAudioBlob(blob);
        setAudioUrl(URL.createObjectURL(blob));

        console.log(" 생성된 오디오 Blob:", blob);
        console.log(" 생성된 파일 URL:", fileUrl);


        setOnRec(false); // 전역 상태 해제
        setIsRecording(false); // 개별 버튼 상태 변경
      };

      mediaRecorder.start();
      setOnRec(true); // 전역 마이크 상태 ON
      setIsRecording(true); // 개별 버튼 상태 ON
      console.log(" 녹음 시작!");
    } catch (error) {
      console.error("오디오 녹음 중 오류 발생:", error);
    }
  };

  const offRecAudio = () => {
    if (!media || !stream) return;

    media.stop();
    stream.getTracks().forEach((track) => track.stop());

    setOnRec(false); // 전역 마이크 상태 해제
    setIsRecording(false); // 개별 버튼 상태 변경
    console.log(" 녹음 중지");
  };

  const submitAudio = useCallback(() => {
    if (!audioBlob) {
      console.error(" 오디오 데이터 X");
      return;
    }

    console.log(" 파일 전송 시작...");
    const file = new File([audioBlob], "soundBlob.webm", {
      type: "audio/webm",
      lastModified: new Date().getTime(),
    });

    console.log("파일 정보:", file);
    console.log("파일 미리보기 URL:", URL.createObjectURL(file));
  }, [audioBlob]);

  useEffect(() => {
    if (audioBlob) {
      submitAudio();
    }
  }, [audioBlob, submitAudio]);

  return (
    <div>
      <button
        className="font-bold border border-[#000000] rounded-[5px] text-[12px] w-[79px] h-[24px]"
        onClick={isRecording ? offRecAudio : onRecAudio} // ✅ 개별 상태 기준으로 버튼 관리
      >
        {isRecording ? "종료하기" : "입력하기"}
      </button>

      {audioUrl && (
        <div className="flex flex-row">
          <audio controls>
            <source src={audioUrl} type="audio/webm" />
            브라우저가 오디오 태그를 지원하지 않습니다.
          </audio>

          <a href={audioUrl} download="recorded_audio.webm">
            오디오 다운로드
          </a>
        </div>
      )}
    </div>
  );
};

export default LoginRecordButton;