import { ProposalData } from "@/types/proposal";

interface Props {
  data: ProposalData;
}

export default function ChallengesSlide({ data }: Props) {
  const heading = data.language === "it" ? "Criticità Attuali" : "Current Challenges";
  const col1 = data.language === "it" ? "Area Critica" : "Critical Area";
  const col2 = data.language === "it" ? "Impatto Business" : "Business Impact";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 md:px-16 py-16">
      <div className="w-full max-w-4xl">
        {/* Section label */}
        <div className="text-xs tracking-widest uppercase mb-3" style={{ color: "#c9a84c" }}>
          01
        </div>
        <h2 className="text-3xl font-light mb-10" style={{ color: "#f5f5f5", letterSpacing: "-0.01em" }}>
          {heading}
        </h2>

        {/* Table */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1e1e1e" }}>
          {/* Header */}
          <div
            className="grid grid-cols-[2fr_3fr] px-5 py-3"
            style={{ background: "#1a1a1a" }}
          >
            <div className="text-xs tracking-widest uppercase" style={{ color: "#666" }}>
              {col1}
            </div>
            <div className="text-xs tracking-widest uppercase" style={{ color: "#666" }}>
              {col2}
            </div>
          </div>

          {/* Rows */}
          {data.challenges.map((c, i) => (
            <div
              key={i}
              className="grid grid-cols-[2fr_3fr] px-5 py-4 gap-4"
              style={{
                background: i % 2 === 0 ? "#111" : "#0d0d0d",
                borderTop: "1px solid #1a1a1a",
              }}
            >
              <div className="text-sm font-medium" style={{ color: "#e0e0e0" }}>
                {c.area}
              </div>
              <div className="text-sm leading-relaxed" style={{ color: "#888" }}>
                {c.impact}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
