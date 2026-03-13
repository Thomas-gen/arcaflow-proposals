import { ProposalData } from "@/types/proposal";

interface Props {
  data: ProposalData;
}

export default function TimelineSlide({ data }: Props) {
  const heading = data.language === "it" ? "Tempistiche" : "Timeline";
  const col1 = data.language === "it" ? "Fase" : "Phase";
  const col2 = data.language === "it" ? "Durata Stimata" : "Estimated Duration";

  const total = data.timeline[data.timeline.length - 1];
  const phases = data.timeline.slice(0, -1);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 md:px-16 py-16">
      <div className="w-full max-w-3xl">
        <div className="text-xs tracking-widest uppercase mb-3" style={{ color: "#c9a84c" }}>
          03
        </div>
        <h2 className="text-3xl font-light mb-10" style={{ color: "#f5f5f5", letterSpacing: "-0.01em" }}>
          {heading}
        </h2>

        {/* Visual timeline */}
        <div className="flex flex-col gap-0 mb-8">
          {phases.map((phase, i) => (
            <div key={i} className="flex items-start gap-5">
              {/* Line + dot */}
              <div className="flex flex-col items-center pt-1">
                <div
                  className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                  style={{ background: "#c9a84c", boxShadow: "0 0 8px #c9a84c55" }}
                />
                {i < phases.length - 1 && (
                  <div className="w-px flex-1 min-h-[32px]" style={{ background: "#2a2a2a" }} />
                )}
              </div>
              {/* Content */}
              <div className="pb-6">
                <div className="text-sm font-medium mb-0.5" style={{ color: "#e0e0e0" }}>
                  {phase.phase}
                </div>
                <div className="text-sm" style={{ color: "#555" }}>
                  {phase.duration}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Total */}
        {total && (
          <div
            className="flex items-center justify-between px-5 py-4 rounded-xl"
            style={{ background: "#111", border: "1px solid #2a2a2a" }}
          >
            <div className="text-sm font-semibold" style={{ color: "#c9a84c" }}>
              {total.phase}
            </div>
            <div className="text-sm font-semibold" style={{ color: "#c9a84c" }}>
              {total.duration}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
