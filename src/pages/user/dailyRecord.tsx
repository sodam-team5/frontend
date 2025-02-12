import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/router";
import { ChangeEvent } from "react";

export default function DailyRecord() {
  const [questionNumber, setQuestionNumber] = useState(1);
  const [answer, setAnswer] = useState("");
  const router = useRouter();

  const question1Options = ["옵션 1", "옵션 2", "옵션 3"];
  const question2Options = ["옵션 A", "옵션 B", "옵션 C"];

  const handleAnswerChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setAnswer(e.target.value);
  };

  const handleNextQuestion = useCallback(() => {
    if (questionNumber < 3) setQuestionNumber(questionNumber + 1);
  }, [questionNumber]);

  const handlePrevQuestion = () => {
    if (questionNumber > 1) setQuestionNumber(questionNumber - 1);
  };

  const handleSubmit = () => {
    // alert(`입력한 답변: ${answer}`);
    router.push("/complete_user");
  };

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === " " && questionNumber < 3) {
        event.preventDefault(); // 스페이스바의 기본 동작(스크롤)을 막음
        handleNextQuestion();
      } else {
        router.push("/complete_user"); // 제출
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [questionNumber, handleNextQuestion]);


  return (
    <div>
      <h1 className="text-[20px]">일상 기록 페이지</h1>

      {questionNumber === 1 && (
        <div>
          <p>질문 1: 1?</p>
          {question1Options.map((option, index) => (
            <button
              key={index}
              className="border-2 border-black rounded-lg px-4 py-2 m-2"
              onClick={handleNextQuestion}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {questionNumber === 2 && (
        <div>
          <p>질문 2: 2?</p>
          {question2Options.map((option, index) => (
            <button
              key={index}
              className="border-2 border-black rounded-lg px-4 py-2 m-2"
              onClick={handleNextQuestion}
            >
              {option}
            </button>
          ))}
        </div>
      )}

      {questionNumber === 3 && (
        <div>
          <p>질문 3: 3?</p>
          <textarea
            value={answer}
            onChange={handleAnswerChange}
            className="resize-none border-2 border-black rounded-lg p-2"
            placeholder="답변을 입력하세요..."
          />
          <div className="mt-4 flex items-center justify-center">
          </div>
        </div>
      )}

      <div className="mt-4 flex items-center justify-center">
        {questionNumber > 1 && (
          <button
            onClick={handlePrevQuestion}
            className="border-2 border-black rounded-lg px-4 py-2 mx-2"
          >
            이전 질문
          </button>
        )}
        {questionNumber === 3 && (
          <button
            onClick={handleSubmit}
            className="border-2 border-black rounded-lg px-4 py-2"
          >
            제출
          </button>
        )}

        {questionNumber < 3 && (
          <button
            onClick={handleNextQuestion}
            className="border-2 border-black rounded-lg px-4 py-2 mx-2"
          >
            다음 질문
          </button>
        )}


        {/* 도움말 버튼 */}
      </div>
    </div>
  );
}