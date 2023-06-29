import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "@/components/Layout/Layout";
import awsmobile from "@/aws-exports";
import { Amplify } from "aws-amplify";
Amplify.configure(awsmobile);

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
