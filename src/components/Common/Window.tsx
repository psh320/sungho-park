import { ReactNode, useRef, useEffect } from "react";
import { useFullscreen } from "../../hooks/useFullscreen";
import { useResize } from "../../hooks/useResize";
import { useDrag } from "../../hooks/useDrag";
import { WindowHeader } from "./WindowHeader";
import { ResizeHandles } from "../Home/Terminal/ResizeHandles";

interface WindowProps {
  /** Whether the window is visible */
  isVisible: boolean;
  /** Whether the window is minimized */
  isMinimized: boolean;
  /** Window title */
  title: string;
  /** Window content */
  children: ReactNode;
  /** Callback when window is closed */
  onClose: () => void;
  /** Callback when window is minimized */
  onMinimize: () => void;
  /** Callback when fullscreen state changes */
  onFullscreenChange?: (isFullscreen: boolean) => void;
  /** Trigger fullscreen toggle programmatically */
  shouldToggleFullscreen?: boolean;
  /** Initial window size */
  initialSize?: { width: number; height: number };
  /** Minimum window size */
  minSize?: { width: number; height: number };
  /** Maximum window size */
  maxSize?: { width: number; height: number };
  /** Whether the window is draggable (default: true) */
  isDraggable?: boolean;
  /** Whether the window is resizable (default: true) */
  isResizable?: boolean;
  /** Additional CSS classes for the window */
  className?: string;
  /** Custom styles for the window content */
  contentStyle?: React.CSSProperties;
  /** Custom classes for the window content */
  contentClassName?: string;
}

/**
 * Generic Window component that provides common window functionality
 * Features: drag & drop, resize, fullscreen, minimize/maximize controls
 * Can be used for any windowed content (terminal, editor, browser, etc.)
 */
export default function Window({
  isVisible,
  isMinimized,
  title,
  children,
  onClose,
  onMinimize,
  onFullscreenChange,
  shouldToggleFullscreen = false,
  initialSize = { width: 800, height: 600 },
  minSize = { width: 400, height: 300 },
  maxSize = { width: 1200, height: 800 },
  isDraggable = true,
  isResizable = true,
  className = "",
  contentStyle = {},
  contentClassName = "",
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  // Handle fullscreen changes and notify parent
  const handleToggleFullscreen = () => {
    toggleFullscreen();
    onFullscreenChange?.(!isFullscreen);
  };

  // Handle programmatic fullscreen toggle requests
  useEffect(() => {
    if (shouldToggleFullscreen) {
      handleToggleFullscreen();
    }
  }, [shouldToggleFullscreen]);

  const { size, isResizing, positionOffset, resizeHandlers } = useResize({
    initialSize,
    minSize,
    maxSize,
  });

  // Calculate initial centered position (only once)
  const initialCenteredPosition = {
    x: -initialSize.width / 2,
    y: -initialSize.height / 2,
  };

  const { position, isDragging, dragHandlers } = useDrag({
    initialPosition: initialCenteredPosition,
    disabled: isFullscreen || !isDraggable,
  });

  if (!isVisible) return null;

  // Named constants for styling (Naming Magic Numbers)
  const FULLSCREEN_PADDING = "2rem";
  const WINDOW_BORDER_RADIUS = "rounded-lg";
  const WINDOW_SHADOW = "shadow-2xl";

  // Determine window styling based on fullscreen and minimized state (Separating Code Paths)
  const windowConfig = (() => {
    const baseStyle = isMinimized
      ? { opacity: 0, pointerEvents: "none" as const }
      : { opacity: 1, pointerEvents: "auto" as const };

    if (isFullscreen) {
      return {
        containerClasses: "flex items-start justify-center h-full",
        windowClasses: `relative bg-white dark:bg-gray-900 ${WINDOW_BORDER_RADIUS} ${WINDOW_SHADOW} border border-gray-300 dark:border-gray-700 w-full flex flex-col transition-opacity duration-300`,
        windowStyle: {
          width: "100%",
          height: `calc(100% - ${FULLSCREEN_PADDING})`,
          ...baseStyle,
        },
      };
    }

    return {
      containerClasses: "h-full",
      windowClasses: `absolute bg-white dark:bg-gray-900 ${WINDOW_BORDER_RADIUS} ${WINDOW_SHADOW} border border-gray-300 dark:border-gray-700 flex flex-col transition-opacity duration-300`,
      windowStyle: {
        width: `${size.width}px`,
        height: `${size.height}px`,
        left: `calc(50% + ${position.x + positionOffset.x}px)`,
        top: `calc(50% + ${position.y + positionOffset.y}px)`,
        ...baseStyle,
      },
    };
  })();

  // Named condition for better readability
  const isInteracting = isResizing || isDragging;
  const interactionClasses = isInteracting ? "select-none" : "";

  return (
    <div className={windowConfig.containerClasses}>
      <div
        ref={windowRef}
        className={`${windowConfig.windowClasses} ${interactionClasses} ${className}`}
        style={windowConfig.windowStyle}
      >
        <WindowHeader
          title={title}
          isFullscreen={isFullscreen}
          onClose={onClose}
          onMinimize={onMinimize}
          onToggleFullscreen={handleToggleFullscreen}
          onDragStart={isDraggable ? dragHandlers.onMouseDown : undefined}
        />

        {/* Window Content */}
        <div
          className={`flex-1 flex flex-col overflow-hidden ${contentClassName}`}
          style={contentStyle}
        >
          {children}
        </div>

        {/* Resize handles - only show when not in fullscreen and resizable */}
        {!isFullscreen && isResizable && (
          <ResizeHandles onMouseDown={resizeHandlers.onMouseDown} />
        )}
      </div>
    </div>
  );
}
