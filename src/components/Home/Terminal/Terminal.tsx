import { useState, useEffect, useRef } from "react";
import { useTypewriter } from "../../../hooks/useTypewriter";
import { useCommandAutocomplete } from "../../../hooks/useCommandAutocomplete";
import { useFullscreen } from "../../../hooks/useFullscreen";
import { useResize } from "../../../hooks/useResize";
import { useDrag } from "../../../hooks/useDrag";
import { executeCommand, getIntroText } from "./terminalCommands";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalInput } from "./TerminalInput";
import { ResizeHandles } from "./ResizeHandles";
import { TERMINAL_CONFIG } from "./constants";

interface TerminalProps {
  /** Whether the terminal is visible */
  isVisible: boolean;
  /** Whether the terminal is minimized */
  isMinimized: boolean;
  /** Callback when terminal is closed */
  onClose: () => void;
  /** Callback when terminal is minimized */
  onMinimize: () => void;
}

/**
 * Terminal component with macOS-style window controls
 * Features: drag & drop, resize, fullscreen, typewriter effect
 */
export default function Terminal({
  isVisible,
  isMinimized,
  onClose,
  onMinimize,
}: TerminalProps) {
  const [command, setCommand] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  const { typedText, isTyping, startTyping, clearText } = useTypewriter();
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  const { size, isResizing, positionOffset, resizeHandlers } = useResize({
    initialSize: {
      width: TERMINAL_CONFIG.DEFAULT_WIDTH,
      height: TERMINAL_CONFIG.DEFAULT_HEIGHT,
    },
    minSize: {
      width: TERMINAL_CONFIG.MIN_WIDTH,
      height: TERMINAL_CONFIG.MIN_HEIGHT,
    },
    maxSize: {
      width: TERMINAL_CONFIG.MAX_WIDTH,
      height: TERMINAL_CONFIG.MAX_HEIGHT,
    },
  });

  // Calculate initial centered position (only once)
  const initialCenteredPosition = {
    x: -TERMINAL_CONFIG.DEFAULT_WIDTH / 2,
    y: -TERMINAL_CONFIG.DEFAULT_HEIGHT / 2,
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
  } = useCommandAutocomplete(command, TERMINAL_CONFIG.COMMANDS, setCommand);

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

  // Named constants for styling (Naming Magic Numbers)
  const FULLSCREEN_PADDING = "2rem";
  const TERMINAL_BORDER_RADIUS = "rounded-lg";
  const TERMINAL_SHADOW = "shadow-2xl";

  // Determine terminal styling based on fullscreen and minimized state (Separating Code Paths)
  const terminalConfig = (() => {
    const baseStyle = isMinimized
      ? { opacity: 0, pointerEvents: "none" as const }
      : { opacity: 1, pointerEvents: "auto" as const };

    if (isFullscreen) {
      return {
        containerClasses: "flex items-start justify-center h-full",
        terminalClasses: `relative bg-gray-100 dark:bg-gray-900 ${TERMINAL_BORDER_RADIUS} ${TERMINAL_SHADOW} border border-gray-300 dark:border-gray-700 vt323-regular text-gray-800 dark:text-green-500 w-full flex flex-col transition-opacity duration-300`,
        terminalStyle: {
          width: "100%",
          height: `calc(100% - ${FULLSCREEN_PADDING})`,
          ...baseStyle,
        },
      };
    }

    return {
      containerClasses: "h-full",
      terminalClasses: `absolute bg-gray-100 dark:bg-gray-900 ${TERMINAL_BORDER_RADIUS} ${TERMINAL_SHADOW} border border-gray-300 dark:border-gray-700 vt323-regular text-gray-800 dark:text-green-500 flex flex-col transition-opacity duration-300`,
      terminalStyle: {
        width: `${size.width}px`,
        height: `${size.height}px`,
        left: `calc(50% + ${position.x + positionOffset.x}px)`,
        top: `calc(50% + ${position.y + positionOffset.y}px)`,
        ...baseStyle,
      },
    };
  })();

  // Named condition for better readability
  const isInteracting = isResizing || isDragging;
  const interactionClasses = isInteracting ? "select-none" : "";

  return (
    <div className={terminalConfig.containerClasses}>
      <div
        ref={terminalRef}
        className={`${terminalConfig.terminalClasses} ${interactionClasses}`}
        style={terminalConfig.terminalStyle}
      >
        <TerminalHeader
          isFullscreen={isFullscreen}
          onClose={onClose}
          onMinimize={onMinimize}
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
