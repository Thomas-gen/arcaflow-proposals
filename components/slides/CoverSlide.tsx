import { ProposalData } from "@/types/proposal";

interface Props {
  data: ProposalData;
}

export default function CoverSlide({ data }: Props) {
  const formatted = new Date(data.date).toLocaleDateString(
    data.language === "it" ? "it-IT" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  const propLabel =
    data.language === "it" ? "PROPOSTA DI IMPLEMENTAZIONE" : "IMPLEMENTATION PROPOSAL";
  const confidential =
    data.language === "it" ? "Riservato & Confidenziale" : "Private & Confidential";
  const dateLabel = data.language === "it" ? "DATA PROPOSTA" : "DATE";

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center px-8 relative"
      style={{ zIndex: 1 }}
    >
      <div className="w-full max-w-2xl text-center">
        {/* Frame label */}
        <span className="frame-label">{propLabel}</span>

        {/* Title */}
        <h1
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "clamp(32px, 4vw, 54px)",
            fontWeight: 800,
            color: "#1a1a2e",
            letterSpacing: "-0.02em",
            lineHeight: 1.1,
            marginBottom: "12px",
          }}
        >
          {data.company}
        </h1>

        {/* Client name (if different from company) */}
        {data.client !== data.company && (
          <p style={{ fontSize: "18px", color: "#888", marginBottom: "8px" }}>
            {data.client}
          </p>
        )}

        {/* Service */}
        <p
          style={{
            fontSize: "15px",
            color: "#555",
            marginBottom: "36px",
            lineHeight: 1.5,
            maxWidth: "480px",
            margin: "12px auto 36px",
          }}
        >
          {data.service}
        </p>

        {/* Pills row */}
        <div className="pills-row" style={{ justifyContent: "center" }}>
          <div className="pill hl">
            <div className="pill-val">Arcaflow AI</div>
            <div className="pill-lbl">PARTNER</div>
          </div>
          <div className="pill">
            <div
              className="pill-val"
              style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: "12px" }}
            >
              {formatted}
            </div>
            <div className="pill-lbl">{dateLabel}</div>
          </div>
        </div>

        {/* Confidential callout */}
        <div className="callout" style={{ maxWidth: "400px", margin: "24px auto 0" }}>
          <span className="callout-text">{confidential}</span>
        </div>
      </div>
    </div>
  );
}
