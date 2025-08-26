import { useRef, useEffect } from "react";

interface TerminalInputProps {
  command: string;
  suggestions: string[];
  selectedSuggestion: number;
  onCommandChange: (command: string) => void;
  onCommandSubmit: (command: string) => void;
  onSuggestionSelect: (suggestion: string) => void;
  onSuggestionNavigate: (direction: "up" | "down") => void;
  shouldFocus: boolean;
}

export function TerminalInput({
  command,
  suggestions,
  selectedSuggestion,
  onCommandChange,
  onCommandSubmit,
  onSuggestionSelect,
  onSuggestionNavigate,
  shouldFocus,
}: TerminalInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shouldFocus && inputRef.current) {
      inputRef.current.focus();
    }
  }, [shouldFocus]);

  const getCurrentSuggestion = (): string => {
    const hasSuggestions = suggestions.length > 0 && command.trim();

    if (!hasSuggestions) return "";

    const currentSuggestion = suggestions[selectedSuggestion];
    const isValidSuggestion = currentSuggestion
      ?.toLowerCase()
      .startsWith(command.toLowerCase());

    return isValidSuggestion ? currentSuggestion.slice(command.length) : "";
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCommandSubmit(command);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    const hasSuggestions = suggestions.length > 0;

    if (!hasSuggestions) return;

    const keyActions = {
      Tab: () => {
        e.preventDefault();
        onSuggestionSelect(suggestions[selectedSuggestion]);
      },
      ArrowDown: () => {
        e.preventDefault();
        onSuggestionNavigate("down");
      },
      ArrowUp: () => {
        e.preventDefault();
        onSuggestionNavigate("up");
      },
    };

    const action = keyActions[e.key as keyof typeof keyActions];
    action?.();
  };

  const handleSuggestionClick = () => {
    const hasSuggestions = suggestions.length > 0;

    if (hasSuggestions) {
      onSuggestionSelect(suggestions[selectedSuggestion]);
      inputRef.current?.focus();
    }
  };

  const currentSuggestion = getCurrentSuggestion();
  const hasMultipleSuggestions = suggestions.length > 1;

  return (
    <div className="border-t border-gray-300 dark:border-gray-600 p-4">
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="mr-2">$</span>
        <div className="relative flex-1">
          <input
            ref={inputRef}
            type="text"
            value={command}
            onChange={(e) => onCommandChange(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter command (try 'help')"
            className="bg-transparent outline-none w-full placeholder-gray-500 dark:placeholder-green-300 relative"
            autoFocus
          />
          {/* Inline suggestion overlay */}
          {currentSuggestion && (
            <div className="absolute inset-0 flex items-center pointer-events-none">
              <span className="invisible">{command}</span>
              <span
                className="text-gray-400 dark:text-gray-500 cursor-pointer pointer-events-auto"
                onClick={handleSuggestionClick}
              >
                {currentSuggestion}
              </span>
            </div>
          )}
        </div>
      </form>
      {/* Show available suggestions count */}
      {hasMultipleSuggestions && (
        <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
          {suggestions.length} suggestions available (↑↓ to navigate, Tab to
          complete)
        </div>
      )}
    </div>
  );
}
