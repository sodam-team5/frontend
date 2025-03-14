import { useState } from "react";

const LoginRecordButton = () => {
  const [stream, setStream] = useState(null);
  const [media, setMedia] = useState(null);
  const [onRec, setOnRec] = useState(false); // 초기값 false로 설정
  const [source, setSource] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [audioUrl, setAudioUrl] = useState(null); // 녹음된 오디오 URL 저장

  const onRecAudio = () => {
    const audioCtx = new AudioContext();

    // 실시간 오디오 분석을 위한 AnalyserNode 생성
    const analyser = audioCtx.createAnalyser();
    analyser.fftSize = 2048; // 주파수 해상도를 설정
    setAnalyser(analyser);

    function makeSound(stream) {
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);

      source.connect(analyser); // source → analyser 연결
      analyser.connect(audioCtx.destination); // 최종 출력
    }

    navigator.mediaDevices.getUserMedia({ audio: true }).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      mediaRecorder.start();
      setOnRec(true); // 녹음 시작

      let audioChunks = [];
      
      // 오디오 데이터를 저장
      mediaRecorder.ondataavailable = (e) => {
        audioChunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/webm" });
        const audioURL = URL.createObjectURL(audioBlob);
        setAudioUrl(audioURL);
      };
    });

    console.log("녹음 시작");
  };

  const offRecAudio = () => {
    if (!media) return;

    media.stop(); // 녹음 중지
    stream.getAudioTracks().forEach((track) => track.stop()); // 오디오 스트림 정지

    if (analyser) analyser.disconnect();
    if (source) source.disconnect();

    setOnRec(false); // 상태 변경
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