import { useCallback } from "react";

// Single cursor class name (Simplified)
const DESKTOP_CURSOR_CLASS = "desktop-cursor";

interface UseDesktopCursorReturn {
  /** Apply desktop cursor to an element */
  applyCursor: (element: HTMLElement | null) => void;
  /** Remove desktop cursor from an element */
  removeCursor: (element: HTMLElement | null) => void;
  /** Get cursor class name */
  getCursorClass: () => string;
}

/**
 * Simplified hook for managing single desktop cursor
 * Features: apply/remove single custom cursor
 *
 * Following design principles:
 * - Single Responsibility: Only handles one cursor type
 * - Simplicity: Minimal API surface
 */
export function useDesktopCursor(): UseDesktopCursorReturn {
  // Apply cursor to element (Single Responsibility)
  const applyCursor = useCallback((element: HTMLElement | null) => {
    if (!element) return;
    element.classList.add(DESKTOP_CURSOR_CLASS);
  }, []);

  // Remove cursor from element (Single Responsibility)
  const removeCursor = useCallback((element: HTMLElement | null) => {
    if (!element) return;
    element.classList.remove(DESKTOP_CURSOR_CLASS);
  }, []);

  // Get cursor class name (Predictability)
  const getCursorClass = useCallback(() => {
    return DESKTOP_CURSOR_CLASS;
  }, []);

  return {
    applyCursor,
    removeCursor,
    getCursorClass,
  };
}
