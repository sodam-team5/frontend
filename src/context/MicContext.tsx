import { createContext, useContext, useState, ReactNode } from "react";
//여러 파일에서 상태 관리하려면 context 써야함

interface MicContextType {
  onRec: boolean;
  setOnRec: (value: boolean) => void; // boolean받고 반환은 X
}

const MicContext = createContext<MicContextType | undefined>(undefined);

export const MicProvider = ({ children }: { children: ReactNode }) => {
  const [onRec, setOnRec] = useState<boolean>(false);

  return (
    <MicContext.Provider value={{ onRec, setOnRec }}>
      {children}
    </MicContext.Provider>
  );
};

export const useMic = () => {
  const context = useContext(MicContext);
  if (!context) {
    throw new Error("useMic must be used within a MicProvider");
  }
  return context;
};