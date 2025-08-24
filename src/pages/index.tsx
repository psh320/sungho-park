import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import { useState } from "react";
import { Terminal } from "@/components/Home/Terminal";
import Skills from "@/components/Home/Skills";
import { useRouter } from "next/router";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const route = useRouter();
  const [isTerminalVisible, setIsTerminalVisible] = useState(true);

  const handleCloseTerminal = () => {
    setIsTerminalVisible(false);
  };

  const handleOpenTerminal = () => {
    setIsTerminalVisible(true);
  };

  return (
    <div className="relative overflow-hidden">
      {/* Terminal Component */}
      <Terminal isVisible={isTerminalVisible} onClose={handleCloseTerminal} />

      {/* Original UI - only show when terminal is closed */}
      {!isTerminalVisible && (
        <section className="flex min-h-screen flex-col text-gray-600 body-font items-center justify-center pt-24">
          <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center rounded-md">
            <div className="text-center">
              <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 dark:text-white">
                Hi, I&apos;m Sungho Park
              </h1>
              <p className="mb-8 leading-relaxed text-lg">
                Frontend Engineer with 2+ years of experience
              </p>
              <div className="flex justify-center space-x-4">
                <button
                  className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg"
                  onClick={handleOpenTerminal}
                >
                  Open Terminal
                </button>
                <button
                  className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg"
                  onClick={() => route.push("./project")}
                >
                  Go to Projects
                </button>
              </div>
            </div>
          </div>

          <div className="container">
            <h1 className="font-bold text-4xl p-5 text-center">Skills</h1>
            <Skills />
          </div>
        </section>
      )}
    </div>
  );
}
