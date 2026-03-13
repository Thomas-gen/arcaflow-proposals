import { ProposalData } from "@/types/proposal";

interface Props {
  data: ProposalData;
}

export default function ApproachSlide({ data }: Props) {
  const a = data.approach!;
  const heading = data.language === "it" ? "Il Nostro Approccio" : "Our Approach";

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 md:px-16 py-16">
      <div className="w-full max-w-3xl">
        <div className="text-xs tracking-widest uppercase mb-3" style={{ color: "#c9a84c" }}>
          02
        </div>
        <h2
          className="text-3xl font-light mb-8"
          style={{ color: "#f5f5f5", letterSpacing: "-0.01em" }}
        >
          {heading}
        </h2>

        {/* Body */}
        <div
          className="text-sm leading-relaxed mb-8 whitespace-pre-line"
          style={{
            color: "#aaa",
            borderLeft: "2px solid #c9a84c44",
            paddingLeft: "20px",
            fontSize: "15px",
            lineHeight: "1.8",
          }}
        >
          {a.body}
        </div>

        {/* Optional points */}
        {a.points && a.points.length > 0 && (
          <div className="flex flex-col gap-3">
            {a.points.map((p, i) => (
              <div
                key={i}
                className="flex items-start gap-4 px-5 py-4 rounded-xl"
                style={{ background: "#111", border: "1px solid #1e1e1e" }}
              >
                <div
                  className="w-5 h-5 rounded-full flex items-center justify-center text-xs flex-shrink-0 mt-0.5 font-bold"
                  style={{
                    background: "#c9a84c22",
                    color: "#c9a84c",
                    border: "1px solid #c9a84c44",
                  }}
                >
                  {i + 1}
                </div>
                <div>
                  <div className="text-sm font-medium mb-0.5" style={{ color: "#e0e0e0" }}>
                    {p.label}
                  </div>
                  <div className="text-xs leading-relaxed" style={{ color: "#666" }}>
                    {p.description}
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
