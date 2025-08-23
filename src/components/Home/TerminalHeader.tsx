interface TerminalHeaderProps {
  onClose: () => void;
}

const BUTTON_SIZE_CLASS = "w-3 h-3"; // 12px equivalent

export function TerminalHeader({ onClose }: TerminalHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-gray-200 dark:bg-gray-800 px-4 py-2 border-b border-gray-300 dark:border-gray-600 rounded-t-lg">
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
