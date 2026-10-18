export default function ThemePreviewPage() {
  return (
    <div className="min-h-screen bg-zinc-950 py-12 px-6">
      <h1 className="text-center text-white text-2xl font-bold mb-2">Theme Previews</h1>
      <p className="text-center text-zinc-500 text-sm mb-12">Click a theme to see the full preview</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">

        {/* 1. Blueprint */}
        <a href="/theme-preview/blueprint" className="group block">
          <div className="rounded-xl overflow-hidden border-2 border-zinc-700 group-hover:border-blue-500 transition-colors"
            style={{ background: "#0a0f1e", fontFamily: "monospace" }}>
            {/* Nav */}
            <div style={{ background: "#0d1526", borderBottom: "1px solid #1e3a5f", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "#4a9eff", fontWeight: "bold", fontSize: "13px", letterSpacing: "2px" }}>LLDCODE</span>
              <div style={{ display: "flex", gap: "16px" }}>
                <span style={{ color: "#4a9eff", fontSize: "11px" }}>PROBLEMS</span>
                <span style={{ color: "#2a4a6f", fontSize: "11px" }}>PATTERNS</span>
              </div>
            </div>
            {/* Grid overlay */}
            <div style={{ padding: "16px", backgroundImage: "radial-gradient(circle, #1e3a5f 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
              <div style={{ color: "#2a5a9f", fontSize: "10px", letterSpacing: "3px", marginBottom: "12px" }}>PROBLEMS — 49 TOTAL</div>
              {[
                { n: 1, t: "Design a Parking Lot", d: "Medium", tags: ["Singleton", "Factory"] },
                { n: 2, t: "Design a Movie Ticket Booking System", d: "Medium", tags: ["Observer"] },
                { n: 3, t: "Design a Vending Machine", d: "Medium", tags: ["State"] },
                { n: 4, t: "Design an Elevator System", d: "Hard", tags: ["State", "Strategy"] },
              ].map((p) => (
                <div key={p.n} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 10px", borderBottom: "1px solid #0d2040", background: "rgba(10,20,50,0.6)" }}>
                  <span style={{ color: "#1e3a5f", fontSize: "10px", width: "16px" }}>{p.n}</span>
                  <span style={{ color: "#7ab8ff", fontSize: "11px", flex: 1 }}>{p.t}</span>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {p.tags.map(t => <span key={t} style={{ background: "#0d2040", border: "1px solid #1e3a5f", color: "#4a9eff", fontSize: "9px", padding: "1px 5px", borderRadius: "3px" }}>{t}</span>)}
                  </div>
                  <span style={{ fontSize: "9px", padding: "2px 6px", borderRadius: "3px", background: p.d === "Hard" ? "#1a0a2e" : "#0a1a2e", color: p.d === "Hard" ? "#a855f7" : "#4a9eff", border: `1px solid ${p.d === "Hard" ? "#4a1a6e" : "#1e3a5f"}` }}>{p.d}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-zinc-400 text-sm mt-3 group-hover:text-white transition-colors">① Engineering Blueprint</p>
        </a>

        {/* 2. Paper / Editorial */}
        <a href="/theme-preview/paper" className="group block">
          <div className="rounded-xl overflow-hidden border-2 border-zinc-700 group-hover:border-amber-600 transition-colors"
            style={{ background: "#faf8f3", fontFamily: "'Georgia', serif" }}>
            <div style={{ background: "#f5f0e8", borderBottom: "1px solid #d4c9b0", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "#2c1810", fontWeight: "bold", fontSize: "14px", fontFamily: "Georgia" }}>LLDCode</span>
              <div style={{ display: "flex", gap: "16px" }}>
                <span style={{ color: "#2c1810", fontSize: "12px", borderBottom: "1px solid #2c1810" }}>Problems</span>
                <span style={{ color: "#8b7355", fontSize: "12px" }}>Patterns</span>
              </div>
            </div>
            <div style={{ padding: "16px" }}>
              <div style={{ color: "#8b7355", fontSize: "10px", letterSpacing: "2px", textTransform: "uppercase", marginBottom: "12px", fontFamily: "monospace" }}>49 Problems</div>
              {[
                { n: 1, t: "Design a Parking Lot", d: "Medium", tags: ["Singleton", "Factory"] },
                { n: 2, t: "Design a Movie Ticket Booking System", d: "Medium", tags: ["Observer"] },
                { n: 3, t: "Design a Vending Machine", d: "Medium", tags: ["State"] },
                { n: 4, t: "Design an Elevator System", d: "Hard", tags: ["State", "Strategy"] },
              ].map((p) => (
                <div key={p.n} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "8px 0", borderBottom: "1px solid #e8e0d0" }}>
                  <span style={{ color: "#c4b89a", fontSize: "11px", width: "16px", fontFamily: "monospace" }}>{p.n}</span>
                  <span style={{ color: "#2c1810", fontSize: "12px", flex: 1, fontFamily: "Georgia" }}>{p.t}</span>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {p.tags.map(t => <span key={t} style={{ background: "#f0e8d8", border: "1px solid #d4c9b0", color: "#6b5040", fontSize: "9px", padding: "1px 5px", borderRadius: "2px", fontFamily: "monospace" }}>{t}</span>)}
                  </div>
                  <span style={{ fontSize: "10px", padding: "2px 6px", borderRadius: "2px", background: p.d === "Hard" ? "#fde8e8" : "#e8f5e8", color: p.d === "Hard" ? "#c0392b" : "#27ae60", fontFamily: "monospace" }}>{p.d}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-zinc-400 text-sm mt-3 group-hover:text-white transition-colors">② Minimal Paper / Editorial</p>
        </a>

        {/* 3. Retro Terminal */}
        <a href="/theme-preview/terminal" className="group block">
          <div className="rounded-xl overflow-hidden border-2 border-zinc-700 group-hover:border-amber-400 transition-colors"
            style={{ background: "#0d0d00", fontFamily: "'Courier New', monospace" }}>
            <div style={{ background: "#111100", borderBottom: "1px solid #3a3000", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "#ffb347", fontWeight: "bold", fontSize: "13px" }}>[ LLDCODE v1.0 ]</span>
              <span style={{ color: "#665500", fontSize: "11px" }}>● ● ●</span>
            </div>
            <div style={{ padding: "16px", background: "repeating-linear-gradient(0deg, transparent, transparent 19px, rgba(255,179,71,0.03) 19px, rgba(255,179,71,0.03) 20px)" }}>
              <div style={{ color: "#665500", fontSize: "10px", marginBottom: "8px" }}>$ list-problems --count=49</div>
              <div style={{ color: "#ffb347", fontSize: "10px", marginBottom: "10px" }}>{">"} Loaded 49 problems. Ready.<br/>{">"} Type to filter...</div>
              {[
                { n: "01", t: "Design a Parking Lot", d: "MED", tags: ["Singleton"] },
                { n: "02", t: "Design Movie Ticket Booking", d: "MED", tags: ["Observer"] },
                { n: "03", t: "Design a Vending Machine", d: "MED", tags: ["State"] },
                { n: "04", t: "Design an Elevator System", d: "HRD", tags: ["State"] },
              ].map((p) => (
                <div key={p.n} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "5px 0", borderBottom: "1px solid #1a1500" }}>
                  <span style={{ color: "#3a3000", fontSize: "10px" }}>[{p.n}]</span>
                  <span style={{ color: "#ffb347", fontSize: "11px", flex: 1 }}>{p.t}</span>
                  <span style={{ color: "#665500", fontSize: "10px" }}>{p.tags[0]}</span>
                  <span style={{ color: p.d === "HRD" ? "#ff6b35" : "#ffb347", fontSize: "10px" }}>[{p.d}]</span>
                </div>
              ))}
              <div style={{ color: "#665500", fontSize: "10px", marginTop: "8px" }}>$ <span style={{ borderRight: "1px solid #ffb347", animation: "blink 1s step-end infinite" }}>&nbsp;</span></div>
            </div>
          </div>
          <p className="text-center text-zinc-400 text-sm mt-3 group-hover:text-white transition-colors">③ Retro Terminal (Amber)</p>
        </a>

        {/* 4. Graph Paper Notebook */}
        <a href="/theme-preview/notebook" className="group block">
          <div className="rounded-xl overflow-hidden border-2 border-zinc-700 group-hover:border-indigo-400 transition-colors"
            style={{ background: "#f8f9ff", fontFamily: "'Courier New', monospace" }}>
            <div style={{ background: "#f0f2ff", borderBottom: "2px solid #c8d0f0", padding: "10px 16px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <span style={{ color: "#2d3a8c", fontWeight: "bold", fontSize: "13px", letterSpacing: "1px" }}>LLDCode</span>
              <div style={{ display: "flex", gap: "16px" }}>
                <span style={{ color: "#2d3a8c", fontSize: "11px", borderBottom: "2px solid #2d3a8c", paddingBottom: "1px" }}>Problems</span>
                <span style={{ color: "#8890c0", fontSize: "11px" }}>Patterns</span>
              </div>
            </div>
            <div style={{ padding: "16px", backgroundImage: "linear-gradient(#dde0f5 1px, transparent 1px), linear-gradient(90deg, #dde0f5 1px, transparent 1px)", backgroundSize: "20px 20px" }}>
              <div style={{ color: "#8890c0", fontSize: "10px", marginBottom: "12px", letterSpacing: "1px" }}>// 49 problems</div>
              {[
                { n: 1, t: "Design a Parking Lot", d: "Medium", tags: ["Singleton", "Factory"] },
                { n: 2, t: "Design a Movie Ticket Booking System", d: "Medium", tags: ["Observer"] },
                { n: 3, t: "Design a Vending Machine", d: "Medium", tags: ["State"] },
                { n: 4, t: "Design an Elevator System", d: "Hard", tags: ["State", "Strategy"] },
              ].map((p) => (
                <div key={p.n} style={{ display: "flex", alignItems: "center", gap: "10px", padding: "7px 8px", marginBottom: "2px", background: "rgba(255,255,255,0.7)", border: "1px solid #c8d0f0", borderRadius: "4px" }}>
                  <span style={{ color: "#b0b8e0", fontSize: "10px", width: "16px" }}>{p.n}.</span>
                  <span style={{ color: "#1a2260", fontSize: "11px", flex: 1 }}>{p.t}</span>
                  <div style={{ display: "flex", gap: "4px" }}>
                    {p.tags.map(t => <span key={t} style={{ background: "#e8ebff", border: "1px solid #c8d0f0", color: "#4a52a0", fontSize: "9px", padding: "1px 5px", borderRadius: "3px" }}>{t}</span>)}
                  </div>
                  <span style={{ fontSize: "9px", padding: "2px 6px", borderRadius: "3px", background: p.d === "Hard" ? "#fff0f0" : "#f0fff4", color: p.d === "Hard" ? "#c0392b" : "#27ae60", border: `1px solid ${p.d === "Hard" ? "#fcc" : "#bef"}` }}>{p.d}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="text-center text-zinc-400 text-sm mt-3 group-hover:text-white transition-colors">④ Graph Paper Notebook</p>
        </a>

      </div>
    </div>
  );
}
