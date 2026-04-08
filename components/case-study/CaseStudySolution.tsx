import { CaseStudyData } from "@/types/case-study";

export default function CaseStudySolution({ data }: { data: CaseStudyData }) {
  return (
    <div className="cs-slide">
      <div className="cs-inner">
        <div className="cs-label">The Solution</div>
        <h2 className="cs-h2" style={{ marginBottom: "32px" }}>What we built</h2>
        <div style={{ display: "flex", flexDirection: "column" as const, gap: "16px" }}>
          {data.solutions.map((s, i) => (
            <div key={i} style={{ display: "flex", gap: "20px", alignItems: "flex-start" }}>
              <div style={{
                minWidth: "36px", height: "36px",
                borderRadius: "50%",
                background: "#0a2018",
                border: "1.5px solid #4ade80",
                display: "flex", alignItems: "center", justifyContent: "center",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "11px", fontWeight: 700, color: "#4ade80"
              }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div className="cs-card" style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: "15px", color: "#e5e7eb", marginBottom: "6px" }}>{s.title}</div>
                <div style={{ fontSize: "13px", color: "#a3a3a3", lineHeight: 1.6 }}>{s.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
