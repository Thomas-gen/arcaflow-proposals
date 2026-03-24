import { ProposalData } from "@/types/proposal";

interface Props {
  data: ProposalData;
}

const BONUS_COLORS = ["sticky-green", "sticky-blue", "sticky-orange", "sticky-purple"];

export default function BonusesSlide({ data }: Props) {
  const heading = data.language === "it" ? "Bonus Inclusi" : "Bonuses Included";
  const frameLabel = data.language === "it" ? "VALORE AGGIUNTO" : "ADDED VALUE";
  const finalLabel =
    data.language === "it" ? "TOTALE FINALE (CON BONUS)" : "FINAL TOTAL (INCL. BONUSES)";
  const tagline =
    data.bonus_tagline !== undefined
      ? data.bonus_tagline
      : data.language === "it"
      ? "Una sola prenotazione ripaga l'intero investimento."
      : "One booking covers the entire investment.";

  const gridClass = data.bonuses.length <= 2 ? "g2" : "g3";

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

        {/* Bonus sticky cards */}
        <div className={gridClass} style={{ marginBottom: "24px" }}>
          {data.bonuses.map((b, i) => (
            <div key={i} className={`sticky ${BONUS_COLORS[i % BONUS_COLORS.length]}`}>
              <div className="sticky-title">✦ {b.bonus}</div>
              <div className="sticky-text">{b.detail}</div>
            </div>
          ))}
        </div>

        {/* Final total */}
        <div className="roi-box" style={{ marginBottom: "16px" }}>
          <div className="roi-num">{data.final_total}</div>
          <div className="roi-label">{finalLabel}</div>
        </div>

        {/* Handwritten callout */}
        <div className="callout">
          <span className="callout-text">{tagline}</span>
        </div>
      </div>
    </div>
  );
}
