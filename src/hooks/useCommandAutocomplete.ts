import { useState, useEffect, useCallback } from "react";

interface UseCommandAutocompleteReturn {
  suggestions: string[];
  selectedSuggestion: number;
  setSuggestions: (suggestions: string[]) => void;
  setSelectedSuggestion: (index: number) => void;
  navigateSuggestions: (direction: "up" | "down") => void;
  selectSuggestion: (suggestion: string) => void;
  clearSuggestions: () => void;
}

export function useCommandAutocomplete(
  command: string,
  availableCommands: readonly string[],
  onCommandChange: (command: string) => void
): UseCommandAutocompleteReturn {
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [selectedSuggestion, setSelectedSuggestion] = useState(0);

  // Update suggestions when command changes
  useEffect(() => {
    const hasCommand = command.trim();

    if (hasCommand) {
      const matchingSuggestions = availableCommands.filter((cmd) =>
        cmd.toLowerCase().startsWith(command.toLowerCase())
      );
      setSuggestions(matchingSuggestions);
      setSelectedSuggestion(0);
    } else {
      setSuggestions([]);
    }
  }, [command, availableCommands]);

  const navigateSuggestions = useCallback(
    (direction: "up" | "down") => {
      setSelectedSuggestion((prev) => {
        const isNavigatingDown = direction === "down";
        const isAtEnd = prev >= suggestions.length - 1;
        const isAtStart = prev <= 0;

        if (isNavigatingDown) {
          return isAtEnd ? 0 : prev + 1;
        } else {
          return isAtStart ? suggestions.length - 1 : prev - 1;
        }
      });
    },
    [suggestions.length]
  );

  const selectSuggestion = useCallback(
    (suggestion: string) => {
      onCommandChange(suggestion);
      setSuggestions([]);
    },
    [onCommandChange]
  );

  const clearSuggestions = useCallback(() => {
    setSuggestions([]);
    setSelectedSuggestion(0);
  }, []);

  return {
    suggestions,
    selectedSuggestion,
    setSuggestions,
    setSelectedSuggestion,
    navigateSuggestions,
    selectSuggestion,
    clearSuggestions,
  };
}
