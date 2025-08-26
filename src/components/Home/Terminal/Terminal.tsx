import { useState, useEffect } from "react";
import { useTypewriter } from "../../../hooks/useTypewriter";
import { useCommandAutocomplete } from "../../../hooks/useCommandAutocomplete";
import { executeCommand, getIntroText } from "./terminalCommands";
import { TerminalInput } from "./TerminalInput";
import { TERMINAL_CONFIG } from "./constants";
import Window from "../../Common/Window";

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
 * Terminal component focused on terminal functionality
 * Uses the generic Window component for window behavior
 */
export default function Terminal({
  isVisible,
  isMinimized,
  onClose,
  onMinimize,
}: TerminalProps) {
  const [command, setCommand] = useState("");
  const [shouldToggleFullscreen, setShouldToggleFullscreen] = useState(false);

  const { typedText, isTyping, startTyping, clearText } = useTypewriter();

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

  // Handle fullscreen state change from Window component
  const handleFullscreenChange = (isFullscreen: boolean) => {
    // Show appropriate message when fullscreen changes from Window component
    if (shouldToggleFullscreen) {
      const currentText = typedText;
      const message = isFullscreen
        ? "Terminal expanded! You can also use F11 key or click the green button in the header."
        : "Terminal restored to windowed mode.";
      const newContent = `\n\n$ fullscreen\n${message}\n`;
      startTyping(newContent, currentText);
      setCommand("");
      clearSuggestions();
      setShouldToggleFullscreen(false); // Reset the flag
    }
  };

  const handleCommandSubmit = (submittedCommand: string) => {
    const normalizedCommand = submittedCommand.trim().toLowerCase();

    // Handle fullscreen command specially - trigger Window component's fullscreen
    if (normalizedCommand === "fullscreen") {
      setShouldToggleFullscreen(true);
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

  return (
    <Window
      isVisible={isVisible}
      isMinimized={isMinimized}
      title="Sungho Park Terminal"
      onClose={onClose}
      onMinimize={onMinimize}
      onFullscreenChange={handleFullscreenChange}
      shouldToggleFullscreen={shouldToggleFullscreen}
      initialSize={{
        width: TERMINAL_CONFIG.DEFAULT_WIDTH,
        height: TERMINAL_CONFIG.DEFAULT_HEIGHT,
      }}
      minSize={{
        width: TERMINAL_CONFIG.MIN_WIDTH,
        height: TERMINAL_CONFIG.MIN_HEIGHT,
      }}
      maxSize={{
        width: TERMINAL_CONFIG.MAX_WIDTH,
        height: TERMINAL_CONFIG.MAX_HEIGHT,
      }}
      className="vt323-regular text-gray-800 dark:text-green-500"
      contentClassName="bg-gray-100 dark:bg-gray-900"
    >
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
    </Window>
  );
}
