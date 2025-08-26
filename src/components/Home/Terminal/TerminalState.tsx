import { useState, useEffect, useCallback } from "react";
import { useTypewriter } from "../../../hooks/useTypewriter";
import { useCommandAutocomplete } from "../../../hooks/useCommandAutocomplete";
import { executeCommand, getIntroText } from "./terminalCommands";
import { TERMINAL_CONFIG } from "./constants";

// Standardizing Return Types - Consistent interfaces for terminal state
export interface TerminalStateResult {
  // Command state
  command: string;
  setCommand: (command: string) => void;

  // Typewriter state
  typedText: string;
  isTyping: boolean;

  // Autocomplete state
  suggestions: string[];
  selectedSuggestion: number;

  // Fullscreen state management
  shouldToggleFullscreen: boolean;

  // Actions
  handleCommandSubmit: (command: string) => void;
  handleFullscreenChange: (isFullscreen: boolean) => void;
  navigateSuggestions: (direction: "up" | "down") => void;
  selectSuggestion: (suggestion: string) => void;
  clearSuggestions: () => void;
}

interface UseTerminalStateProps {
  isVisible: boolean;
}

/**
 * Custom hook for terminal state management - Scoping State Management
 * Reduces coupling by grouping all terminal-specific state and logic
 * Single Responsibility - Handles only terminal state, not window behavior
 */
export function useTerminalState({
  isVisible,
}: UseTerminalStateProps): TerminalStateResult {
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

  // Initialize terminal with intro text - Single Responsibility
  useEffect(() => {
    if (!isVisible) return;

    const introText = getIntroText();
    startTyping(introText);
  }, [isVisible, startTyping]);

  // Handle fullscreen state change from Window component - Revealing Hidden Logic
  const handleFullscreenChange = useCallback(
    (isFullscreen: boolean) => {
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
    },
    [shouldToggleFullscreen, typedText, startTyping, clearSuggestions]
  );

  // Command submission handler - Abstracting Implementation Details
  const handleCommandSubmit = useCallback(
    (submittedCommand: string) => {
      const normalizedCommand = submittedCommand.trim().toLowerCase();

      // Handle fullscreen command specially - Separating Code Paths
      if (normalizedCommand === "fullscreen") {
        setShouldToggleFullscreen(true);
        return;
      }

      // Handle regular commands
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
    },
    [typedText, startTyping, clearText, clearSuggestions]
  );

  return {
    command,
    setCommand,
    typedText,
    isTyping,
    suggestions,
    selectedSuggestion,
    shouldToggleFullscreen,
    handleCommandSubmit,
    handleFullscreenChange,
    navigateSuggestions,
    selectSuggestion,
    clearSuggestions,
  };
}
