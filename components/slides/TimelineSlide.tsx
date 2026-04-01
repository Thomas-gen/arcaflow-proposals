import { ProposalData } from "@/types/proposal";

interface Props {
  data: ProposalData;
}

const PHASE_COLORS = [
  { bg: "#e8f5e9", border: "#2d6a4f", numBg: "#2d6a4f", accent: "#2d6a4f" },
  { bg: "#e3f2fd", border: "#4a6fa5", numBg: "#4a6fa5", accent: "#4a6fa5" },
  { bg: "#fff3e0", border: "#c07a2a", numBg: "#c07a2a", accent: "#c07a2a" },
  { bg: "#f3e5f5", border: "#7b4fa0", numBg: "#7b4fa0", accent: "#7b4fa0" },
];

export default function TimelineSlide({ data }: Props) {
  const heading = data.language === "it" ? "Tempistiche" : "Timeline";
  const frameLabel = data.language === "it" ? "PIANO DI LAVORO" : "WORK PLAN";

  const total = data.timeline[data.timeline.length - 1];
  const phases = data.timeline.slice(0, -1);

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center px-6 md:px-16 py-12"
      style={{ zIndex: 1, position: "relative" }}
    >
      <div className="w-full max-w-4xl">
        <span className="frame-label">{frameLabel}</span>
        <h2
          style={{
            fontSize: "clamp(26px, 3vw, 38px)",
            fontWeight: 800,
            color: "#1a1a2e",
            marginBottom: "32px",
            letterSpacing: "-0.01em",
          }}
        >
          {heading}
        </h2>

        {/* Phase cards — big, side by side */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${Math.min(phases.length, 3)}, 1fr)`,
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          {phases.map((phase, i) => {
            const color = PHASE_COLORS[i % PHASE_COLORS.length];
            return (
              <div
                key={i}
                style={{
                  background: color.bg,
                  border: `2px solid ${color.border}`,
                  borderRadius: "14px",
                  padding: "28px 26px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Big background number */}
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "16px",
                    fontSize: "100px",
                    fontWeight: 900,
                    color: color.border,
                    opacity: 0.07,
                    lineHeight: 1,
                    fontFamily: "'JetBrains Mono', monospace",
                    userSelect: "none",
                  }}
                >
                  {i + 1}
                </div>

                {/* Step badge */}
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    background: color.numBg,
                    color: "#fff",
                    fontSize: "14px",
                    fontWeight: 800,
                    marginBottom: "16px",
                  }}
                >
                  {i + 1}
                </div>

                {/* Title */}
                <div
                  style={{
                    fontSize: "17px",
                    fontWeight: 800,
                    color: "#1a1a2e",
                    marginBottom: "10px",
                    lineHeight: "1.3",
                  }}
                >
                  {phase.phase}
                </div>

                {/* Description */}
                {phase.description && (
                  <div
                    style={{
                      fontSize: "13px",
                      color: "#555",
                      lineHeight: "1.6",
                      marginBottom: "16px",
                    }}
                  >
                    {phase.description}
                  </div>
                )}

                {/* Duration badge */}
                <div
                  style={{
                    display: "inline-block",
                    background: color.numBg,
                    color: "#fff",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "12px",
                    fontWeight: 700,
                    padding: "5px 14px",
                    borderRadius: "20px",
                    marginTop: "auto",
                  }}
                >
                  {phase.duration}
                </div>
              </div>
            );
          })}
        </div>

        {/* Total box */}
        {total && (
          <div className="roi-box">
            <div className="roi-num">{total.duration}</div>
            <div className="roi-label">{total.phase.toUpperCase()}</div>
          </div>
        )}
      </div>
    </div>
  );
}
