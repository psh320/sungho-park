import { ReactNode } from "react";

interface DockItemProps {
  /** Icon or content for the dock item */
  children: ReactNode;
  /** Click handler for the dock item */
  onClick: () => void;
  /** Tooltip text for the dock item */
  label: string;
  /** Whether the item is currently active/running */
  isActive?: boolean;
}

/**
 * Individual dock item with macOS-style hover and active states
 */
function DockItem({
  children,
  onClick,
  label,
  isActive = false,
}: DockItemProps) {
  return (
    <div className="group relative">
      <button
        onClick={onClick}
        className={`
          relative flex items-center justify-center w-12 h-12 rounded-xl
          bg-white/10 backdrop-blur-sm border border-white/20
          hover:bg-white/20 hover:scale-110 hover:-translate-y-1
          transition-all duration-200 ease-out
          ${isActive ? "bg-white/25 shadow-lg" : ""}
        `}
        title={label}
      >
        {children}

        {/* Active indicator dot */}
        {isActive && (
          <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
        )}
      </button>

      {/* Tooltip */}
      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
        <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
          {label}
        </div>
      </div>
    </div>
  );
}

interface DockProps {
  /** Handler for opening terminal */
  onOpenTerminal: () => void;
  /** Handler for navigating to projects */
  onGoToProjects: () => void;
  /** Whether terminal is currently visible/active */
  isTerminalActive?: boolean;
}

/**
 * macOS-style dock with application icons
 * Positioned at the bottom center of the desktop
 */
export default function Dock({
  onOpenTerminal,
  onGoToProjects,
  isTerminalActive = false,
}: DockProps) {
  return (
    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10">
      <div className="flex items-center space-x-2 px-3 py-2 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl">
        {/* Terminal Icon */}
        <DockItem
          onClick={onOpenTerminal}
          label="Terminal"
          isActive={isTerminalActive}
        >
          <svg
            className="w-6 h-6 text-green-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </DockItem>

        {/* Projects Icon */}
        <DockItem onClick={onGoToProjects} label="Projects">
          <svg
            className="w-6 h-6 text-blue-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
        </DockItem>

        {/* Separator for future icons */}
        <div className="w-px h-8 bg-white/20 mx-1" />

        {/* Placeholder for more apps */}
        <div className="w-6 h-6 bg-white/5 rounded-lg border border-white/10" />
      </div>
    </div>
  );
}
