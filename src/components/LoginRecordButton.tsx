import { useState, useEffect, useCallback } from "react";
import { useMic } from "@/context/MicContext";
import axios from "axios";

const LoginRecordButton = () => {
  const { onRec, setOnRec } = useMic(); // 전역 상태 사용
  const [isRecording, setIsRecording] = useState(false); // 개별 버튼 상태 추가
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [media, setMedia] = useState<MediaRecorder | null>(null);
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null);
  const [audioUrl, setAudioUrl] = useState(null);
  const [transcribedText, setTranscribedText] = useState<string | null>(null);

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

  const submitAudio = useCallback(async () => {
    if (!audioBlob) {
      console.error(" 오디오 데이터 X");
      return;
    }

    console.log(" 파일 전송 시작...");
    const file = new File([audioBlob], "soundBlob.webm", {
      type: "audio/webm",
      lastModified: new Date().getTime(),
    });

    // 여기서 API 호출을 통해 텍스트 변환 요청
    try {
      const formData = new FormData();
      formData.append("audio", file); // 오디오 파일 추가

      // 실제 API URL을 사용해 주세요. (예시 URL)
      const response = await axios.post(
        "https://sodam-cloudrun-723860755736.asia-northeast3.run.app/stt/answer/{questionId}",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // 응답 처리 (result는 변환된 텍스트로 가정)
      if (response.data.isSuccess) {
        setTranscribedText(response.data.result); // 텍스트를 상태로 설정
      } else {
        console.error("STT 변환 실패:", response.data.message);
      }
    } catch (err) {
      console.error("API 호출 중 오류 발생:", err);
    }
  }, [audioBlob]);

  // 오디오 녹음 후 변환된 텍스트를 자동으로 제출
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