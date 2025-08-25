import { ReactNode } from "react";

// Named constants for better readability (Naming Magic Numbers)
const DOCK_ITEM_SIZE = 48; // 12 * 4 = 48px (w-12 h-12)
const DOCK_HOVER_SCALE = 1.1; // 110% scale on hover
const DOCK_ANIMATION_DURATION = 200; // 200ms transition
const DOCK_BORDER_RADIUS = 12; // rounded-xl

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
 * Abstracting Implementation Details - encapsulates hover effects and tooltip logic
 */
function DockItem({
  children,
  onClick,
  label,
  isActive = false,
}: DockItemProps) {
  // Named conditions for better readability
  const isActiveItem = isActive;
  const baseClasses =
    "relative flex items-center justify-center w-12 h-12 rounded-xl";
  const backgroundClasses =
    "bg-white/10 backdrop-blur-sm border border-white/20";
  const hoverClasses = "hover:bg-white/20 hover:scale-110 hover:-translate-y-1";
  const transitionClasses = "transition-all duration-200 ease-out";
  const activeClasses = isActiveItem ? "bg-white/25 shadow-lg" : "";

  return (
    <div className="group relative">
      <button
        onClick={onClick}
        className={`${baseClasses} ${backgroundClasses} ${hoverClasses} ${transitionClasses} ${activeClasses}`}
        title={label}
        aria-label={label}
        aria-pressed={isActiveItem}
      >
        {children}
        <ActiveIndicator isVisible={isActiveItem} />
      </button>
      <DockTooltip label={label} />
    </div>
  );
}

/**
 * Active indicator component - Separating Code Paths for Conditional Rendering
 */
function ActiveIndicator({ isVisible }: { isVisible: boolean }) {
  if (!isVisible) return null;

  return (
    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-white rounded-full" />
  );
}

/**
 * Dock tooltip component - Abstracting Implementation Details
 */
function DockTooltip({ label }: { label: string }) {
  return (
    <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
      <div className="bg-gray-800 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
        {label}
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
 * Terminal icon component - Organizing Code by Feature/Domain
 */
function TerminalIcon() {
  return (
    <svg
      className="w-6 h-6 text-green-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
      />
    </svg>
  );
}

/**
 * Projects icon component - Organizing Code by Feature/Domain
 */
function ProjectsIcon() {
  return (
    <svg
      className="w-6 h-6 text-blue-400"
      fill="none"
      stroke="currentColor"
      viewBox="0 0 24 24"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  );
}

/**
 * Dock separator component - Abstracting Implementation Details
 */
function DockSeparator() {
  return <div className="w-px h-8 bg-white/20 mx-1" />;
}

/**
 * Placeholder for future dock items - Abstracting Implementation Details
 */
function DockPlaceholder() {
  return (
    <div className="w-6 h-6 bg-white/5 rounded-lg border border-white/10" />
  );
}

/**
 * macOS-style dock with application icons
 * Positioned at the bottom center of the desktop
 * Cohesion - groups related dock functionality together
 */
export default function Dock({
  onOpenTerminal,
  onGoToProjects,
  isTerminalActive = false,
}: DockProps) {
  // Named constants for styling (Relating Magic Numbers to Logic)
  const dockContainerClasses =
    "absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10";
  const dockBackgroundClasses =
    "flex items-center space-x-2 px-3 py-2 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 shadow-2xl";

  return (
    <div className={dockContainerClasses}>
      <div
        className={dockBackgroundClasses}
        role="toolbar"
        aria-label="Application dock"
      >
        <DockItem
          onClick={onOpenTerminal}
          label="Terminal"
          isActive={isTerminalActive}
        >
          <TerminalIcon />
        </DockItem>

        <DockItem onClick={onGoToProjects} label="Projects">
          <ProjectsIcon />
        </DockItem>

        <DockSeparator />
        <DockPlaceholder />
      </div>
    </div>
  );
}
