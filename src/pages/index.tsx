import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Terminal from "@/components/Home/Terminal";
import Skills from "@/components/Home/Skills";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const route = useRouter();
  return (
    <section className="flex min-h-screen flex-col text-gray-600 body-font items-center justify-center pt-24">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center rounded-md">
        <Terminal />
      </div>
      <div className="flex justify-center">
        <button
          className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
          onClick={() => route.push("./project")}
        >
          Go to Projects
        </button>
      </div>
      <div className="container">
        <h1 className="font-bold text-4xl p-5">Skills</h1>
        <Skills />
      </div>
    </section>
  );
}
