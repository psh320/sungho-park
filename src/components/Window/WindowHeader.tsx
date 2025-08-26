import { WindowControls } from "./WindowControls";

interface WindowHeaderProps {
  /** Window title to display */
  title: string;
  /** Whether the window is in fullscreen mode */
  isFullscreen: boolean;
  /** Callback when close button is clicked */
  onClose: () => void;
  /** Callback when minimize button is clicked */
  onMinimize: () => void;
  /** Callback when fullscreen toggle button is clicked */
  onToggleFullscreen: () => void;
  /** Callback for drag start (when draggable) */
  onDragStart?: (e: React.MouseEvent) => void;
  /** Additional CSS classes for the header */
  className?: string;
}

// Named constants for styling (Relating Magic Numbers to Logic)
const HEADER_SPACING_X = "px-4";
const HEADER_SPACING_Y = "py-2";
const TITLE_LEFT_MARGIN = "ml-4";
const CONTROLS_SPACING = "space-x-2";

/**
 * Generic window header component with macOS-style window controls
 * Features: close, minimize, fullscreen buttons, draggable area, customizable title
 * Abstracting Implementation Details - Uses WindowControls for button logic
 */
export function WindowHeader({
  title,
  isFullscreen,
  onClose,
  onMinimize,
  onToggleFullscreen,
  onDragStart,
  className = "",
}: WindowHeaderProps) {
  // Colocated header styling configuration (Reducing Eye Movement)
  const headerClasses = [
    "flex items-center justify-between",
    "bg-gray-200 dark:bg-gray-800",
    HEADER_SPACING_X,
    HEADER_SPACING_Y,
    "border-b border-gray-300 dark:border-gray-600",
    "rounded-t-lg",
  ].join(" ");

  // Named condition for better readability
  const isDraggableAndNotFullscreen = !isFullscreen && onDragStart;
  const cursorStyle = isDraggableAndNotFullscreen ? "cursor-move" : "";

  return (
    <WindowHeaderContainer
      className={`${headerClasses} ${cursorStyle} ${className}`}
      onMouseDown={!isFullscreen ? onDragStart : undefined}
    >
      <WindowHeaderContent
        title={title}
        isFullscreen={isFullscreen}
        onClose={onClose}
        onMinimize={onMinimize}
        onToggleFullscreen={onToggleFullscreen}
      />
      <WindowHeaderRightSection />
    </WindowHeaderContainer>
  );
}

/**
 * Window header container - Separating Code Paths for clean structure
 */
function WindowHeaderContainer({
  children,
  className,
  onMouseDown,
}: {
  children: React.ReactNode;
  className: string;
  onMouseDown?: (e: React.MouseEvent) => void;
}) {
  return (
    <div className={className} onMouseDown={onMouseDown}>
      {children}
    </div>
  );
}

/**
 * Window header content section - Cohesion - groups controls and title
 */
function WindowHeaderContent({
  title,
  isFullscreen,
  onClose,
  onMinimize,
  onToggleFullscreen,
}: {
  title: string;
  isFullscreen: boolean;
  onClose: () => void;
  onMinimize: () => void;
  onToggleFullscreen: () => void;
}) {
  return (
    <div className={`flex items-center ${CONTROLS_SPACING}`}>
      <WindowControls
        onClose={onClose}
        onMinimize={onMinimize}
        onToggleFullscreen={onToggleFullscreen}
        isFullscreen={isFullscreen}
      />
      <WindowTitle title={title} />
    </div>
  );
}

/**
 * Window title component - Single Responsibility
 */
function WindowTitle({ title }: { title: string }) {
  return (
    <span
      className={`text-sm font-medium text-gray-700 dark:text-gray-300 ${TITLE_LEFT_MARGIN}`}
    >
      {title}
    </span>
  );
}

/**
 * Window header right section - Separating Code Paths for potential future content
 */
function WindowHeaderRightSection() {
  return (
    <div className={`flex items-center ${CONTROLS_SPACING}`}>
      {/* Right side intentionally empty for clean macOS-style design */}
    </div>
  );
}
