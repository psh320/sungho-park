// Named constants for window styling (Naming Magic Numbers)
export const WINDOW_CONSTANTS = {
  // Spacing and sizing
  FULLSCREEN_PADDING: "2rem",

  // Border and visual styles
  BORDER_RADIUS: "rounded-lg",
  SHADOW: "shadow-2xl",
  BORDER_COLOR: "border border-gray-300 dark:border-gray-700",

  // Background colors
  BACKGROUND: "bg-white dark:bg-gray-900",

  // Transition effects
  TRANSITION: "transition-opacity duration-300",

  // Default dimensions
  DEFAULT_SIZE: { width: 800, height: 600 },
  DEFAULT_MIN_SIZE: { width: 400, height: 300 },
  DEFAULT_MAX_SIZE: { width: 1200, height: 800 },
} as const;

interface WindowSize {
  width: number;
  height: number;
}

interface Position {
  x: number;
  y: number;
}

interface BaseWindowStyle {
  opacity: number;
  pointerEvents: "auto" | "none";
}

interface WindowConfigResult {
  containerClasses: string;
  windowClasses: string;
  windowStyle: React.CSSProperties;
}

/**
 * Window configuration factory - Separating Code Paths for different window states
 * Standardizing Return Types - Consistent configuration interface
 */
export class WindowConfigFactory {
  private static createBaseStyle(isMinimized: boolean): BaseWindowStyle {
    return isMinimized
      ? { opacity: 0, pointerEvents: "none" }
      : { opacity: 1, pointerEvents: "auto" };
  }

  private static createBaseWindowClasses(): string {
    return [
      WINDOW_CONSTANTS.BACKGROUND,
      WINDOW_CONSTANTS.BORDER_RADIUS,
      WINDOW_CONSTANTS.SHADOW,
      WINDOW_CONSTANTS.BORDER_COLOR,
      "flex flex-col",
      WINDOW_CONSTANTS.TRANSITION,
    ].join(" ");
  }

  /**
   * Create fullscreen window configuration
   * Single Responsibility - Handles only fullscreen styling
   */
  static createFullscreenConfig(isMinimized: boolean): WindowConfigResult {
    const baseStyle = this.createBaseStyle(isMinimized);
    const baseClasses = this.createBaseWindowClasses();

    return {
      containerClasses: "flex items-start justify-center h-full",
      windowClasses: `relative ${baseClasses} w-full`,
      windowStyle: {
        width: "100%",
        height: `calc(100% - ${WINDOW_CONSTANTS.FULLSCREEN_PADDING})`,
        ...baseStyle,
      },
    };
  }

  /**
   * Create windowed mode configuration
   * Single Responsibility - Handles only windowed styling
   */
  static createWindowedConfig(
    isMinimized: boolean,
    size: WindowSize,
    position: Position,
    positionOffset: Position
  ): WindowConfigResult {
    const baseStyle = this.createBaseStyle(isMinimized);
    const baseClasses = this.createBaseWindowClasses();

    return {
      containerClasses: "h-full",
      windowClasses: `absolute ${baseClasses}`,
      windowStyle: {
        width: `${size.width}px`,
        height: `${size.height}px`,
        left: `calc(50% + ${position.x + positionOffset.x}px)`,
        top: `calc(50% + ${position.y + positionOffset.y}px)`,
        ...baseStyle,
      },
    };
  }
}

/**
 * Helper for calculating initial position - Relating Magic Numbers to Logic
 */
export function calculateInitialPosition(size: WindowSize): Position {
  return {
    x: -size.width / 2,
    y: -size.height / 2,
  };
}
