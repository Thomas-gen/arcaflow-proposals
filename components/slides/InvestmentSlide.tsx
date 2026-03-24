import { useState } from "react";
import { ProposalData, InvestmentSingle, InvestmentMulti } from "@/types/proposal";

interface Props {
  data: ProposalData;
}

function SingleInvestment({ inv, lang }: { inv: InvestmentSingle; lang: string }) {
  const delivLabel = lang === "it" ? "DELIVERABLE INCLUSI" : "INCLUDED DELIVERABLES";
  const totalLabel = lang === "it" ? "INVESTIMENTO TOTALE" : "TOTAL INVESTMENT";
  const roiLabel = "ROI";

  return (
    <div className="g2" style={{ gap: "20px" }}>
      {/* Left: deliverables list */}
      <div className="miro-frame">
        <div className="miro-frame-title">{delivLabel}</div>
        <ul className="feat-list">
          {inv.items.map((item, i) => (
            <li key={i}>{item.deliverable}</li>
          ))}
        </ul>
      </div>

      {/* Right: roi-box + sticky */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div className="roi-box">
          {inv.original_total && (
            <div style={{ textDecoration: "line-through", opacity: 0.45, fontSize: "clamp(13px, 1.4vw, 16px)", marginBottom: "4px" }}>
              {inv.original_total}
            </div>
          )}
          <div className="roi-num">{inv.total}</div>
          <div className="roi-label">{totalLabel}</div>
        </div>
        <div className="sticky sticky-yellow">
          <div className="sticky-title">{roiLabel}</div>
          <div className="sticky-text">{inv.roi_framing}</div>
        </div>
      </div>
    </div>
  );
}

function MultiInvestment({ inv, lang }: { inv: InvestmentMulti; lang: string }) {
  const [active, setActive] = useState(0);
  const opt = inv.options[active];
  const totalLabel = lang === "it" ? "INVESTIMENTO" : "INVESTMENT";

  return (
    <>
      {/* Option tabs */}
      <div style={{ display: "flex", gap: "8px", marginBottom: "20px" }}>
        {inv.options.map((o, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              padding: "6px 16px",
              borderRadius: "6px",
              fontSize: "12px",
              fontWeight: active === i ? 700 : 500,
              cursor: "pointer",
              transition: "all 0.2s",
              background: active === i ? "#2d6a4f" : "#fff",
              color: active === i ? "#fff" : "#555",
              border: `2px solid ${active === i ? "#2d6a4f" : "#e0dbd4"}`,
              fontFamily: "Inter, sans-serif",
            }}
          >
            {o.name}
            {i === 0 && (
              <span style={{ marginLeft: "6px", opacity: 0.7, fontSize: "10px" }}>
                {lang === "it" ? "Consigliato" : "Recommended"}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="g2" style={{ gap: "20px" }}>
        <div className="miro-frame">
          <div className="miro-frame-title">{opt.name.toUpperCase()}</div>
          <ul className="feat-list">
            {opt.items.map((item, i) => (
              <li key={i}>{item.deliverable}</li>
            ))}
          </ul>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div className="roi-box">
            <div className="roi-num">{opt.total}</div>
            <div className="roi-label">{totalLabel} {opt.name.toUpperCase()}</div>
          </div>
          <div className="sticky sticky-yellow">
            <div className="sticky-title">ROI</div>
            <div className="sticky-text">{opt.roi_framing}</div>
          </div>
        </div>
      </div>

      {inv.transition_note && (
        <p style={{ marginTop: "12px", fontSize: "12px", color: "#888", textAlign: "center" }}>
          {inv.transition_note}
        </p>
      )}
    </>
  );
}

export default function InvestmentSlide({ data }: Props) {
  const heading = data.language === "it" ? "Investimento" : "Investment";
  const frameLabel = data.language === "it" ? "INVESTIMENTO" : "INVESTMENT";

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
            marginBottom: "28px",
            letterSpacing: "-0.01em",
          }}
        >
          {heading}
        </h2>

        {data.investment && (data.investment.type === "single" ? (
          <SingleInvestment inv={data.investment} lang={data.language} />
        ) : (
          <MultiInvestment inv={data.investment} lang={data.language} />
        ))}
      </div>
    </div>
  );
}
