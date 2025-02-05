
const conversations = ["안녕하세요!", "어떻게 지내세요?", "좋은 하루 보내세요!"];


export default function ChatRecommend() {
  return (
    <div className="flex flex-col items-center pt-[30px]">
      <div>
        {conversations.map((chat, index) => (
          <h1 key={index} className="pt-[10px] text-[20px]">
            {index + 1}. {chat}
          </h1>
        ))}
      </div>

    </div>
  );
}