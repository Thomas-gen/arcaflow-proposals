import { ProposalData } from "@/types/proposal";

interface Props {
  data: ProposalData;
}

export default function NextStepsSlide({ data }: Props) {
  const heading = data.language === "it" ? "Prossimi Passi" : "Next Steps";
  const frameLabel = data.language === "it" ? "COME INIZIARE" : "HOW TO START";
  const termsHeading =
    data.language === "it" ? "TERMINI & CONDIZIONI" : "TERMS & CONDITIONS";

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

        {/* Next steps as num-cards */}
        <div className="g2" style={{ marginBottom: "24px" }}>
          {data.next_steps.map((step, i) => (
            <div key={i} className="num-card highlight">
              <div className="big-num">{String(i + 1).padStart(2, "0")}</div>
              <div
                className="num-label"
                style={{ fontSize: "12px", marginTop: "8px", color: "#444", fontWeight: 600 }}
              >
                {step}
              </div>
            </div>
          ))}
        </div>

        {/* T&C in miro frame */}
        <div className="miro-frame" style={{ marginBottom: "16px" }}>
          <div className="miro-frame-title">{termsHeading}</div>
          <table className="prop-table">
            <tbody>
              {data.terms.map((t, i) => (
                <tr key={i}>
                  <td>{t.area}</td>
                  <td>{t.detail}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Contact as handwritten callout */}
        <div className="callout" style={{ marginTop: "0" }}>
          <span className="callout-text">{data.contact}</span>
        </div>
      </div>
    </div>
  );
}
