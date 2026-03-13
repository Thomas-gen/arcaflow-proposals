import { ProposalData } from "@/types/proposal";

interface Props {
  data: ProposalData;
}

export default function CoverSlide({ data }: Props) {
  const formatted = new Date(data.date).toLocaleDateString(
    data.language === "it" ? "it-IT" : "en-GB",
    { day: "numeric", month: "long", year: "numeric" }
  );

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-8">
      {/* Arcaflow wordmark */}
      <div
        className="mb-10 text-xs tracking-[0.3em] uppercase"
        style={{ color: "#c9a84c" }}
      >
        Arcaflow AI
      </div>

      {/* Divider */}
      <div className="w-12 h-px mb-10" style={{ background: "#2a2a2a" }} />

      {/* Headline */}
      <h1
        className="text-4xl md:text-5xl font-light text-center mb-3 leading-tight"
        style={{ color: "#f5f5f5", letterSpacing: "-0.02em" }}
      >
        {data.language === "it" ? "Proposta di Implementazione" : "Implementation Proposal"}
      </h1>

      <p
        className="text-lg text-center mb-10"
        style={{ color: "#888", fontWeight: 300 }}
      >
        {data.company}
        {data.company && data.client !== data.company ? ` · ${data.client}` : ""}
      </p>

      {/* Service tag */}
      <div
        className="px-5 py-2 rounded-full text-sm mb-12"
        style={{
          background: "#111",
          border: "1px solid #2a2a2a",
          color: "#aaa",
        }}
      >
        {data.service}
      </div>

      {/* Date */}
      <div className="text-sm" style={{ color: "#555" }}>
        {formatted}
      </div>
    </div>
  );
}
