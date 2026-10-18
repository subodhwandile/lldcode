"use client";

import { useState, useCallback, useRef } from "react";

interface ResizableProblemLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function ResizableProblemLayout({ left, right }: ResizableProblemLayoutProps) {
  const [leftPct, setLeftPct] = useState(45);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    dragging.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";

    const onMove = (ev: MouseEvent) => {
      if (!dragging.current || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const pct = ((ev.clientX - rect.left) / rect.width) * 100;
      setLeftPct(Math.min(70, Math.max(25, pct)));
    };

    const onUp = () => {
      dragging.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
  }, []);

  return (
    <div ref={containerRef} style={{ display: "flex", height: "100%", overflow: "hidden" }}>
      {/* Left panel */}
      <div style={{ width: `${leftPct}%`, minWidth: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {left}
      </div>

      {/* Drag handle — wide hit area with visible center line */}
      <div
        onMouseDown={onMouseDown}
        style={{ width: "12px", flexShrink: 0, cursor: "col-resize", position: "relative", zIndex: 10, display: "flex", alignItems: "center", justifyContent: "center" }}
        className="group bg-transparent hover:bg-indigo-500/20"
      >
        <div
          style={{ width: "2px", height: "100%", background: "rgb(63 63 70)", pointerEvents: "none" }}
          className="group-hover:bg-indigo-500 transition-colors"
        />
      </div>

      {/* Right panel */}
      <div style={{ flex: 1, minWidth: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {right}
      </div>
    </div>
  );
}
