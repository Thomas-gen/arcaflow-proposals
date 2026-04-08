import { CaseStudyData } from "@/types/case-study";

export default function CaseStudyProblems({ data }: { data: CaseStudyData }) {
  return (
    <div className="cs-slide">
      <div className="cs-inner">
        <div className="cs-label">The Problem</div>
        <h2 className="cs-h2" style={{ marginBottom: "32px" }}>
          What wasn&apos;t working
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: data.problems.length > 2 ? "1fr 1fr" : "1fr", gap: "16px" }}>
          {data.problems.map((p, i) => (
            <div key={i} className="cs-card cs-card-red">
              <div style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "10px", color: "#e51551", letterSpacing: "2px", marginBottom: "8px", textTransform: "uppercase" as const }}>
                {String(i + 1).padStart(2, "0")}
              </div>
              <div style={{ fontWeight: 700, fontSize: "15px", color: "#e5e7eb", marginBottom: "8px" }}>{p.area}</div>
              <div style={{ fontSize: "13px", color: "#a3a3a3", lineHeight: 1.6 }}>{p.impact}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
