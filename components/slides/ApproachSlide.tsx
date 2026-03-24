import { ProposalData } from "@/types/proposal";

interface Props {
  data: ProposalData;
}

export default function ApproachSlide({ data }: Props) {
  const a = data.approach!;
  const heading = data.language === "it" ? "Il Nostro Approccio" : "Our Approach";
  const frameLabel = data.language === "it" ? "STRATEGIA" : "STRATEGY";
  const overviewLabel = data.language === "it" ? "PANORAMICA" : "OVERVIEW";

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center px-6 md:px-16 py-16 overflow-y-auto"
      style={{ zIndex: 1, position: "relative" }}
    >
      <div className="w-full max-w-3xl">
        <span className="frame-label">{frameLabel}</span>
        <h2
          style={{
            fontSize: "clamp(22px, 2.5vw, 32px)",
            fontWeight: 800,
            color: "#1a1a2e",
            marginBottom: "24px",
            letterSpacing: "-0.01em",
          }}
        >
          {heading}
        </h2>

        {/* Body text in miro frame — only shown if body is non-empty */}
        {a.body && (
          <div className="miro-frame" style={{ marginBottom: "24px" }}>
            <div className="miro-frame-title">{overviewLabel}</div>
            <p
              style={{
                fontSize: "14px",
                color: "#444",
                lineHeight: 1.75,
                whiteSpace: "pre-line",
              }}
            >
              {a.body}
            </p>
          </div>
        )}

        {/* Channel / strategy points */}
        {a.points && a.points.length > 0 && (
          <div className="g2">
            {a.points.map((p, i) => (
              <div
                key={i}
                className="flow-step"
                style={{ textAlign: "left", padding: "32px 28px" }}
              >
                <div className="step-num">{i + 1}</div>
                <div
                  style={{
                    fontSize: "17px",
                    fontWeight: 700,
                    color: "#1a1a2e",
                    marginTop: "14px",
                    marginBottom: "10px",
                  }}
                >
                  {p.label}
                </div>
                <div style={{ fontSize: "14px", color: "#555", lineHeight: 1.6 }}>
                  {p.description}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
