import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Introduction from "@/components/Home/Introduction";
import Skills from "@/components/Home/Skills";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <section className="flex min-h-screen flex-col text-gray-600 body-font items-center justify-center pt-24">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
        <Introduction />
      </div>
      <div className="container">
        <h1 className="font-bold text-4xl p-5">Skills</h1>
        <Skills />
      </div>
    </section>
  );
}
