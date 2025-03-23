import type { AppProps } from "next/app";
import "@/styles/globals.css";
import Header from "@/components/Header";
import { MicProvider } from "@/context/MicContext";
import LoginRecordButton from "@/components/LoginRecordButton";
import MicStatus from "@/components/MicStatus";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <MicProvider>
      <Header />
      <Component {...pageProps} />
    </MicProvider>
  );
}
