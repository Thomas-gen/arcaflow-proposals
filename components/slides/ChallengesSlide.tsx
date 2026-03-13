import { ProposalData } from "@/types/proposal";

interface Props {
  data: ProposalData;
}

const STICKY_COLORS = [
  "sticky-yellow",
  "sticky-pink",
  "sticky-blue",
  "sticky-orange",
  "sticky-green",
  "sticky-purple",
];

export default function ChallengesSlide({ data }: Props) {
  const heading = data.language === "it" ? "Il Problema" : "The Problem";
  const frameLabel =
    data.language === "it" ? "SITUAZIONE ATTUALE" : "CURRENT SITUATION";

  const gridClass = data.challenges.length <= 4 ? "g2" : "g3";

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center px-6 md:px-16 py-16 overflow-y-auto"
      style={{ zIndex: 1, position: "relative" }}
    >
      <div className="w-full max-w-4xl">
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

        <div className={gridClass}>
          {data.challenges.map((c, i) => (
            <div key={i} className={`sticky ${STICKY_COLORS[i % STICKY_COLORS.length]}`}>
              <div className="sticky-title">{c.area}</div>
              <div className="sticky-text">{c.impact}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
