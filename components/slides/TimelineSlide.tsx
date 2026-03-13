import { ProposalData } from "@/types/proposal";

interface Props {
  data: ProposalData;
}

export default function TimelineSlide({ data }: Props) {
  const heading = data.language === "it" ? "Tempistiche" : "Timeline";
  const frameLabel = data.language === "it" ? "PIANO DI LAVORO" : "WORK PLAN";

  const total = data.timeline[data.timeline.length - 1];
  const phases = data.timeline.slice(0, -1);

  const gridClass = phases.length <= 3 ? "g3" : "g4";

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center px-6 md:px-16 py-16"
      style={{ zIndex: 1, position: "relative" }}
    >
      <div className="w-full max-w-4xl">
        <span className="frame-label">{frameLabel}</span>
        <h2
          style={{
            fontSize: "clamp(22px, 2.5vw, 32px)",
            fontWeight: 800,
            color: "#1a1a2e",
            marginBottom: "28px",
            letterSpacing: "-0.01em",
          }}
        >
          {heading}
        </h2>

        {/* Phase cards */}
        <div className={gridClass} style={{ marginBottom: "24px" }}>
          {phases.map((phase, i) => (
            <div key={i} className="flow-step">
              <div className="step-num">{i + 1}</div>
              <div className="step-text" style={{ marginTop: "8px" }}>
                {phase.phase}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "11px",
                  color: "#2d6a4f",
                  marginTop: "8px",
                  fontWeight: 700,
                }}
              >
                {phase.duration}
              </div>
            </div>
          ))}
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
