interface ResizeHandlesProps {
  onMouseDown: (direction: ResizeDirection) => (e: React.MouseEvent) => void;
}

type ResizeDirection = "n" | "s" | "e" | "w" | "ne" | "nw" | "se" | "sw";

export function ResizeHandles({ onMouseDown }: ResizeHandlesProps) {
  const handleStyle = "absolute bg-transparent";
  const cornerSize = "w-3 h-3";
  const edgeThickness = "4px";

  return (
    <>
      {/* Corner handles */}
      <div
        className={`${handleStyle} ${cornerSize} top-0 left-0 cursor-nw-resize`}
        onMouseDown={onMouseDown("nw")}
        style={{ top: "-6px", left: "-6px" }}
      />
      <div
        className={`${handleStyle} ${cornerSize} top-0 right-0 cursor-ne-resize`}
        onMouseDown={onMouseDown("ne")}
        style={{ top: "-6px", right: "-6px" }}
      />
      <div
        className={`${handleStyle} ${cornerSize} bottom-0 left-0 cursor-sw-resize`}
        onMouseDown={onMouseDown("sw")}
        style={{ bottom: "-6px", left: "-6px" }}
      />
      <div
        className={`${handleStyle} ${cornerSize} bottom-0 right-0 cursor-se-resize`}
        onMouseDown={onMouseDown("se")}
        style={{ bottom: "-6px", right: "-6px" }}
      />

      {/* Edge handles */}
      {/* Top edge */}
      <div
        className={`${handleStyle} left-3 right-3 cursor-ns-resize`}
        onMouseDown={onMouseDown("n")}
        style={{
          top: `-${edgeThickness}`,
          height: edgeThickness,
        }}
      />

      {/* Bottom edge */}
      <div
        className={`${handleStyle} left-3 right-3 cursor-ns-resize`}
        onMouseDown={onMouseDown("s")}
        style={{
          bottom: `-${edgeThickness}`,
          height: edgeThickness,
        }}
      />

      {/* Left edge */}
      <div
        className={`${handleStyle} top-3 bottom-3 cursor-ew-resize`}
        onMouseDown={onMouseDown("w")}
        style={{
          left: `-${edgeThickness}`,
          width: edgeThickness,
        }}
      />

      {/* Right edge */}
      <div
        className={`${handleStyle} top-3 bottom-3 cursor-ew-resize`}
        onMouseDown={onMouseDown("e")}
        style={{
          right: `-${edgeThickness}`,
          width: edgeThickness,
        }}
      />
    </>
  );
}
