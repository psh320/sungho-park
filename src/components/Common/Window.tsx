import { ReactNode, useRef, useEffect, useCallback } from "react";
import { useFullscreen } from "../../hooks/useFullscreen";
import { useResize } from "../../hooks/useResize";
import { useDrag } from "../../hooks/useDrag";
import { WindowHeader } from "./WindowHeader";
import { ResizeHandles } from "../Home/Terminal/ResizeHandles";
import {
  WindowConfigFactory,
  calculateInitialPosition,
  WINDOW_CONSTANTS,
} from "./WindowConfig";

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
// Window size and position types (Standardizing Return Types)
interface WindowSize {
  width: number;
  height: number;
}

interface WindowHooksResult {
  size: WindowSize;
  position: { x: number; y: number };
  positionOffset: { x: number; y: number };
  isResizing: boolean;
  isDragging: boolean;
  isFullscreen: boolean;
  resizeHandlers: {
    onMouseDown: (direction: any) => (e: React.MouseEvent) => void;
  };
  dragHandlers: { onMouseDown: (e: React.MouseEvent) => void };
  handleToggleFullscreen: () => void;
}

/**
 * Custom hook to manage window behavior - Scoping State Management
 * Reduces coupling by grouping related window state
 */
function useWindowHooks({
  initialSize,
  minSize,
  maxSize,
  isDraggable,
  shouldToggleFullscreen,
  onFullscreenChange,
}: {
  initialSize: WindowSize;
  minSize: WindowSize;
  maxSize: WindowSize;
  isDraggable: boolean;
  shouldToggleFullscreen?: boolean;
  onFullscreenChange?: (isFullscreen: boolean) => void;
}): WindowHooksResult {
  const { isFullscreen, toggleFullscreen } = useFullscreen();

  // Handle fullscreen changes and notify parent (Revealing Hidden Logic)
  const handleToggleFullscreen = useCallback(() => {
    toggleFullscreen();
    onFullscreenChange?.(!isFullscreen);
  }, [toggleFullscreen, onFullscreenChange, isFullscreen]);

  // Handle programmatic fullscreen toggle requests
  useEffect(() => {
    if (shouldToggleFullscreen) {
      handleToggleFullscreen();
    }
  }, [shouldToggleFullscreen, handleToggleFullscreen]);

  const { size, isResizing, positionOffset, resizeHandlers } = useResize({
    initialSize,
    minSize,
    maxSize,
  });

  // Calculate initial position using helper (Relating Magic Numbers to Logic)
  const initialCenteredPosition = calculateInitialPosition(initialSize);

  const { position, isDragging, dragHandlers } = useDrag({
    initialPosition: initialCenteredPosition,
    disabled: isFullscreen || !isDraggable,
  });

  return {
    size,
    position,
    positionOffset,
    isResizing,
    isDragging,
    isFullscreen,
    resizeHandlers,
    dragHandlers,
    handleToggleFullscreen,
  };
}

export default function Window({
  isVisible,
  isMinimized,
  title,
  children,
  onClose,
  onMinimize,
  onFullscreenChange,
  shouldToggleFullscreen = false,
  initialSize = WINDOW_CONSTANTS.DEFAULT_SIZE,
  minSize = WINDOW_CONSTANTS.DEFAULT_MIN_SIZE,
  maxSize = WINDOW_CONSTANTS.DEFAULT_MAX_SIZE,
  isDraggable = true,
  isResizable = true,
  className = "",
  contentStyle = {},
  contentClassName = "",
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);

  const windowHooks = useWindowHooks({
    initialSize,
    minSize,
    maxSize,
    isDraggable,
    shouldToggleFullscreen,
    onFullscreenChange,
  });

  if (!isVisible) return null;

  // Get window configuration using factory (Standardizing Return Types)
  const windowConfig = windowHooks.isFullscreen
    ? WindowConfigFactory.createFullscreenConfig(isMinimized)
    : WindowConfigFactory.createWindowedConfig(
        isMinimized,
        windowHooks.size,
        windowHooks.position,
        windowHooks.positionOffset
      );

  // Named condition for better readability
  const isInteracting = windowHooks.isResizing || windowHooks.isDragging;
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
          isFullscreen={windowHooks.isFullscreen}
          onClose={onClose}
          onMinimize={onMinimize}
          onToggleFullscreen={windowHooks.handleToggleFullscreen}
          onDragStart={
            isDraggable ? windowHooks.dragHandlers.onMouseDown : undefined
          }
        />

        <WindowContent
          contentClassName={contentClassName}
          contentStyle={contentStyle}
        >
          {children}
        </WindowContent>

        <WindowResizeHandles
          isFullscreen={windowHooks.isFullscreen}
          isResizable={isResizable}
          onMouseDown={windowHooks.resizeHandlers.onMouseDown}
        />
      </div>
    </div>
  );
}

/**
 * Window content component - Single Responsibility for content area
 * Abstracting Implementation Details - Separates content styling from window logic
 */
function WindowContent({
  children,
  contentClassName,
  contentStyle,
}: {
  children: ReactNode;
  contentClassName: string;
  contentStyle: React.CSSProperties;
}) {
  return (
    <div
      className={`flex-1 flex flex-col overflow-hidden ${contentClassName}`}
      style={contentStyle}
    >
      {children}
    </div>
  );
}

/**
 * Window resize handles component - Separating Code Paths for resize functionality
 * Single Responsibility - Handles only resize handle rendering
 */
function WindowResizeHandles({
  isFullscreen,
  isResizable,
  onMouseDown,
}: {
  isFullscreen: boolean;
  isResizable: boolean;
  onMouseDown: (direction: any) => (e: React.MouseEvent) => void;
}) {
  // Named condition for better readability
  const shouldShowResizeHandles = !isFullscreen && isResizable;

  if (!shouldShowResizeHandles) return null;

  return <ResizeHandles onMouseDown={onMouseDown} />;
}
