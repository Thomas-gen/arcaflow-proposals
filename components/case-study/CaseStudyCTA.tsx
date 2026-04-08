import { CaseStudyData } from "@/types/case-study";

export default function CaseStudyCTA({ data }: { data: CaseStudyData }) {
  const label = data.cta_label || "Book a Call";
  const url = data.cta_url || "https://cal.com/thomas-filippa";

  return (
    <div className="cs-slide">
      <div className="cs-inner" style={{ textAlign: "center" as const, maxWidth: "640px", margin: "0 auto" }}>
        <div className="cs-label">Ready to do the same?</div>
        <h2 className="cs-h2" style={{ marginBottom: "16px" }}>Let&apos;s build yours</h2>
        <p style={{ fontSize: "14px", color: "#a3a3a3", marginBottom: "40px", lineHeight: 1.7 }}>
          This is what we do at Arcaflow AI — build systems that work while you sleep. If the results above are relevant to your business, let&apos;s talk.
        </p>
        <a href={url} target="_blank" rel="noopener noreferrer" style={{
          display: "inline-block",
          background: "#e51551",
          color: "#fff",
          fontWeight: 700,
          fontSize: "15px",
          padding: "16px 40px",
          borderRadius: "10px",
          textDecoration: "none",
          letterSpacing: "0.02em",
          transition: "opacity 0.2s"
        }}>
          {label}
        </a>
        <div style={{ marginTop: "32px", fontSize: "12px", color: "#555", fontFamily: "'JetBrains Mono', monospace" }}>
          thomas@arcaflow.ai · arcaflow.ai
        </div>
      </div>
    </div>
  );
}
