import { useState, useCallback, useRef, useEffect } from "react";

interface Position {
  x: number;
  y: number;
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
}

export function useDrag({
  initialPosition = { x: 0, y: 0 },
  onDrag,
  disabled = false,
}: UseDragOptions = {}): UseDragReturn {
  const [position, setPosition] = useState<Position>(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<{
    startPosition: Position;
    startMousePosition: Position;
  } | null>(null);

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (!dragRef.current || disabled) return;

      const { startPosition, startMousePosition } = dragRef.current;
      const deltaX = e.clientX - startMousePosition.x;
      const deltaY = e.clientY - startMousePosition.y;

      const newPosition = {
        x: startPosition.x + deltaX,
        y: startPosition.y + deltaY,
      };

      setPosition(newPosition);
      onDrag?.(newPosition);
    },
    [onDrag, disabled]
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
