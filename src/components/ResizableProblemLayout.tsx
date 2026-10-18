"use client";

import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

interface ResizableProblemLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function ResizableProblemLayout({ left, right }: ResizableProblemLayoutProps) {
  return (
    <PanelGroup direction="horizontal" className="h-full">
      <Panel defaultSize={45} minSize={30} maxSize={65}>
        <div className="h-full overflow-hidden flex flex-col border-r border-zinc-800">
          {left}
        </div>
      </Panel>
      <PanelResizeHandle className="w-1.5 bg-zinc-800 hover:bg-indigo-500/60 active:bg-indigo-500 transition-colors cursor-col-resize flex items-center justify-center group">
        <div className="w-0.5 h-8 bg-zinc-600 group-hover:bg-indigo-400 rounded-full transition-colors" />
      </PanelResizeHandle>
      <Panel defaultSize={55} minSize={35}>
        <div className="h-full overflow-hidden flex flex-col">
          {right}
        </div>
      </Panel>
    </PanelGroup>
  );
}
