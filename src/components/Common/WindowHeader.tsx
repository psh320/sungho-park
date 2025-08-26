import { X, Minus, Maximize2, Minimize2 } from "lucide-react";

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

const BUTTON_SIZE_CLASS = "w-3.5 h-3.5"; // 12px equivalent

/**
 * Generic window header component with macOS-style window controls
 * Features: close, minimize, fullscreen buttons, draggable area, customizable title
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
  const headerClasses =
    "flex items-center justify-between bg-gray-200 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-600 rounded-t-lg";

  return (
    <div
      className={`${headerClasses} ${
        !isFullscreen && onDragStart ? "cursor-move" : ""
      } ${className}`}
      onMouseDown={!isFullscreen ? onDragStart : undefined}
    >
      <div className="flex items-center space-x-2">
        <div className="flex space-x-2 group">
          <button
            onClick={onClose}
            onMouseDown={(e) => e.stopPropagation()}
            className={`${BUTTON_SIZE_CLASS} bg-red-500 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center`}
            title="Close Window"
          >
            <X
              size={8}
              strokeWidth={4}
              className="text-red-900 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </button>
          <button
            onClick={onMinimize}
            onMouseDown={(e) => e.stopPropagation()}
            className={`${BUTTON_SIZE_CLASS} bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors flex items-center justify-center`}
            title="Minimize Window"
          >
            <Minus
              size={8}
              strokeWidth={4}
              className="text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </button>
          <button
            onClick={onToggleFullscreen}
            onMouseDown={(e) => e.stopPropagation()}
            className={`${BUTTON_SIZE_CLASS} bg-green-500 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center`}
            title={
              isFullscreen
                ? "Exit Fullscreen Mode (Esc)"
                : "Enter Fullscreen Mode (F11)"
            }
          >
            {isFullscreen ? (
              <Minimize2
                size={8}
                strokeWidth={4}
                className="text-green-900 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            ) : (
              <Maximize2
                size={8}
                strokeWidth={4}
                className="text-green-900 opacity-0 group-hover:opacity-100 transition-opacity"
              />
            )}
          </button>
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-4">
          {title}
        </span>
      </div>

      <div className="flex items-center space-x-2">
        {/* Right side intentionally empty for clean macOS-style design */}
      </div>
    </div>
  );
}
