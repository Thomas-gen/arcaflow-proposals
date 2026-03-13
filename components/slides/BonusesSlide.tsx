import { ProposalData } from "@/types/proposal";

interface Props {
  data: ProposalData;
}

export default function BonusesSlide({ data }: Props) {
  const heading = data.language === "it" ? "Bonus Inclusi" : "Bonuses Included";
  const col1 = data.language === "it" ? "Bonus" : "Bonus";
  const col2 = data.language === "it" ? "Dettaglio" : "Detail";
  const finalLabel = data.language === "it" ? "Totale Finale" : "Final Total";
  const includedLabel = data.language === "it" ? "bonus inclusi" : "bonuses included";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 md:px-16 py-16">
      <div className="w-full max-w-3xl">
        <div className="text-xs tracking-widest uppercase mb-3" style={{ color: "#c9a84c" }}>
          05
        </div>
        <h2 className="text-3xl font-light mb-8" style={{ color: "#f5f5f5", letterSpacing: "-0.01em" }}>
          {heading}
        </h2>

        <div className="rounded-xl overflow-hidden mb-8" style={{ border: "1px solid #1e1e1e" }}>
          <div className="grid grid-cols-[2fr_3fr] px-5 py-3" style={{ background: "#1a1a1a" }}>
            <div className="text-xs tracking-widest uppercase" style={{ color: "#666" }}>{col1}</div>
            <div className="text-xs tracking-widest uppercase" style={{ color: "#666" }}>{col2}</div>
          </div>
          {data.bonuses.map((b, i) => (
            <div
              key={i}
              className="grid grid-cols-[2fr_3fr] px-5 py-4 gap-4"
              style={{
                background: i % 2 === 0 ? "#111" : "#0d0d0d",
                borderTop: "1px solid #1a1a1a",
              }}
            >
              <div className="text-sm font-medium flex items-start gap-2" style={{ color: "#e0e0e0" }}>
                <span style={{ color: "#c9a84c" }}>✦</span>
                {b.bonus}
              </div>
              <div className="text-sm leading-relaxed" style={{ color: "#888" }}>
                {b.detail}
              </div>
            </div>
          ))}
        </div>

        {/* Final total */}
        <div
          className="flex items-center justify-between px-6 py-5 rounded-xl"
          style={{
            background: "linear-gradient(135deg, #1a1500 0%, #111 100%)",
            border: "1px solid #3a3010",
          }}
        >
          <div>
            <div className="text-sm font-semibold mb-0.5" style={{ color: "#f5f5f5" }}>
              {finalLabel}
            </div>
            <div className="text-xs" style={{ color: "#666" }}>
              ({includedLabel})
            </div>
          </div>
          <div className="text-3xl font-light" style={{ color: "#c9a84c" }}>
            {data.final_total}
          </div>
        </div>
      </div>
    </div>
  );
}
