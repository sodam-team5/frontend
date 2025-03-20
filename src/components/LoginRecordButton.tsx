import { useState } from "react";
import { useMic } from "@/context/MicContext";

const LoginRecordButton = () => {
  const { onRec, setOnRec } = useMic(); // setOnRec 추가
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [media, setMedia] = useState<MediaRecorder | null>(null);
  const [source, setSource] = useState<MediaStreamAudioSourceNode | null>(null);
  const [analyser, setAnalyser] = useState<AnalyserNode | null>(null);
  const [audioUrl, setAudioUrl] = useState<string | null>(null);

  const onRecAudio = async () => {
    try {
      const audioCtx = new AudioContext();
      const analyserNode = audioCtx.createAnalyser();
      analyserNode.fftSize = 2048;
      setAnalyser(analyserNode);

      const userStream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(userStream);
      setStream(userStream);
      setMedia(mediaRecorder);

      const sourceNode = audioCtx.createMediaStreamSource(userStream);
      setSource(sourceNode);

      sourceNode.connect(analyserNode);
      analyserNode.connect(audioCtx.destination);

      mediaRecorder.start();
      setOnRec(true); // 녹음 상태 변경

      let audioChunks: BlobPart[] = [];
      mediaRecorder.ondataavailable = (e) => {
        audioChunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioUrl(audioURL);
      };

      console.log("녹음 시작!");
    } catch (error) {
      console.error("오디오 녹음 중 오류 발생:", error);
    }
  };

  const offRecAudio = () => {
    if (!media || !stream) return;

    media.stop();
    stream.getTracks().forEach((track) => track.stop());

    if (analyser) analyser.disconnect();
    if (source) source.disconnect();

    setOnRec(false); // 녹음 상태 변경
    console.log("녹음 중지");
  };

  return (
    <div>
      <button
        className="font-bold border border-[#000000] rounded-[5px] text-[12px] w-[79px] h-[24px]"
        onClick={onRec ? offRecAudio : onRecAudio}
      >
        {onRec ? "녹음 중지" : "녹음 시작"}
      </button>

      {audioUrl && (
        <div>
          <p>녹음된 오디오:</p>
          <audio controls>
            <source src={audioUrl} type="audio/webm" />
            브라우저가 오디오 태그를 지원하지 않습니다.
          </audio>
        </div>
      )}
    </div>
  );
};

export default LoginRecordButton;