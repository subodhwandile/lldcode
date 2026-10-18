"use client";

import { useState, useCallback, useRef } from "react";

interface ResizableProblemLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function ResizableProblemLayout({ left, right }: ResizableProblemLayoutProps) {
  const [leftPct, setLeftPct] = useState(45);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);

    const onMove = (ev: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((ev.clientX - rect.left) / rect.width) * 100;
      setLeftPct(Math.min(70, Math.max(25, pct)));
    };

    const onUp = () => {
      setIsDragging(false);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        display: "flex",
        height: "100%",
        overflow: "hidden",
        cursor: isDragging ? "col-resize" : undefined,
        userSelect: isDragging ? "none" : undefined,
      }}
    >
      {/* Left panel */}
      <div style={{ width: `${leftPct}%`, minWidth: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {left}
      </div>

      {/* Drag handle */}
      <div
        onMouseDown={onMouseDown}
        style={{
          width: "16px",
          flexShrink: 0,
          cursor: "col-resize",
          position: "relative",
          zIndex: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
        className="group bg-transparent hover:bg-indigo-500/10"
      >
        {/* Visual line */}
        <div
          style={{ width: "2px", height: "100%", pointerEvents: "none" }}
          className={`transition-colors ${isDragging ? "bg-indigo-500" : "bg-zinc-700 group-hover:bg-indigo-500"}`}
        />
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, minWidth: 0, overflow: "hidden", display: "flex", flexDirection: "column", position: "relative" }}>
        {right}
        {/* Overlay to block Monaco iframe from stealing pointer events while dragging */}
        {isDragging && (
          <div style={{ position: "absolute", inset: 0, zIndex: 10, cursor: "col-resize" }} />
        )}
      </div>
    </div>
  );
}
