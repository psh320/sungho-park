import { X, Minus, Maximize2, Minimize2 } from "lucide-react";

// Named constants for better readability (Naming Magic Numbers)
const BUTTON_SIZE_CLASS = "w-3.5 h-3.5"; // 12px equivalent
const ICON_SIZE = 8;
const ICON_STROKE_WIDTH = 4;

interface WindowControlButtonProps {
  onClick: () => void;
  onMouseDown: (e: React.MouseEvent) => void;
  title: string;
  colorClasses: string;
  hoverClasses: string;
  iconClasses: string;
  children: React.ReactNode;
}

/**
 * Individual window control button component
 * Abstracting Implementation Details - Separates button logic from header logic
 */
function WindowControlButton({
  onClick,
  onMouseDown,
  title,
  colorClasses,
  hoverClasses,
  iconClasses,
  children,
}: WindowControlButtonProps) {
  return (
    <button
      onClick={onClick}
      onMouseDown={onMouseDown}
      className={`${BUTTON_SIZE_CLASS} ${colorClasses} rounded-full ${hoverClasses} transition-colors flex items-center justify-center`}
      title={title}
    >
      <span
        className={`${iconClasses} opacity-0 group-hover:opacity-100 transition-opacity`}
      >
        {children}
      </span>
    </button>
  );
}

/**
 * Close button with semantic styling and behavior
 * Separating Code Paths - Dedicated component for close action
 */
function CloseButton({ onClose }: { onClose: () => void }) {
  return (
    <WindowControlButton
      onClick={onClose}
      onMouseDown={(e) => e.stopPropagation()}
      title="Close Window"
      colorClasses="bg-red-500"
      hoverClasses="hover:bg-red-600"
      iconClasses="text-red-900"
    >
      <X size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
    </WindowControlButton>
  );
}

/**
 * Minimize button with semantic styling and behavior
 * Separating Code Paths - Dedicated component for minimize action
 */
function MinimizeButton({ onMinimize }: { onMinimize: () => void }) {
  return (
    <WindowControlButton
      onClick={onMinimize}
      onMouseDown={(e) => e.stopPropagation()}
      title="Minimize Window"
      colorClasses="bg-yellow-500"
      hoverClasses="hover:bg-yellow-600"
      iconClasses="text-yellow-900"
    >
      <Minus size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
    </WindowControlButton>
  );
}

/**
 * Fullscreen toggle button with dynamic icon and title
 * Separating Code Paths - Handles fullscreen vs windowed states
 */
function FullscreenButton({
  isFullscreen,
  onToggleFullscreen,
}: {
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}) {
  // Named conditions for better readability
  const isInFullscreenMode = isFullscreen;
  const buttonTitle = isInFullscreenMode
    ? "Exit Fullscreen Mode (Esc)"
    : "Enter Fullscreen Mode (F11)";

  return (
    <WindowControlButton
      onClick={onToggleFullscreen}
      onMouseDown={(e) => e.stopPropagation()}
      title={buttonTitle}
      colorClasses="bg-green-500"
      hoverClasses="hover:bg-green-600"
      iconClasses="text-green-900"
    >
      {isInFullscreenMode ? (
        <Minimize2 size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
      ) : (
        <Maximize2 size={ICON_SIZE} strokeWidth={ICON_STROKE_WIDTH} />
      )}
    </WindowControlButton>
  );
}

interface WindowControlsProps {
  onClose: () => void;
  onMinimize: () => void;
  onToggleFullscreen: () => void;
  isFullscreen: boolean;
}

/**
 * Window controls component grouping all three macOS-style buttons
 * Features: close, minimize, fullscreen buttons with proper hover states
 * Cohesion - Groups related window control functionality together
 */
export function WindowControls({
  onClose,
  onMinimize,
  onToggleFullscreen,
  isFullscreen,
}: WindowControlsProps) {
  return (
    <div className="flex space-x-2 group">
      <CloseButton onClose={onClose} />
      <MinimizeButton onMinimize={onMinimize} />
      <FullscreenButton
        isFullscreen={isFullscreen}
        onToggleFullscreen={onToggleFullscreen}
      />
    </div>
  );
}
