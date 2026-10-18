"use client";

import { useEffect, useState } from "react";

interface DayActivity {
  date: string;
  total: number;
  accepted: number;
}

function getLast365Days(): string[] {
  const days: string[] = [];
  const today = new Date();
  for (let i = 364; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);
    days.push(d.toISOString().slice(0, 10));
  }
  return days;
}

function getIntensity(total: number): number {
  if (total === 0) return 0;
  if (total <= 1) return 1;
  if (total <= 3) return 2;
  if (total <= 6) return 3;
  return 4;
}

const intensityColors = [
  "bg-zinc-800",             // 0: no activity
  "bg-emerald-900",          // 1: 1 submission
  "bg-emerald-700",          // 2: 2-3 submissions
  "bg-emerald-500",          // 3: 4-6 submissions
  "bg-emerald-400",          // 4: 7+ submissions
];

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export function SubmissionHeatmap() {
  const [activity, setActivity] = useState<Record<string, DayActivity>>({});
  const [loading, setLoading] = useState(true);
  const [tooltip, setTooltip] = useState<{ date: string; total: number; x: number; y: number } | null>(null);

  useEffect(() => {
    fetch("/api/activity")
      .then((r) => r.json())
      .then((data) => {
        const map: Record<string, DayActivity> = {};
        for (const d of data.activity || []) map[d.date] = d;
        setActivity(map);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const days = getLast365Days();
  const totalSubmissions = Object.values(activity).reduce((s, d) => s + d.total, 0);
  const activeDays = Object.values(activity).filter((d) => d.total > 0).length;

  // Group days into weeks (columns) for the grid
  // Figure out offset so first day aligns with its weekday (Sun=0)
  const firstDay = new Date(days[0]);
  const startOffset = firstDay.getDay(); // 0=Sun
  const paddedDays: (string | null)[] = [
    ...Array(startOffset).fill(null),
    ...days,
  ];
  const weeks: (string | null)[][] = [];
  for (let i = 0; i < paddedDays.length; i += 7) {
    weeks.push(paddedDays.slice(i, i + 7));
  }

  // Month labels: find first occurrence of each month in weeks
  const monthLabels: { label: string; col: number }[] = [];
  weeks.forEach((week, col) => {
    for (const day of week) {
      if (!day) continue;
      const d = new Date(day);
      if (d.getDate() <= 7) {
        // Only add if not already shown for this month
        const existing = monthLabels.find((m) => m.label === MONTHS[d.getMonth()]);
        if (!existing) {
          monthLabels.push({ label: MONTHS[d.getMonth()], col });
        }
      }
    }
  });

  if (loading) {
    return (
      <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
        <div className="h-32 flex items-center justify-center">
          <p className="text-xs text-zinc-600">Loading activity...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-white">Submission Activity</h2>
        <div className="flex items-center gap-4 text-xs text-zinc-500">
          <span><span className="text-white font-medium">{totalSubmissions}</span> total submissions</span>
          <span><span className="text-white font-medium">{activeDays}</span> active days</span>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="relative" style={{ minWidth: `${weeks.length * 14}px` }}>
          {/* Month labels */}
          <div className="flex mb-1" style={{ paddingLeft: "20px" }}>
            {weeks.map((_, col) => {
              const label = monthLabels.find((m) => m.col === col);
              return (
                <div key={col} className="w-[14px] shrink-0">
                  {label && <span className="text-[9px] text-zinc-600 whitespace-nowrap">{label.label}</span>}
                </div>
              );
            })}
          </div>

          {/* Grid */}
          <div className="flex gap-0">
            {/* Weekday labels */}
            <div className="flex flex-col gap-[2px] mr-1 justify-start">
              {["", "M", "", "W", "", "F", ""].map((d, i) => (
                <div key={i} className="w-[12px] h-[10px] flex items-center justify-end">
                  <span className="text-[8px] text-zinc-700">{d}</span>
                </div>
              ))}
            </div>

            {/* Weeks */}
            <div className="flex gap-[2px]">
              {weeks.map((week, wi) => (
                <div key={wi} className="flex flex-col gap-[2px]">
                  {week.map((day, di) => {
                    if (!day) return <div key={di} className="w-[10px] h-[10px]" />;
                    const act = activity[day];
                    const intensity = getIntensity(act?.total || 0);
                    return (
                      <div
                        key={di}
                        className={`w-[10px] h-[10px] rounded-[2px] ${intensityColors[intensity]} cursor-pointer transition-opacity hover:opacity-80`}
                        onMouseEnter={(e) => {
                          const rect = e.currentTarget.getBoundingClientRect();
                          setTooltip({
                            date: day,
                            total: act?.total || 0,
                            x: rect.left,
                            y: rect.top,
                          });
                        }}
                        onMouseLeave={() => setTooltip(null)}
                      />
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center gap-2 mt-3 justify-end">
        <span className="text-[10px] text-zinc-600">Less</span>
        {intensityColors.map((c, i) => (
          <div key={i} className={`w-[10px] h-[10px] rounded-[2px] ${c}`} />
        ))}
        <span className="text-[10px] text-zinc-600">More</span>
      </div>

      {/* Tooltip */}
      {tooltip && (
        <div
          className="fixed z-50 bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-xs text-zinc-200 pointer-events-none shadow-xl"
          style={{ left: tooltip.x + 14, top: tooltip.y - 40 }}
        >
          <span className="font-medium">{tooltip.total} submission{tooltip.total !== 1 ? "s" : ""}</span>
          <span className="text-zinc-500 ml-1">on {tooltip.date}</span>
        </div>
      )}
    </div>
  );
}
