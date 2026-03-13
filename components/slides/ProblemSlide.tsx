import { ProposalData } from "@/types/proposal";

interface Props {
  data: ProposalData;
}

export default function ProblemSlide({ data }: Props) {
  const p = data.problem!;
  const heading = data.language === "it" ? "Il Problema" : "The Problem";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 md:px-16 py-16">
      <div className="w-full max-w-3xl">
        {/* Section label */}
        <div className="text-xs tracking-widest uppercase mb-3" style={{ color: "#c9a84c" }}>
          02
        </div>
        <h2 className="text-3xl font-light mb-6" style={{ color: "#f5f5f5", letterSpacing: "-0.01em" }}>
          {heading}
        </h2>

        {/* Sub-headline */}
        <div
          className="text-lg font-medium mb-6 leading-snug"
          style={{ color: "#e0e0e0" }}
        >
          {p.headline}
        </div>

        {/* Body text */}
        <div
          className="text-sm leading-relaxed mb-8 whitespace-pre-line"
          style={{ color: "#888", borderLeft: "2px solid #2a2a2a", paddingLeft: "16px" }}
        >
          {p.body}
        </div>

        {/* Channels (optional) */}
        {p.channels && p.channels.length > 0 && (
          <div className="flex flex-col gap-3">
            {p.channels.map((ch, i) => (
              <div
                key={i}
                className="flex items-start gap-4 px-5 py-4 rounded-xl"
                style={{ background: "#111", border: "1px solid #1e1e1e" }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-bold"
                  style={{ background: "#c9a84c22", color: "#c9a84c", border: "1px solid #c9a84c44" }}
                >
                  {i + 1}
                </div>
                <div>
                  <div className="text-sm font-medium mb-0.5" style={{ color: "#e0e0e0" }}>
                    {ch.name}
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: "#666" }}>
                    {ch.description}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
