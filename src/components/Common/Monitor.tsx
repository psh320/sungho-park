import { ReactNode } from "react";

interface MonitorProps {
  /** Content to display inside the monitor */
  children: ReactNode;
}

/**
 * Monitor component that takes up all available space between header and footer
 * Features: 8px black border (like a monitor bezel), proper overflow handling
 */
export default function Monitor({ children }: MonitorProps) {
  return (
    <div className="min-h-screen pt-[112px] bg-black p-8">
      {/* Monitor screen area with 8px black border */}
      <div className="w-full h-[calc(100vh-112px-2rem)] bg-primary overflow-hidden">
        {children}
      </div>
    </div>
  );
}
