import { CaseStudyData } from "@/types/case-study";

export default function CaseStudyCover({ data }: { data: CaseStudyData }) {
  return (
    <div className="cs-slide">
      <div className="cs-inner">
        <div style={{ marginBottom: "16px", display: "flex", gap: "8px", flexWrap: "wrap" as const }}>
          <span className="cs-pill cs-pill-red">{data.industry}</span>
          <span className="cs-pill cs-pill-green">{data.service}</span>
        </div>
        <div className="cs-label" style={{ marginBottom: "12px" }}>Case Study</div>
        <h1 className="cs-h1">{data.company}</h1>
        <p className="cs-headline">{data.headline}</p>
        <div style={{ marginTop: "40px", display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "40px", height: "2px", background: "#e51551" }} />
          <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "11px", color: "#666", letterSpacing: "1px" }}>
            {data.client} · {new Date(data.date).getFullYear()}
          </span>
        </div>
      </div>
    </div>
  );
}
