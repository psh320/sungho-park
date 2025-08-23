import { useState, useEffect, useRef } from "react";
import { useTypewriter } from "../../hooks/useTypewriter";
import { useCommandAutocomplete } from "../../hooks/useCommandAutocomplete";
import { executeCommand, getIntroText } from "./terminalCommands";
import { TerminalHeader } from "./TerminalHeader";
import { TerminalInput } from "./TerminalInput";

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
] as const;

export default function Terminal({ isVisible, onClose }: TerminalProps) {
  const [command, setCommand] = useState("");
  const terminalRef = useRef<HTMLDivElement>(null);

  const { typedText, isTyping, startTyping, clearText } = useTypewriter();

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

  return (
    <div className="flex items-center justify-center min-h-screen pt-24">
      <div
        ref={terminalRef}
        className="bg-gray-100 dark:bg-gray-900 rounded-lg shadow-2xl border border-gray-300 dark:border-gray-700 vt323-regular text-gray-800 dark:text-green-500 w-[700px] h-[500px] flex flex-col"
        style={{
          width: `${TERMINAL_WIDTH_PX}px`,
          height: `${TERMINAL_HEIGHT_PX}px`,
        }}
      >
        <TerminalHeader onClose={onClose} />

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
      </div>
    </div>
  );
}
