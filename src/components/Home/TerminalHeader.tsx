import { X, Minus, Maximize2, Minimize2 } from "lucide-react";

interface TerminalHeaderProps {
  isFullscreen: boolean;
  onClose: () => void;
  onToggleFullscreen: () => void;
}

const BUTTON_SIZE_CLASS = "w-3.5 h-3.5"; // 12px equivalent

export function TerminalHeader({
  isFullscreen,
  onClose,
  onToggleFullscreen,
}: TerminalHeaderProps) {
  const headerClasses =
    "flex items-center justify-between bg-gray-200 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-600 rounded-t-lg";

  return (
    <div className={headerClasses}>
      <div className="flex items-center space-x-2">
        <div className="flex space-x-2 group">
          <button
            onClick={onClose}
            className={`${BUTTON_SIZE_CLASS} bg-red-500 rounded-full hover:bg-red-600 transition-colors flex items-center justify-center`}
            title="Close Terminal"
          >
            <X
              size={8}
              strokeWidth={4}
              className="text-red-900 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </button>
          <div
            className={`${BUTTON_SIZE_CLASS} bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors flex items-center justify-center`}
          >
            <Minus
              size={8}
              strokeWidth={4}
              className="text-yellow-900 opacity-0 group-hover:opacity-100 transition-opacity"
            />
          </div>
          <button
            onClick={onToggleFullscreen}
            className={`${BUTTON_SIZE_CLASS} bg-green-500 rounded-full hover:bg-green-600 transition-colors flex items-center justify-center`}
            title={
              isFullscreen
                ? "Exit Expanded Mode (Esc)"
                : "Expand Terminal (F11)"
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
          Sungho Park Terminal
        </span>
      </div>

      <div className="flex items-center space-x-2">
        {/* Right side intentionally empty for clean macOS-style design */}
      </div>
    </div>
  );
}
