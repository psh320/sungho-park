interface TerminalHeaderProps {
  isFullscreen: boolean;
  onClose: () => void;
  onToggleFullscreen: () => void;
}

const BUTTON_SIZE_CLASS = "w-3 h-3"; // 12px equivalent

export function TerminalHeader({
  isFullscreen,
  onClose,
  onToggleFullscreen,
}: TerminalHeaderProps) {
  const headerClasses = isFullscreen
    ? "flex items-center justify-between bg-gray-200 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-600"
    : "flex items-center justify-between bg-gray-200 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-600 rounded-t-lg";

  return (
    <div className={headerClasses}>
      <div className="flex items-center space-x-2">
        <div className="flex space-x-2">
          <div className={`${BUTTON_SIZE_CLASS} bg-red-500 rounded-full`}></div>
          <div
            className={`${BUTTON_SIZE_CLASS} bg-yellow-500 rounded-full`}
          ></div>
          <div
            className={`${BUTTON_SIZE_CLASS} bg-green-500 rounded-full`}
          ></div>
        </div>
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300 ml-4">
          Sungho Park Terminal
        </span>
      </div>

      <div className="flex items-center space-x-2">
        <button
          onClick={onToggleFullscreen}
          className="p-1 hover:bg-blue-500 hover:text-white rounded"
          title={
            isFullscreen ? "Exit Fullscreen (Esc)" : "Enter Fullscreen (F11)"
          }
        >
          {isFullscreen ? (
            // Exit fullscreen icon
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 01-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15 13.586V12a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
          ) : (
            // Enter fullscreen icon
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 000 2h1.586L2.293 8.293a1 1 0 101.414 1.414L6 7.414V9a1 1 0 102 0V4a1 1 0 00-1-1H3zm11 0a1 1 0 011 1v4a1 1 0 11-2 0V7.414l-2.293 2.293a1 1 0 11-1.414-1.414L11.586 6H10a1 1 0 110-2h4zM3 16a1 1 0 100-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L6 12.586V11a1 1 0 112 0v5a1 1 0 01-1 1H3zm14-5a1 1 0 01-1 1h-1.586l2.293 2.293a1 1 0 01-1.414 1.414L14 12.586V14a1 1 0 11-2 0v-5a1 1 0 011-1h4a1 1 0 011 1z"
                clipRule="evenodd"
              />
            </svg>
          )}
        </button>
        <button
          onClick={onClose}
          className="p-1 hover:bg-red-500 hover:text-white rounded"
          title="Close Terminal"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
