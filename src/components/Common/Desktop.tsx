import { ReactNode } from "react";
import Dock from "./Dock";

// Named constants for better readability (Naming Magic Numbers)
const DESKTOP_Z_INDEX = 1; // Desktop sits above monitor background
const DOCK_Z_INDEX = 10; // Dock sits above desktop content

interface DesktopProps {
  /** Windows and other desktop elements */
  children?: ReactNode;
  /** Handler for opening terminal */
  onOpenTerminal?: () => void;
  /** Handler for navigating to projects */
  onGoToProjects?: () => void;
  /** Whether terminal is currently visible/active */
  isTerminalActive?: boolean;
}

/**
 * Desktop content area component - Abstracting Implementation Details
 * Contains windows, applications, and other desktop elements
 */
function DesktopContent({ children }: { children?: ReactNode }) {
  return <div className="relative w-full h-full">{children}</div>;
}

/**
 * Desktop dock area component - Separating Code Paths for Conditional Rendering
 * Only renders when dock handlers are provided
 */
function DesktopDock({
  onOpenTerminal,
  onGoToProjects,
  isTerminalActive,
}: {
  onOpenTerminal?: () => void;
  onGoToProjects?: () => void;
  isTerminalActive?: boolean;
}) {
  // Named condition for better readability
  const shouldShowDock = onOpenTerminal && onGoToProjects;

  if (!shouldShowDock) return null;

  return (
    <Dock
      onOpenTerminal={onOpenTerminal}
      onGoToProjects={onGoToProjects}
      isTerminalActive={isTerminalActive ?? false}
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
  onGoToProjects,
  isTerminalActive = false,
}: DesktopProps) {
  // Named constants for styling (Relating Magic Numbers to Logic)
  const desktopContainerClasses = "relative w-full h-full overflow-hidden";

  return (
    <div className={desktopContainerClasses}>
      <DesktopContent>{children}</DesktopContent>
      <DesktopDock
        onOpenTerminal={onOpenTerminal}
        onGoToProjects={onGoToProjects}
        isTerminalActive={isTerminalActive}
      />
    </div>
  );
}
