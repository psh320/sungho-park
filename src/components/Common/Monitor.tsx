import { ReactNode } from "react";

// Named constants for better readability (Naming Magic Numbers)
const HEADER_HEIGHT_PX = 112; // Height of the header in pixels
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
  // Named conditions for better readability
  const bezelClasses = `min-h-screen pt-[${HEADER_HEIGHT_PX}px] bg-black p-8`;

  return <div className={bezelClasses}>{children}</div>;
}

/**
 * Monitor screen component - Abstracting Implementation Details
 * Represents the actual screen area inside the monitor bezel
 */
function MonitorScreen({ children }: { children: ReactNode }) {
  // Named calculation for screen height (Relating Magic Numbers to Logic)
  const screenHeight = `calc(100vh - ${HEADER_HEIGHT_PX}px - ${MONITOR_BORDER_SIZE})`;
  const screenClasses = "w-full bg-primary overflow-hidden";

  return (
    <div className={screenClasses} style={{ height: screenHeight }}>
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
