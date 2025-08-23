import { useState, useCallback, useEffect } from "react";

interface UseFullscreenReturn {
  isFullscreen: boolean;
  toggleFullscreen: () => void;
  enterFullscreen: () => void;
  exitFullscreen: () => void;
}

export function useFullscreen(
  initialState: boolean = false
): UseFullscreenReturn {
  const [isFullscreen, setIsFullscreen] = useState(initialState);

  const enterFullscreen = useCallback(() => {
    setIsFullscreen(true);
  }, []);

  const exitFullscreen = useCallback(() => {
    setIsFullscreen(false);
  }, []);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  // Handle keyboard shortcuts for fullscreen
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const isEscapeKey = event.key === "Escape";
      const isF11Key = event.key === "F11";

      if (isEscapeKey && isFullscreen) {
        exitFullscreen();
      } else if (isF11Key) {
        event.preventDefault(); // Prevent browser's native F11 fullscreen
        toggleFullscreen();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isFullscreen, exitFullscreen, toggleFullscreen]);

  return {
    isFullscreen,
    toggleFullscreen,
    enterFullscreen,
    exitFullscreen,
  };
}
