import { useState } from "react";
import { ProposalData, InvestmentSingle, InvestmentMulti } from "@/types/proposal";

interface Props {
  data: ProposalData;
}

function SingleInvestment({ inv, lang }: { inv: InvestmentSingle; lang: string }) {
  const col1 = lang === "it" ? "Deliverable" : "Deliverable";
  const col2 = lang === "it" ? "Investimento" : "Investment";

  return (
    <>
      <div className="rounded-xl overflow-hidden mb-5" style={{ border: "1px solid #1e1e1e" }}>
        <div className="grid grid-cols-[3fr_1fr] px-5 py-3" style={{ background: "#1a1a1a" }}>
          <div className="text-xs tracking-widest uppercase" style={{ color: "#666" }}>{col1}</div>
          <div className="text-xs tracking-widest uppercase text-right" style={{ color: "#666" }}>{col2}</div>
        </div>
        {inv.items.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-[3fr_1fr] px-5 py-3"
            style={{ background: i % 2 === 0 ? "#111" : "#0d0d0d", borderTop: "1px solid #1a1a1a" }}
          >
            <div className="text-sm" style={{ color: "#aaa" }}>{item.deliverable}</div>
            <div className="text-sm text-right" style={{ color: item.price ? "#e0e0e0" : "#444" }}>
              {item.price ?? "—"}
            </div>
          </div>
        ))}
        <div
          className="grid grid-cols-[3fr_1fr] px-5 py-4"
          style={{ background: "#161616", borderTop: "1px solid #2a2a2a" }}
        >
          <div className="text-sm font-semibold" style={{ color: "#f5f5f5" }}>
            {lang === "it" ? "Totale" : "Total"}
          </div>
          <div className="text-sm font-semibold text-right" style={{ color: "#c9a84c" }}>
            {inv.total}
          </div>
        </div>
      </div>

      {/* ROI callout */}
      <div
        className="px-5 py-4 rounded-xl text-sm italic leading-relaxed"
        style={{
          background: "#0f0e09",
          border: "1px solid #3a3010",
          color: "#b89a3a",
        }}
      >
        {inv.roi_framing}
      </div>
    </>
  );
}

function MultiInvestment({ inv, lang }: { inv: InvestmentMulti; lang: string }) {
  const [active, setActive] = useState(0);
  const opt = inv.options[active];

  return (
    <>
      <div className="flex gap-2 mb-5">
        {inv.options.map((o, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="px-4 py-1.5 rounded-full text-sm transition-all"
            style={{
              background: active === i ? "#c9a84c" : "#111",
              color: active === i ? "#0a0a0a" : "#666",
              border: `1px solid ${active === i ? "#c9a84c" : "#2a2a2a"}`,
              cursor: "pointer",
              fontWeight: active === i ? 600 : 400,
            }}
          >
            {o.name}
            {i === 0 && (
              <span className="ml-1.5 text-xs opacity-60">
                {lang === "it" ? "Consigliato" : "Recommended"}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="rounded-xl overflow-hidden mb-5" style={{ border: "1px solid #1e1e1e" }}>
        {opt.items.map((item, i) => (
          <div
            key={i}
            className="grid grid-cols-[3fr_1fr] px-5 py-3"
            style={{ background: i % 2 === 0 ? "#111" : "#0d0d0d", borderTop: i > 0 ? "1px solid #1a1a1a" : "none" }}
          >
            <div className="text-sm" style={{ color: "#aaa" }}>{item.deliverable}</div>
            <div className="text-sm text-right" style={{ color: item.price ? "#e0e0e0" : "#444" }}>
              {item.price ?? "—"}
            </div>
          </div>
        ))}
        <div
          className="grid grid-cols-[3fr_1fr] px-5 py-4"
          style={{ background: "#161616", borderTop: "1px solid #2a2a2a" }}
        >
          <div className="text-sm font-semibold" style={{ color: "#f5f5f5" }}>
            {lang === "it" ? "Totale" : "Total"} {opt.name}
          </div>
          <div className="text-sm font-semibold text-right" style={{ color: "#c9a84c" }}>
            {opt.total}
          </div>
        </div>
      </div>

      <div
        className="px-5 py-4 rounded-xl text-sm italic"
        style={{ background: "#0f0e09", border: "1px solid #3a3010", color: "#b89a3a" }}
      >
        {opt.roi_framing}
      </div>

      {inv.transition_note && (
        <p className="mt-3 text-xs text-center" style={{ color: "#555" }}>
          {inv.transition_note}
        </p>
      )}
    </>
  );
}

export default function InvestmentSlide({ data }: Props) {
  const heading = data.language === "it" ? "Investimento" : "Investment";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 md:px-16 py-16">
      <div className="w-full max-w-3xl">
        <div className="text-xs tracking-widest uppercase mb-3" style={{ color: "#c9a84c" }}>
          04
        </div>
        <h2 className="text-3xl font-light mb-8" style={{ color: "#f5f5f5", letterSpacing: "-0.01em" }}>
          {heading}
        </h2>

        {data.investment.type === "single" ? (
          <SingleInvestment inv={data.investment} lang={data.language} />
        ) : (
          <MultiInvestment inv={data.investment} lang={data.language} />
        )}
      </div>
    </div>
  );
}
