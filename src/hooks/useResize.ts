import { useState, useCallback, useRef, useEffect } from "react";

interface Size {
  width: number;
  height: number;
}

interface Position {
  x: number;
  y: number;
}

interface UseResizeReturn {
  size: Size;
  isResizing: boolean;
  positionOffset: Position;
  resizeHandlers: {
    onMouseDown: (direction: ResizeDirection) => (e: React.MouseEvent) => void;
  };
}

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

interface UseResizeOptions {
  initialSize: Size;
  minSize?: Size;
  maxSize?: Size;
  onResize?: (size: Size) => void;
}

const DEFAULT_MIN_SIZE = { width: 400, height: 300 };
const DEFAULT_MAX_SIZE = { width: 1200, height: 800 };

export function useResize({
  initialSize,
  minSize = DEFAULT_MIN_SIZE,
  maxSize = DEFAULT_MAX_SIZE,
  onResize,
}: UseResizeOptions): UseResizeReturn {
  const [size, setSize] = useState<Size>(initialSize);
  const [positionOffset, setPositionOffset] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [isResizing, setIsResizing] = useState(false);
  const resizeRef = useRef<{
    direction: ResizeDirection;
    startSize: Size;
    startPosition: Position;
    startOffset: Position;
  } | null>(null);

  const constrainSize = useCallback(
    (newSize: Size): Size => {
      return {
        width: Math.max(minSize.width, Math.min(maxSize.width, newSize.width)),
        height: Math.max(
          minSize.height,
          Math.min(maxSize.height, newSize.height)
        ),
      };
    },
    [minSize, maxSize]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!resizeRef.current) return;

      const { direction, startSize, startPosition, startOffset } =
        resizeRef.current;
      const deltaX = e.clientX - startPosition.x;
      const deltaY = e.clientY - startPosition.y;

      let newWidth = startSize.width;
      let newHeight = startSize.height;
      let newOffsetX = startOffset.x;
      let newOffsetY = startOffset.y;

      // Calculate new dimensions and position offsets based on resize direction
      if (direction.includes("e")) {
        newWidth = startSize.width + deltaX;
      }
      if (direction.includes("w")) {
        newWidth = startSize.width - deltaX;
        newOffsetX = startOffset.x + deltaX;
      }
      if (direction.includes("s")) {
        newHeight = startSize.height + deltaY;
      }
      if (direction.includes("n")) {
        newHeight = startSize.height - deltaY;
        newOffsetY = startOffset.y + deltaY;
      }

      const constrainedSize = constrainSize({
        width: newWidth,
        height: newHeight,
      });

      // Adjust position offset if size was constrained
      const widthDiff = newWidth - constrainedSize.width;
      const heightDiff = newHeight - constrainedSize.height;

      if (direction.includes("w") && widthDiff !== 0) {
        newOffsetX = startOffset.x + deltaX - widthDiff;
      }
      if (direction.includes("n") && heightDiff !== 0) {
        newOffsetY = startOffset.y + deltaY - heightDiff;
      }

      setSize(constrainedSize);
      setPositionOffset({ x: newOffsetX, y: newOffsetY });
      onResize?.(constrainedSize);
    },
    [constrainSize, onResize]
  );

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    resizeRef.current = null;
    document.body.style.cursor = "";
  }, []);

  useEffect(() => {
    if (isResizing) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isResizing, handleMouseMove, handleMouseUp]);

  const onMouseDown = useCallback(
    (direction: ResizeDirection) => (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();

      setIsResizing(true);
      resizeRef.current = {
        direction,
        startSize: size,
        startPosition: { x: e.clientX, y: e.clientY },
        startOffset: positionOffset,
      };

      // Set cursor based on direction
      const cursorMap: Record<ResizeDirection, string> = {
        n: "ns-resize",
        s: "ns-resize",
        e: "ew-resize",
        w: "ew-resize",
        ne: "nesw-resize",
        nw: "nwse-resize",
        se: "nwse-resize",
        sw: "nesw-resize",
      };

      document.body.style.cursor = cursorMap[direction];
    },
    [size, positionOffset]
  );

  return {
    size,
    isResizing,
    positionOffset,
    resizeHandlers: {
      onMouseDown,
    },
  };
}
