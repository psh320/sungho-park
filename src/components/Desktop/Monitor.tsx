import { ReactNode, useRef, useEffect } from "react";
import { useDesktopCursor } from "@/hooks/useDesktopCursor";

// Named constants for better readability (Naming Magic Numbers)
const MONITOR_BORDER_SIZE = "2rem"; // 8px * 4 = 32px total padding (p-8)
const MONITOR_Z_INDEX = 0; // Base z-index for monitor

interface MonitorProps {
  /** Content to display inside the monitor */
  children: ReactNode;
}

/**
 * Monitor bezel component - Abstracting Implementation Details
 * Represents the black border around the monitor screen
 */
function MonitorBezel({ children }: { children: ReactNode }) {
  // Named conditions for better readability - no more header padding needed
  const bezelClasses = `min-h-screen bg-black p-8`;

  return <div className={bezelClasses}>{children}</div>;
}

/**
 * Monitor screen component - Abstracting Implementation Details
 * Represents the actual screen area inside the monitor bezel with custom cursor
 */
function MonitorScreen({ children }: { children: ReactNode }) {
  const screenRef = useRef<HTMLDivElement>(null);
  const { applyCursor, removeCursor } = useDesktopCursor();

  // Apply desktop cursor when component mounts (Simplified Cursor Management)
  useEffect(() => {
    const screenElement = screenRef.current;
    if (screenElement) {
      applyCursor(screenElement);
    }

    // Cleanup cursor on unmount
    return () => {
      if (screenElement) {
        removeCursor(screenElement);
      }
    };
  }, [applyCursor, removeCursor]);

  // Named calculation for screen height (Relating Magic Numbers to Logic)
  const screenClasses =
    "w-full bg-primary overflow-hidden h-[calc(100vh-2rem)]";

  return (
    <div ref={screenRef} className={screenClasses}>
      {children}
    </div>
  );
}

/**
 * Monitor component that takes up all available space between header and footer
 * Features: 8px black border (like a monitor bezel), proper overflow handling
 * Cohesion - groups monitor-related functionality together
 */
export default function Monitor({ children }: MonitorProps) {
  return (
    <MonitorBezel>
      <MonitorScreen>{children}</MonitorScreen>
    </MonitorBezel>
  );
}
