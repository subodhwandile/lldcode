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
      <div style={{ width: `${leftPct}%`, minWidth: 0, overflow: "hidden", display: "flex", flexDirection: "column", borderRight: "1px solid rgb(39 39 42)" }}>
        {left}
      </div>

      {/* Drag handle */}
      <div
        onMouseDown={onMouseDown}
        style={{ width: "5px", flexShrink: 0, cursor: "col-resize", background: "rgb(39 39 42)", zIndex: 10 }}
        className="hover:bg-indigo-500 active:bg-indigo-500 transition-colors"
      />

      {/* Right panel */}
      <div style={{ flex: 1, minWidth: 0, overflow: "hidden", display: "flex", flexDirection: "column" }}>
        {right}
      </div>
    </div>
  );
}
