import AccountSidebar from "@/components/AccountSidebar";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function RegisterPage() {
  const [name, setName] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("어르신 성함:", name);
    console.log("어르신 생년월일:", birthdate);
    // API 요청
  };


  const topics = [
    "1", "2", "3", "4",
    "5", "6", "7", "8",
    "9", "10", "11", "12"
  ];

  const toggleTopicSelection = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic) // 이미 선택된 경우 제거
        : [...prev, topic] // 선택되지 않은 경우 추가
    );
  };
  return (

    <div className="flex justify-center">
      <AccountSidebar />

      <div className="flex flex-row justify-center items-center">

      
      <form onSubmit={handleSubmit} className="w-full max-w-sm bg-white p-6 rounded-lg shadow-lg">
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">어르신의 성함을 입력해주세요.</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}

            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">어르신의 생년월일을 입력해주세요.</label>
          <input
            type="text"
            value={birthdate}
            placeholder="예) 19590723"
            onChange={(e) => setBirthdate(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">어르신이 관심 있는 대화 주제를 선택해주세요.</label>
          <div className="grid grid-cols-3 gap-6">
            {topics.map((topic) => (
              <button
                key={topic}
                type="button"
                onClick={() => toggleTopicSelection(topic)}
                className={`px-4 py-2 border rounded-lg transition-colors ${selectedTopics.includes(topic)
                  ? "bg-blue-500 text-white" // 선택된 경우
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200" // 기본 상태
                  }`}
              >
                {topic}
              </button>
            ))}
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
        >
          등록하기
        </button>
      </form >

      </div>
    </div >
  )


};