import { useState, useEffect, useRef } from "react";
import { useTypewriter } from "../../../hooks/useTypewriter";
import { useCommandAutocomplete } from "../../../hooks/useCommandAutocomplete";
import { useFullscreen } from "../../../hooks/useFullscreen";
import { useResize } from "../../../hooks/useResize";
import { useDrag } from "../../../hooks/useDrag";
import { executeCommand, getIntroText } from "./terminalCommands";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalInput } from "./TerminalInput";
import { ResizeHandles } from "../ResizeHandles";

interface TerminalProps {
  isVisible: boolean;
  onClose: () => void;
}

// Named constants for magic numbers
const TERMINAL_WIDTH_PX = 700;
const TERMINAL_HEIGHT_PX = 500;

// Available commands constant
const AVAILABLE_COMMANDS = [
  "about",
  "skills",
  "experience",
  "help",
  "clear",
  "fullscreen",
] as const;

export default function Terminal({ isVisible, onClose }: TerminalProps) {
  const [command, setCommand] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  const { typedText, isTyping, startTyping, clearText } = useTypewriter();
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const { size, isResizing, positionOffset, resizeHandlers } = useResize({
    initialSize: { width: TERMINAL_WIDTH_PX, height: TERMINAL_HEIGHT_PX },
    minSize: { width: 400, height: 300 },
    maxSize: { width: 1200, height: 800 },
  });

  // Calculate initial centered position (only once)
  const initialCenteredPosition = {
    x: -TERMINAL_WIDTH_PX / 2,
    y: -TERMINAL_HEIGHT_PX / 2,
  };

  const { position, isDragging, dragHandlers } = useDrag({
    initialPosition: initialCenteredPosition,
    disabled: isFullscreen,
  });

  const {
    suggestions,
    selectedSuggestion,
    navigateSuggestions,
    selectSuggestion,
    clearSuggestions,
  } = useCommandAutocomplete(command, AVAILABLE_COMMANDS, setCommand);

  // Initialize terminal with intro text
  useEffect(() => {
    if (!isVisible) return;

    const introText = getIntroText();
    startTyping(introText);
  }, [isVisible, startTyping]);

  const handleCommandSubmit = (submittedCommand: string) => {
    const normalizedCommand = submittedCommand.trim().toLowerCase();

    // Handle fullscreen command specially since it needs access to toggleFullscreen
    if (normalizedCommand === "fullscreen") {
      toggleFullscreen();
      const currentText = typedText;
      const newContent = `\n\n$ ${submittedCommand}\nTerminal expanded! You can also use F11 key or click the green button in the header.\n`;
      startTyping(newContent, currentText);
      setCommand("");
      clearSuggestions();
      return;
    }

    const { response, shouldClear } = executeCommand(submittedCommand);

    if (shouldClear) {
      clearText();
      setCommand("");
      clearSuggestions();
      return;
    }

    // Only animate the new content (command + response)
    const currentText = typedText;
    const newContent = `\n\n$ ${submittedCommand}\n${response}\n`;

    startTyping(newContent, currentText);
    setCommand("");
    clearSuggestions();
  };

  if (!isVisible) return null;

  // Determine terminal styling based on fullscreen state
  const containerClasses = isFullscreen
    ? "flex items-start justify-center min-h-screen pt-24 px-4"
    : "min-h-screen pt-24";

  const terminalClasses = isFullscreen
    ? "relative bg-gray-100 dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-300 dark:border-gray-700 vt323-regular text-gray-800 dark:text-green-500 w-full flex flex-col"
    : "absolute bg-gray-100 dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-300 dark:border-gray-700 vt323-regular text-gray-800 dark:text-green-500 flex flex-col";

  const terminalStyle = isFullscreen
    ? { width: "100%", height: "calc(100vh - 8rem)" }
    : {
        width: `${size.width}px`,
        height: `${size.height}px`,
        left: `calc(50% + ${position.x + positionOffset.x}px)`,
        top: `calc(50% + ${position.y + positionOffset.y}px)`,
      };

  return (
    <div className={containerClasses}>
      <div
        ref={terminalRef}
        className={`${terminalClasses} ${
          isResizing || isDragging ? "select-none" : ""
        }`}
        style={terminalStyle}
      >
        <TerminalHeader
          isFullscreen={isFullscreen}
          onClose={onClose}
          onToggleFullscreen={toggleFullscreen}
          onDragStart={dragHandlers.onMouseDown}
        />

        {/* Terminal Content */}
        <div className="flex-1 flex flex-col overflow-y-auto">
          <div className="flex-1 whitespace-pre-line p-6 pb-2">
            {typedText}
            {isTyping && <span className="animate-pulse ml-1">|</span>}
          </div>
        </div>

        <TerminalInput
          command={command}
          suggestions={suggestions}
          selectedSuggestion={selectedSuggestion}
          onCommandChange={setCommand}
          onCommandSubmit={handleCommandSubmit}
          onSuggestionSelect={selectSuggestion}
          onSuggestionNavigate={navigateSuggestions}
          shouldFocus={!isTyping}
        />

        {/* Resize handles - only show when not in fullscreen */}
        {!isFullscreen && (
          <ResizeHandles onMouseDown={resizeHandlers.onMouseDown} />
        )}
      </div>
    </div>
  );
}
