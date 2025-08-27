import { ReactNode } from "react";
import Dock from "./Dock";
import DesktopHeader from "./DesktopHeader";

// Named constants for better readability (Naming Magic Numbers)
const DESKTOP_Z_INDEX = 1; // Desktop sits above monitor background
const DOCK_Z_INDEX = 10; // Dock sits above desktop content

interface DesktopProps {
  /** Windows and other desktop elements */
  children?: ReactNode;
  /** Handler for opening terminal */
  onOpenTerminal?: () => void;
  /** Handler for opening projects window */
  onOpenProjects?: () => void;
  /** Whether terminal is currently visible/active */
  isTerminalActive?: boolean;
  /** Whether projects window is currently visible/active */
  isProjectsActive?: boolean;
}

/**
 * Desktop content area component - Abstracting Implementation Details
 * Contains windows, applications, and other desktop elements
 */
function DesktopContent({ children }: { children?: ReactNode }) {
  return <div className="relative w-full h-full flex flex-col">{children}</div>;
}

/**
 * Desktop dock area component - Separating Code Paths for Conditional Rendering
 * Only renders when dock handlers are provided
 */
function DesktopDock({
  onOpenTerminal,
  onOpenProjects,
  isTerminalActive,
  isProjectsActive,
}: {
  onOpenTerminal?: () => void;
  onOpenProjects?: () => void;
  isTerminalActive?: boolean;
  isProjectsActive?: boolean;
}) {
  // Named condition for better readability
  const shouldShowDock = onOpenTerminal && onOpenProjects;

  if (!shouldShowDock) return null;

  return (
    <Dock
      onOpenTerminal={onOpenTerminal}
      onOpenProjects={onOpenProjects}
      isTerminalActive={isTerminalActive ?? false}
      isProjectsActive={isProjectsActive ?? false}
    />
  );
}

/**
 * Desktop component that represents the desktop environment inside the monitor
 * Cohesion - groups desktop-related functionality together
 * Features: desktop content area, dock integration, proper overflow handling
 */
export default function Desktop({
  children,
  onOpenTerminal,
  onOpenProjects,
  isTerminalActive = false,
  isProjectsActive = false,
}: DesktopProps) {
  // Named constants for styling (Relating Magic Numbers to Logic)
  const desktopContainerClasses =
    "relative w-full h-full overflow-hidden bg-desktop";

  return (
    <div className={desktopContainerClasses}>
      <DesktopContent>
        <DesktopHeader />
        <div className="flex-1 relative">{children}</div>
      </DesktopContent>
      <DesktopDock
        onOpenTerminal={onOpenTerminal}
        onOpenProjects={onOpenProjects}
        isTerminalActive={isTerminalActive}
        isProjectsActive={isProjectsActive}
      />
    </div>
  );
}
