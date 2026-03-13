import { ProposalData } from "@/types/proposal";

interface Props {
  data: ProposalData;
}

export default function NextStepsSlide({ data }: Props) {
  const heading = data.language === "it" ? "Prossimi Passi" : "Next Steps";
  const termsHeading = data.language === "it" ? "Termini & Condizioni" : "Terms & Conditions";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 md:px-16 py-16 overflow-y-auto">
      <div className="w-full max-w-4xl">
        <div className="text-xs tracking-widest uppercase mb-3" style={{ color: "#c9a84c" }}>
          06
        </div>
        <h2 className="text-3xl font-light mb-8" style={{ color: "#f5f5f5", letterSpacing: "-0.01em" }}>
          {heading}
        </h2>

        {/* Next steps list */}
        <div className="flex flex-col gap-3 mb-10">
          {data.next_steps.map((step, i) => (
            <div
              key={i}
              className="flex items-start gap-4 px-5 py-4 rounded-xl"
              style={{ background: "#111", border: "1px solid #1e1e1e" }}
            >
              <div
                className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                style={{ background: "#c9a84c", color: "#0a0a0a" }}
              >
                {i + 1}
              </div>
              <div className="text-sm leading-relaxed" style={{ color: "#ccc" }}>
                {step}
              </div>
            </div>
          ))}
        </div>

        {/* T&C */}
        <div className="mb-8">
          <div className="text-xs tracking-widest uppercase mb-4" style={{ color: "#555" }}>
            {termsHeading}
          </div>
          <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1a1a1a" }}>
            {data.terms.map((t, i) => (
              <div
                key={i}
                className="grid grid-cols-[1fr_3fr] px-5 py-3 gap-4"
                style={{
                  background: i % 2 === 0 ? "#0d0d0d" : "#111",
                  borderTop: i > 0 ? "1px solid #1a1a1a" : "none",
                }}
              >
                <div className="text-xs font-medium" style={{ color: "#666" }}>{t.area}</div>
                <div className="text-xs leading-relaxed" style={{ color: "#555" }}>{t.detail}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Contact */}
        <div className="text-center text-xs" style={{ color: "#444" }}>
          {data.contact}
        </div>
      </div>
    </div>
  );
}
