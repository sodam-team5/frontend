import React, { useState, useEffect, useRef } from "react";
import Image from "next/image";
import axios from "axios";
import { fetchInitialQuestion, fetchNextQuestion } from "@/api/questionApi";
import instance from "@/api/questionApi"
import mic_on from "../../../public/images/mic_on.svg";
import mic_off from "../../../public/images/mic_off.svg";
import * as QuestionAPI from "@/api/questionApi";

// 질문 데이터 타입 정의
interface Question {
  questionId: number;
  question: string;
}

export default function DailyRecord() {
  const [question, setQuestion] = useState<Question>(null); // 현재 질문
  const [step, setStep] = useState(1); // 현재 질문 번호
  const [isComplete, setIsComplete] = useState(false); // 완료 여부
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder>(null); // MediaRecorder 객체
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null); // 녹음된 오디오 데이터
  const chunks = useRef<Blob[]>([]); // 녹음 조각 저장 배열
  const [isRecording, setIsRecording] = useState(false); // 녹음 중 여부
  const canvasRef = useRef<HTMLCanvasElement | null>(null); // 파형 그릴 canvas 참조
  const animationRef = useRef<number>(); // requestAnimationFrame 참조


  // 컴포넌트 마운트 시 질문 불러오기
  useEffect(() => {
    console.log("questionApi 모듈:", QuestionAPI);
    const loadQuestion = async () => {
      try {
        const question = await fetchInitialQuestion();
        console.log("불러온 질문:", question);
        setQuestion(question);
      } catch (error) {
        console.error("질문 가져오기 실패:", error);
      }
    };
    loadQuestion();
  }, []);
  
  const handleNextQuestion = async () => {
    const question = await fetchNextQuestion();
    setQuestion(question);
  };

  // 녹음 시작
  const startRecording = async () => {};

  // 녹음 중지
  const stopRecording = () => {};

  // 답변 제출 + 다음 질문
  const handleNext = async () => {
    const formData = new FormData();
    await instance.post(`/stt/answer/${question.questionId}`, formData, {});

    if (step < 3) {
      setStep((prev) => prev + 1);
      await fetchNextQuestion();
    } else {
      setIsComplete(true);
    }
  };

  // 건너뛰기 처리
  const handleSkip = async () => {
    if (step < 3) {
      setStep((prev) => prev + 1);
      await fetchNextQuestion();
    } else {
      setIsComplete(true);
    }
  };

  // 완료 화면 렌더링
  if (isComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">
            하루 전달이 완료되었습니다! 수고하셨습니다 😊
          </h1> 
        </div>
      </div>
    );
  }

  // 메인 질문 페이지 렌더링
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-start relative pt-12">
      <div className="w-full max-w-3xl">
        {/* 헤더 */}
        <div className="flex justify-between items-center mb-6">
          <div className="border-l-4 border-yellow-400 pl-2 text-sm font-semibold text-gray-700">
            {step}번째 주제
          </div>
          <button
            onClick={handleSkip}
            className="border border-gray-300 rounded-full px-4 py-2 hover:bg-gray-100 text-sm"
          >
            이 주제 건너뛰기 &gt;&gt;
          </button>
        </div>

        {/* 질문 텍스트 */}
        <div className="text-center text-lg font-medium mb-20">
          {question?.question}
        </div>

        {/* 오디오 파형 */}
        <div className="flex flex-col items-center justify-center mb-24">
          <canvas ref={canvasRef} width={300} height={60} className="mb-2" />
          <div className="text-gray-500 text-sm">
            {isRecording ? "듣고 있어요.." : "녹음 대기 중입니다"}
          </div>
        </div>
      </div>

      {/* 하단 고정 바 */}
      <div className="w-full fixed bottom-0 left-0 border-t bg-[#fefaf5] px-4 py-4 flex items-center justify-between">
        <div className="flex items-center text-sm text-gray-700">
          <span className="bg-gray-200 rounded-full w-5 h-5 flex items-center justify-center mr-2">
            ?
          </span>
          도움이 필요하신가요?
        </div>
        {/* 하단 버튼 영역 */}
        {!isRecording && !audioBlob ? (
          <button
            onClick={startRecording}
            className="bg-yellow-400 text-black font-semibold rounded px-6 py-2 hover:bg-yellow-300"
          >
            전달 시작하기
          </button>
        ) : (
          <button
            onClick={() => {
              stopRecording();
              handleNext();
            }}
            className="bg-yellow-400 text-black font-semibold rounded px-6 py-2 hover:bg-yellow-300"
          >
            전달 완료하기
          </button>
        )}

        <div className="flex items-center text-sm text-gray-700">
          <Image src={mic_on} alt="mic" width={47} height={32} />
          현재 마이크가 켜져 있습니다
        </div>
        {/*마이크 꺼진 상태 구현하기*/}
      </div>
    </div>
  );
}
