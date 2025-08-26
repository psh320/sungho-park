import { useState, useCallback } from "react";

// Named constants for z-index management (Naming Magic Numbers)
const WINDOW_Z_INDEX_BASE = 10;
const WINDOW_Z_INDEX_INCREMENT = 10;

interface WindowFocusState {
  focusedWindowId: string | null;
  windowZIndices: Record<string, number>;
}

interface UseWindowFocusReturn {
  /** Get the z-index for a specific window */
  getWindowZIndex: (windowId: string) => number;
  /** Focus a window (brings it to front) */
  focusWindow: (windowId: string) => void;
  /** Check if a window is currently focused */
  isWindowFocused: (windowId: string) => boolean;
  /** Get the currently focused window ID */
  focusedWindowId: string | null;
}

/**
 * Hook for managing window focus and z-index stacking
 * Features: focus management, z-index calculation, window stacking
 *
 * Following design principles:
 * - Single Responsibility: Only handles window focus/z-index
 * - Standardizing Return Types: Consistent interface
 * - Scoping State Management: Focused on window focus state
 */
export function useWindowFocus(): UseWindowFocusReturn {
  const [focusState, setFocusState] = useState<WindowFocusState>({
    focusedWindowId: null,
    windowZIndices: {},
  });

  // Get z-index for a window (Revealing Hidden Logic)
  const getWindowZIndex = useCallback(
    (windowId: string): number => {
      return focusState.windowZIndices[windowId] || WINDOW_Z_INDEX_BASE;
    },
    [focusState.windowZIndices]
  );

  // Focus a window and bring it to front (Single Responsibility)
  const focusWindow = useCallback((windowId: string) => {
    setFocusState((prevState) => {
      // Find the highest current z-index
      const currentZIndices = Object.values(prevState.windowZIndices);
      const maxZIndex = Math.max(WINDOW_Z_INDEX_BASE, ...currentZIndices);

      // Calculate new z-index for the focused window
      const newZIndex = maxZIndex + WINDOW_Z_INDEX_INCREMENT;

      return {
        focusedWindowId: windowId,
        windowZIndices: {
          ...prevState.windowZIndices,
          [windowId]: newZIndex,
        },
      };
    });
  }, []);

  // Check if a window is currently focused (Predictability)
  const isWindowFocused = useCallback(
    (windowId: string): boolean => {
      return focusState.focusedWindowId === windowId;
    },
    [focusState.focusedWindowId]
  );

  return {
    getWindowZIndex,
    focusWindow,
    isWindowFocused,
    focusedWindowId: focusState.focusedWindowId,
  };
}
