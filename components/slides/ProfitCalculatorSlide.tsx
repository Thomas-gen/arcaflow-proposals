import { ProposalData } from "@/types/proposal";

interface Props {
  data: ProposalData;
}

const MONTH_COLORS = [
  { bg: "#e8f5e9", border: "#2d6a4f", accent: "#2d6a4f" },
  { bg: "#e3f2fd", border: "#4a6fa5", accent: "#4a6fa5" },
  { bg: "#fff3e0", border: "#c07a2a", accent: "#c07a2a" },
];

function formatCurrency(value: number, lang: string): string {
  const symbol = lang === "it" ? "€" : "$";
  return `${symbol}${value.toLocaleString()}`;
}

export default function ProfitCalculatorSlide({ data }: Props) {
  const calc = data.profit_calculator!;
  const lang = data.language;

  const heading = lang === "it" ? "Potenziale di Guadagno" : "Your Revenue Potential";
  const frameLabel = lang === "it" ? "PROIEZIONE ROI" : "ROI PROJECTION";
  const clientLabel = lang === "it" ? "clienti" : "clients";
  const revenueLabel = lang === "it" ? "Fatturato" : "Revenue";
  const callout =
    lang === "it"
      ? "Un solo cliente acquisito su LinkedIn avvia il volano."
      : "One closed client from LinkedIn starts the flywheel.";

  const lastMonth = calc.months[calc.months.length - 1];
  const runRateMin = formatCurrency(lastMonth.clients_min * calc.client_value, lang);
  const runRateMax = formatCurrency(lastMonth.clients_max * calc.client_value, lang);

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

        {/* Month cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${calc.months.length}, 1fr)`,
            gap: "20px",
            marginBottom: "24px",
          }}
        >
          {calc.months.map((m, i) => {
            const color = MONTH_COLORS[i % MONTH_COLORS.length];
            const revenueMin = m.clients_min * calc.client_value;
            const revenueMax = m.clients_max * calc.client_value;

            return (
              <div
                key={i}
                style={{
                  background: color.bg,
                  border: `2px solid ${color.border}`,
                  borderRadius: "14px",
                  padding: "28px 24px",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                {/* Faint background number */}
                <div
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "12px",
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

                {/* Month badge */}
                <div
                  style={{
                    display: "inline-block",
                    background: color.accent,
                    color: "#fff",
                    fontSize: "11px",
                    fontWeight: 700,
                    padding: "4px 12px",
                    borderRadius: "20px",
                    marginBottom: "18px",
                    letterSpacing: "0.04em",
                    textTransform: "uppercase",
                  }}
                >
                  {m.month}
                </div>

                {/* Client range */}
                <div
                  style={{
                    fontSize: "13px",
                    color: "#555",
                    marginBottom: "10px",
                    fontWeight: 500,
                  }}
                >
                  {m.clients_min}–{m.clients_max} {clientLabel}
                </div>

                {/* Revenue */}
                <div
                  style={{
                    fontSize: "clamp(22px, 2.5vw, 30px)",
                    fontWeight: 900,
                    color: color.accent,
                    fontFamily: "'JetBrains Mono', monospace",
                    lineHeight: 1.1,
                  }}
                >
                  {formatCurrency(revenueMin, lang)}
                  <span style={{ fontSize: "0.65em", fontWeight: 700, color: "#888", margin: "0 4px" }}>–</span>
                  {formatCurrency(revenueMax, lang)}
                </div>

                <div
                  style={{
                    fontSize: "11px",
                    color: "#888",
                    marginTop: "6px",
                    fontWeight: 500,
                  }}
                >
                  {revenueLabel} · {formatCurrency(calc.client_value, lang)}/client
                </div>
              </div>
            );
          })}
        </div>

        {/* Run rate roi-box */}
        <div className="roi-box" style={{ marginBottom: "16px" }}>
          <div className="roi-num">
            {runRateMin} – {runRateMax}
          </div>
          <div className="roi-label">MONTHLY RUN RATE BY {lastMonth.month.toUpperCase()}</div>
        </div>

        {/* Callout */}
        <div className="callout">
          <span className="callout-text">{callout}</span>
        </div>
      </div>
    </div>
  );
}
