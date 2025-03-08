import { useState } from "react";

const LoginRecordButton = () => {
  const [stream, setStream] = useState(null);
  const [media, setMedia] = useState(null);
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState(null);
  const [analyser, setAnalyser] = useState(null);
  const [audioUrl, setAudioUrl] = useState();

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
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);
    });
  }

  const offRecAudio = () => {
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();

    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();


  }


  return (
    <div>
      <button className="font-bold border border-[#000000] rounded-[5px] text-[12px] w-[79px] h-[24px]"
        onClick={onRec ? onRecAudio : offRecAudio}>입력하기</button>

      <button>결과 확인</button>
    </div>
  );
};

export default LoginRecordButton;