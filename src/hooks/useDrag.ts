import { useState, useCallback, useRef, useEffect } from "react";

interface Position {
  x: number;
  y: number;
}

interface WindowSize {
  width: number;
  height: number;
}

interface BoundaryConstraints {
  minX: number;
  maxX: number;
  minY: number;
  maxY: number;
}

interface UseDragReturn {
  position: Position;
  isDragging: boolean;
  dragHandlers: {
    onMouseDown: (e: React.MouseEvent) => void;
  };
}

interface UseDragOptions {
  initialPosition?: Position;
  onDrag?: (position: Position) => void;
  disabled?: boolean;
  windowSize?: WindowSize;
  boundaryConstraints?: BoundaryConstraints;
}

export function useDrag({
  initialPosition = { x: 0, y: 0 },
  onDrag,
  disabled = false,
  windowSize,
  boundaryConstraints,
}: UseDragOptions = {}): UseDragReturn {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{
    startPosition: Position;
    startMousePosition: Position;
  } | null>(null);

  // Boundary constraint function - Naming Magic Numbers with Logic
  const constrainToBoundaries = useCallback(
    (newPosition: Position): Position => {
      if (!boundaryConstraints || !windowSize) {
        return newPosition;
      }

      // Window positioning: left = calc(50% + position.x), top = calc(50% + position.y)
      // To keep the window fully visible:
      // - Left edge at x=0: position.x = -viewportWidth/2
      // - Right edge at x=viewportWidth: position.x = viewportWidth/2 - windowWidth
      // - Top edge at y=0: position.y = -viewportHeight/2
      // - Bottom edge at y=viewportHeight: position.y = viewportHeight/2 - windowHeight

      const minX = boundaryConstraints.minX; // Left edge at viewport left
      const maxX = boundaryConstraints.maxX - windowSize.width; // Right edge at viewport right
      const minY = boundaryConstraints.minY; // Top edge at viewport top
      const maxY = boundaryConstraints.maxY - windowSize.height; // Bottom edge at viewport bottom

      return {
        x: Math.max(minX, Math.min(maxX, newPosition.x)),
        y: Math.max(minY, Math.min(maxY, newPosition.y)),
      };
    },
    [boundaryConstraints, windowSize]
  );

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragRef.current || disabled) return;

      const { startPosition, startMousePosition } = dragRef.current;
      const deltaX = e.clientX - startMousePosition.x;
      const deltaY = e.clientY - startMousePosition.y;

      const unconstrained = {
        x: startPosition.x + deltaX,
        y: startPosition.y + deltaY,
      };

      // Apply boundary constraints before setting position
      const constrainedPosition = constrainToBoundaries(unconstrained);

      setPosition(constrainedPosition);
      onDrag?.(constrainedPosition);
    },
    [onDrag, disabled, constrainToBoundaries]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
    dragRef.current = null;
    document.body.style.cursor = "";
  }, []);

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;

      e.preventDefault();
      e.stopPropagation();

      setIsDragging(true);
      dragRef.current = {
        startPosition: position,
        startMousePosition: { x: e.clientX, y: e.clientY },
      };

      document.body.style.cursor = "move";
    },
    [position, disabled]
  );

  return {
    position,
    isDragging,
    dragHandlers: {
      onMouseDown,
    },
  };
}
