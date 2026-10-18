"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

interface ResizableProblemLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function ResizableProblemLayout({ left, right }: ResizableProblemLayoutProps) {
  return (
    <PanelGroup
      direction="horizontal"
      id="problem-layout"
      style={{ height: "100%", display: "flex" }}
    >
      <Panel id="left-panel" defaultSize={45} minSize={25} maxSize={70}>
        <div style={{ height: "100%", overflow: "hidden", display: "flex", flexDirection: "column", borderRight: "1px solid rgb(39 39 42)" }}>
          {left}
        </div>
      </Panel>
      <PanelResizeHandle
        id="resize-handle"
        hitAreaMargins={{ coarse: 20, fine: 8 }}
        style={{ width: "4px", flexShrink: 0, cursor: "col-resize", background: "rgb(63 63 70)", position: "relative" }}
        className="hover:bg-indigo-500 data-[resize-handle-active]:bg-indigo-500 transition-colors"
      />
      <Panel id="right-panel" defaultSize={55} minSize={30}>
        <div style={{ height: "100%", overflow: "hidden", display: "flex", flexDirection: "column" }}>
          {right}
        </div>
      </Panel>
    </PanelGroup>
  );
}
