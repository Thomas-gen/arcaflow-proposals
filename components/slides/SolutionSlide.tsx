import { useState } from "react";
import { ProposalData } from "@/types/proposal";

interface Props {
  data: ProposalData;
}

export default function SolutionSlide({ data }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const heading = data.language === "it" ? "Soluzioni & Consegne" : "Solution & Deliverables";
  const col1 = data.language === "it" ? "Attività" : "Activity";
  const col2 = data.language === "it" ? "Beneficio" : "Benefit";

  const part = data.parts[activeTab];

  return (
    <div className="w-full h-full flex flex-col items-center justify-center px-6 md:px-16 py-16">
      <div className="w-full max-w-4xl flex flex-col h-full justify-center">
        {/* Section label */}
        <div className="text-xs tracking-widest uppercase mb-3" style={{ color: "#c9a84c" }}>
          02
        </div>
        <h2 className="text-3xl font-light mb-6" style={{ color: "#f5f5f5", letterSpacing: "-0.01em" }}>
          {heading}
        </h2>

        {/* Tab bar */}
        <div className="flex gap-2 mb-6 flex-wrap">
          {data.parts.map((p, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              className="px-4 py-1.5 rounded-full text-sm transition-all"
              style={{
                background: activeTab === i ? "#c9a84c" : "#111",
                color: activeTab === i ? "#0a0a0a" : "#666",
                border: `1px solid ${activeTab === i ? "#c9a84c" : "#2a2a2a"}`,
                cursor: "pointer",
                fontWeight: activeTab === i ? 600 : 400,
              }}
            >
              {data.language === "it" ? `Parte ${i + 1}` : `Part ${i + 1}`}
              <span className="ml-1.5 opacity-60 text-xs">{p.title}</span>
            </button>
          ))}
        </div>

        {/* Part title */}
        <div className="mb-4 text-sm font-medium" style={{ color: "#c9a84c" }}>
          {part.title}
        </div>

        {/* Table */}
        <div className="rounded-xl overflow-hidden" style={{ border: "1px solid #1e1e1e" }}>
          <div
            className="grid grid-cols-[2fr_3fr] px-5 py-3"
            style={{ background: "#1a1a1a" }}
          >
            <div className="text-xs tracking-widest uppercase" style={{ color: "#666" }}>{col1}</div>
            <div className="text-xs tracking-widest uppercase" style={{ color: "#666" }}>{col2}</div>
          </div>
          {part.items.map((item, i) => (
            <div
              key={i}
              className="grid grid-cols-[2fr_3fr] px-5 py-4 gap-4"
              style={{
                background: i % 2 === 0 ? "#111" : "#0d0d0d",
                borderTop: "1px solid #1a1a1a",
              }}
            >
              <div className="text-sm font-medium" style={{ color: "#e0e0e0" }}>
                {item.activity}
              </div>
              <div className="text-sm leading-relaxed" style={{ color: "#888" }}>
                {item.benefit}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
