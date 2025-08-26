import { TerminalInput } from "./TerminalInput";
import { TERMINAL_CONFIG } from "./constants";
import { useTerminalState } from "./TerminalState";
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

// Named constants for terminal styling (Relating Magic Numbers to Logic)
const TERMINAL_STYLING = {
  FONT_FAMILY: "vt323-regular",
  TEXT_COLORS: "text-gray-800 dark:text-green-500",
  BACKGROUND: "bg-gray-100 dark:bg-gray-900",
} as const;

/**
 * Terminal component focused on terminal functionality
 * Uses the generic Window component for window behavior
 * Abstracting Implementation Details - Separates terminal logic from window management
 */
export default function Terminal({
  isVisible,
  isMinimized,
  onClose,
  onMinimize,
}: TerminalProps) {
  // Use dedicated terminal state hook (Scoping State Management)
  const terminalState = useTerminalState({ isVisible });

  return (
    <Window
      isVisible={isVisible}
      isMinimized={isMinimized}
      title="Sungho Park Terminal"
      onClose={onClose}
      onMinimize={onMinimize}
      onFullscreenChange={terminalState.handleFullscreenChange}
      shouldToggleFullscreen={terminalState.shouldToggleFullscreen}
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
      className={`${TERMINAL_STYLING.FONT_FAMILY} ${TERMINAL_STYLING.TEXT_COLORS}`}
      contentClassName={TERMINAL_STYLING.BACKGROUND}
    >
      <TerminalDisplay
        typedText={terminalState.typedText}
        isTyping={terminalState.isTyping}
      />
      <TerminalInput
        command={terminalState.command}
        suggestions={terminalState.suggestions}
        selectedSuggestion={terminalState.selectedSuggestion}
        onCommandChange={terminalState.setCommand}
        onCommandSubmit={terminalState.handleCommandSubmit}
        onSuggestionSelect={terminalState.selectSuggestion}
        onSuggestionNavigate={terminalState.navigateSuggestions}
        shouldFocus={!terminalState.isTyping}
      />
    </Window>
  );
}

/**
 * Terminal display component - Single Responsibility for text output
 * Separating Code Paths - Dedicated component for terminal text display
 */
function TerminalDisplay({
  typedText,
  isTyping,
}: {
  typedText: string;
  isTyping: boolean;
}) {
  return (
    <div className="flex-1 flex flex-col overflow-y-auto">
      <div className="flex-1 whitespace-pre-line p-6 pb-2">
        {typedText}
        {isTyping && <TerminalCursor />}
      </div>
    </div>
  );
}

/**
 * Terminal cursor component - Abstracting Implementation Details
 * Single Responsibility - Handles only cursor display logic
 */
function TerminalCursor() {
  return <span className="animate-pulse ml-1">|</span>;
}
