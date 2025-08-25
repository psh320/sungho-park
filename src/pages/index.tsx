import Head from "next/head";
import { useState } from "react";
import { Terminal } from "@/components/Home/Terminal";
import Skills from "@/components/Home/Skills";
import { useRouter } from "next/router";
import Monitor from "@/components/Common/Monitor";
import Desktop from "@/components/Common/Desktop";

// Separate component for hero section (Abstracting Implementation Details)
function HeroSection({
  onOpenTerminal,
  onGoToProjects,
}: {
  onOpenTerminal: () => void;
  onGoToProjects: () => void;
}) {
  return (
    <section className="flex min-h-screen flex-col text-gray-600 body-font items-center justify-center pt-24">
      <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center rounded-md">
        <div className="text-center">
          <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 dark:text-white">
            Hi, I&apos;m Sungho Park
          </h1>
          <p className="mb-8 leading-relaxed text-lg text-slate-600 dark:text-slate-400">
            Frontend Engineer with 2+ years of experience
          </p>

          <ActionButtons
            onOpenTerminal={onOpenTerminal}
            onGoToProjects={onGoToProjects}
          />
        </div>
      </div>

      <SkillsSection />
    </section>
  );
}

// Separate component for action buttons (Cohesion)
function ActionButtons({
  onOpenTerminal,
  onGoToProjects,
}: {
  onOpenTerminal: () => void;
  onGoToProjects: () => void;
}) {
  return (
    <div className="flex justify-center space-x-4">
      <button
        className="inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg transition-colors duration-200"
        onClick={onOpenTerminal}
      >
        Open Terminal
      </button>
      <button
        className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg transition-colors duration-200"
        onClick={onGoToProjects}
      >
        View Projects
      </button>
    </div>
  );
}

// Separate component for skills section (Cohesion)
function SkillsSection() {
  return (
    <div className="container">
      <h2 className="font-bold text-4xl p-5 text-center text-slate-900 dark:text-white">
        Skills
      </h2>
      <Skills />
    </div>
  );
}

export default function HomePage() {
  const router = useRouter();
  const [isTerminalVisible, setIsTerminalVisible] = useState(true);

  // Colocated simple logic (Reducing Eye Movement)
  const handleCloseTerminal = () => setIsTerminalVisible(false);
  const handleOpenTerminal = () => setIsTerminalVisible(true);
  const handleGoToProjects = () => router.push("/project");

  // Named condition for better readability
  const shouldShowHeroSection = !isTerminalVisible;

  return (
    <>
      <Head>
        <title>Sungho Park - Frontend Engineer</title>
        <meta
          name="description"
          content="Frontend Engineer with 2+ years of experience"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Monitor>
        <Desktop
          onOpenTerminal={handleOpenTerminal}
          onGoToProjects={handleGoToProjects}
          isTerminalActive={isTerminalVisible}
        >
          <Terminal
            isVisible={isTerminalVisible}
            onClose={handleCloseTerminal}
          />
        </Desktop>
      </Monitor>
      {/* {shouldShowHeroSection && (
        <HeroSection
          onOpenTerminal={handleOpenTerminal}
          onGoToProjects={handleGoToProjects}
        />
      )} */}
    </>
  );
}
