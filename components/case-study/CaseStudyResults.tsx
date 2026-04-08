import { CaseStudyData } from "@/types/case-study";

export default function CaseStudyResults({ data }: { data: CaseStudyData }) {
  return (
    <div className="cs-slide">
      <div className="cs-inner">
        <div className="cs-label">Results</div>
        <h2 className="cs-h2" style={{ marginBottom: "32px" }}>The outcome</h2>
        <div style={{
          display: "grid",
          gridTemplateColumns: `repeat(${Math.min(data.results.length, 3)}, 1fr)`,
          gap: "20px"
        }}>
          {data.results.map((r, i) => (
            <div key={i} style={{
              background: r.positive ? "#0a2018" : "#2a0a14",
              border: `1.5px solid ${r.positive ? "#4ade80" : "#e51551"}`,
              borderRadius: "14px",
              padding: "28px 24px",
              textAlign: "center" as const,
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "clamp(28px, 4vw, 44px)",
                fontWeight: 900,
                color: r.positive ? "#4ade80" : "#e51551",
                lineHeight: 1,
                marginBottom: "10px"
              }}>
                {r.metric}
              </div>
              <div style={{ fontSize: "13px", color: "#a3a3a3", lineHeight: 1.5 }}>
                {r.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
