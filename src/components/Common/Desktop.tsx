import { ReactNode } from "react";
import Dock from "./Dock";

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
 * Desktop component that represents the desktop environment inside the monitor
 * This will later contain icons, taskbar, and other desktop elements
 */
export default function Desktop({
  children,
  onOpenTerminal,
  onGoToProjects,
  isTerminalActive = false,
}: DesktopProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Desktop content (windows, icons, etc.) */}
      <div className="relative w-full h-full">{children}</div>

      {/* macOS-style dock */}
      {onOpenTerminal && onGoToProjects && (
        <Dock
          onOpenTerminal={onOpenTerminal}
          onGoToProjects={onGoToProjects}
          isTerminalActive={isTerminalActive}
        />
      )}
    </div>
  );
}
