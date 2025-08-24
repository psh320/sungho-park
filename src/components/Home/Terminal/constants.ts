// Terminal configuration constants
export const TERMINAL_CONFIG = {
  // Default dimensions
  DEFAULT_WIDTH: 700,
  DEFAULT_HEIGHT: 500,

  // Size constraints
  MIN_WIDTH: 400,
  MIN_HEIGHT: 300,
  MAX_WIDTH: 1200,
  MAX_HEIGHT: 800,

  // Available commands
  COMMANDS: [
    "about",
    "skills",
    "experience",
    "help",
    "clear",
    "fullscreen",
  ] as const,
} as const;

// Type for available commands
export type TerminalCommand = (typeof TERMINAL_CONFIG.COMMANDS)[number];
