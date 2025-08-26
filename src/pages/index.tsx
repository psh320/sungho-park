import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import { Terminal } from "@/components/Home/Terminal";
import Skills from "@/components/Home/Skills";
import Monitor from "@/components/Desktop/Monitor";
import { Desktop, ProjectsWindow } from "@/components/Desktop";

// Named constants for better readability (Naming Magic Numbers)
const PAGE_TITLE = "Sungho Park - Frontend Engineer";
const PAGE_DESCRIPTION = "Frontend Engineer with 2+ years of experience";
const HERO_SECTION_PADDING_TOP = "pt-24";
const BUTTON_TRANSITION_DURATION = "duration-200";
// Removed PROJECTS_ROUTE since we now use desktop windows

/**
 * Hero content component - Abstracting Implementation Details
 * Contains the main introduction text and call-to-action
 */
function HeroContent({
  onOpenTerminal,
  onGoToProjects,
}: {
  onOpenTerminal: () => void;
  onGoToProjects: () => void;
}) {
  return (
    <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center rounded-md">
      <div className="text-center">
        <HeroTitle />
        <HeroDescription />
        <ActionButtons
          onOpenTerminal={onOpenTerminal}
          onGoToProjects={onGoToProjects}
        />
      </div>
    </div>
  );
}

/**
 * Hero title component - Organizing Code by Feature/Domain
 */
function HeroTitle() {
  return (
    <h1 className="title-font sm:text-4xl text-3xl mb-4 font-medium text-gray-900 dark:text-white">
      Hi, I&apos;m Sungho Park
    </h1>
  );
}

/**
 * Hero description component - Organizing Code by Feature/Domain
 */
function HeroDescription() {
  return (
    <p className="mb-8 leading-relaxed text-lg text-slate-600 dark:text-slate-400">
      {PAGE_DESCRIPTION}
    </p>
  );
}

/**
 * Main hero section component - Cohesion
 * Groups all hero-related content together
 */
function HeroSection({
  onOpenTerminal,
  onGoToProjects,
}: {
  onOpenTerminal: () => void;
  onGoToProjects: () => void;
}) {
  // Named constants for styling (Relating Magic Numbers to Logic)
  const heroSectionClasses = `flex min-h-screen flex-col text-gray-600 body-font items-center justify-center ${HERO_SECTION_PADDING_TOP}`;

  return (
    <section className={heroSectionClasses}>
      <HeroContent
        onOpenTerminal={onOpenTerminal}
        onGoToProjects={onGoToProjects}
      />
      <SkillsSection />
    </section>
  );
}

/**
 * Terminal action button component - Separating Code Paths for Conditional Rendering
 */
function TerminalButton({ onClick }: { onClick: () => void }) {
  // Named constants for styling (Relating Magic Numbers to Logic)
  const baseButtonClasses =
    "inline-flex text-white border-0 py-2 px-6 focus:outline-none rounded text-lg transition-colors";
  const terminalButtonClasses = "bg-green-500 hover:bg-green-600";

  return (
    <button
      className={`${baseButtonClasses} ${terminalButtonClasses} ${BUTTON_TRANSITION_DURATION}`}
      onClick={onClick}
      aria-label="Open Terminal Application"
    >
      Open Terminal
    </button>
  );
}

/**
 * Projects action button component - Separating Code Paths for Conditional Rendering
 */
function ProjectsButton({ onClick }: { onClick: () => void }) {
  // Named constants for styling (Relating Magic Numbers to Logic)
  const baseButtonClasses =
    "inline-flex text-white border-0 py-2 px-6 focus:outline-none rounded text-lg transition-colors";
  const projectsButtonClasses = "bg-indigo-500 hover:bg-indigo-600";

  return (
    <button
      className={`${baseButtonClasses} ${projectsButtonClasses} ${BUTTON_TRANSITION_DURATION}`}
      onClick={onClick}
      aria-label="View Projects Page"
    >
      View Projects
    </button>
  );
}

/**
 * Action buttons container - Cohesion
 * Groups related action buttons together
 */
function ActionButtons({
  onOpenTerminal,
  onGoToProjects,
}: {
  onOpenTerminal: () => void;
  onGoToProjects: () => void;
}) {
  return (
    <div
      className="flex justify-center space-x-4"
      role="group"
      aria-label="Main actions"
    >
      <TerminalButton onClick={onOpenTerminal} />
      <ProjectsButton onClick={onGoToProjects} />
    </div>
  );
}

/**
 * Skills section title component - Organizing Code by Feature/Domain
 */
function SkillsSectionTitle() {
  return (
    <h2 className="font-bold text-4xl p-5 text-center text-slate-900 dark:text-white">
      Skills
    </h2>
  );
}

/**
 * Skills section component - Cohesion
 * Groups skills-related content together
 */
function SkillsSection() {
  return (
    <div className="container">
      <SkillsSectionTitle />
      <Skills />
    </div>
  );
}

/**
 * Page head component - Abstracting Implementation Details
 * Encapsulates all page metadata and SEO information
 */
function PageHead() {
  return (
    <Head>
      <title>{PAGE_TITLE}</title>
      <meta name="description" content={PAGE_DESCRIPTION} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
    </Head>
  );
}

/**
 * Desktop environment component - Abstracting Implementation Details
 * Encapsulates the monitor/desktop/terminal setup
 */
function DesktopEnvironment({
  onOpenTerminal,
  onOpenProjects,
  isTerminalVisible,
  isTerminalMinimized,
  onCloseTerminal,
  onMinimizeTerminal,
  isProjectsVisible,
  isProjectsMinimized,
  onCloseProjects,
  onMinimizeProjects,
}: {
  onOpenTerminal: () => void;
  onOpenProjects: () => void;
  isTerminalVisible: boolean;
  isTerminalMinimized: boolean;
  onCloseTerminal: () => void;
  onMinimizeTerminal: () => void;
  isProjectsVisible: boolean;
  isProjectsMinimized: boolean;
  onCloseProjects: () => void;
  onMinimizeProjects: () => void;
}) {
  return (
    <Monitor>
      <Desktop
        onOpenTerminal={onOpenTerminal}
        onOpenProjects={onOpenProjects}
        isTerminalActive={isTerminalVisible}
        isProjectsActive={isProjectsVisible}
      >
        <Terminal
          isVisible={isTerminalVisible}
          isMinimized={isTerminalMinimized}
          onClose={onCloseTerminal}
          onMinimize={onMinimizeTerminal}
        />
        <ProjectsWindow
          isVisible={isProjectsVisible}
          isMinimized={isProjectsMinimized}
          onClose={onCloseProjects}
          onMinimize={onMinimizeProjects}
        />
      </Desktop>
    </Monitor>
  );
}

/**
 * Custom hook for terminal state management - Scoping State Management
 * Encapsulates terminal visibility logic
 */
function useTerminalState() {
  const [isTerminalVisible, setIsTerminalVisible] = useState(true);
  const [isTerminalMinimized, setIsTerminalMinimized] = useState(false);

  // Colocated simple logic (Reducing Eye Movement)
  const handleCloseTerminal = () => setIsTerminalVisible(false);
  const handleOpenTerminal = () => {
    setIsTerminalVisible(true);
    setIsTerminalMinimized(false);
  };
  const handleMinimizeTerminal = () => setIsTerminalMinimized(true);

  return {
    isTerminalVisible,
    isTerminalMinimized,
    handleCloseTerminal,
    handleOpenTerminal,
    handleMinimizeTerminal,
  };
}

/**
 * Custom hook for projects window state management - Scoping State Management
 */
function useProjectsWindowState() {
  const [isProjectsVisible, setIsProjectsVisible] = useState(false);
  const [isProjectsMinimized, setIsProjectsMinimized] = useState(false);

  const handleOpenProjects = () => {
    setIsProjectsVisible(true);
    setIsProjectsMinimized(false);
  };

  const handleCloseProjects = () => {
    setIsProjectsVisible(false);
    setIsProjectsMinimized(false);
  };

  const handleMinimizeProjects = () => {
    setIsProjectsMinimized(true);
  };

  return {
    isProjectsVisible,
    isProjectsMinimized,
    handleOpenProjects,
    handleCloseProjects,
    handleMinimizeProjects,
  };
}

/**
 * Main homepage component - Cohesion
 * Orchestrates the overall page structure and state management
 */
export default function HomePage() {
  const {
    isTerminalVisible,
    isTerminalMinimized,
    handleCloseTerminal,
    handleOpenTerminal,
    handleMinimizeTerminal,
  } = useTerminalState();

  const {
    isProjectsVisible,
    isProjectsMinimized,
    handleOpenProjects,
    handleCloseProjects,
    handleMinimizeProjects,
  } = useProjectsWindowState();

  // Named condition for better readability
  const shouldShowHeroSection = !isTerminalVisible && !isProjectsVisible;

  return (
    <>
      <PageHead />
      <DesktopEnvironment
        onOpenTerminal={handleOpenTerminal}
        onOpenProjects={handleOpenProjects}
        isTerminalVisible={isTerminalVisible}
        isTerminalMinimized={isTerminalMinimized}
        onCloseTerminal={handleCloseTerminal}
        onMinimizeTerminal={handleMinimizeTerminal}
        isProjectsVisible={isProjectsVisible}
        isProjectsMinimized={isProjectsMinimized}
        onCloseProjects={handleCloseProjects}
        onMinimizeProjects={handleMinimizeProjects}
      />
      {/* Future: Hero section for when terminal is closed */}
      {/* {shouldShowHeroSection && (
        <HeroSection
          onOpenTerminal={handleOpenTerminal}
          onOpenProjects={handleOpenProjects}
        />
      )} */}
    </>
  );
}
