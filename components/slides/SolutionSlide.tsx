import { useState } from "react";
import { ProposalData } from "@/types/proposal";

interface Props {
  data: ProposalData;
}

export default function SolutionSlide({ data }: Props) {
  const [activeTab, setActiveTab] = useState(0);
  const heading = data.language === "it" ? "Soluzioni & Consegne" : "Solution & Deliverables";
  const frameLabel = data.language === "it" ? "DELIVERABLES" : "DELIVERABLES";
  const col1 = data.language === "it" ? "Attività" : "Activity";
  const col2 = data.language === "it" ? "Beneficio" : "Benefit";
  const partLabel = data.language === "it" ? "P" : "P";

  const part = data.parts[activeTab];

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
            marginBottom: "20px",
            letterSpacing: "-0.01em",
          }}
        >
          {heading}
        </h2>

        {/* Tab bar */}
        <div style={{ display: "flex", gap: "8px", marginBottom: "20px", flexWrap: "wrap" }}>
          {data.parts.map((p, i) => (
            <button
              key={i}
              onClick={() => setActiveTab(i)}
              style={{
                padding: "6px 14px",
                borderRadius: "6px",
                fontSize: "12px",
                fontWeight: activeTab === i ? 700 : 500,
                cursor: "pointer",
                transition: "all 0.2s",
                background: activeTab === i ? "#2d6a4f" : "#fff",
                color: activeTab === i ? "#fff" : "#555",
                border: `2px solid ${activeTab === i ? "#2d6a4f" : "#e0dbd4"}`,
                fontFamily: "Inter, sans-serif",
              }}
            >
              {partLabel}{i + 1}
              <span
                style={{
                  marginLeft: "6px",
                  opacity: 0.75,
                  fontWeight: 400,
                  fontSize: "11px",
                }}
              >
                {p.title}
              </span>
            </button>
          ))}
        </div>

        {/* Part table in miro frame */}
        <div className="miro-frame">
          <div className="miro-frame-title">{part.title.toUpperCase()}</div>
          <table className="prop-table">
            <thead>
              <tr>
                <th>{col1}</th>
                <th>{col2}</th>
              </tr>
            </thead>
            <tbody>
              {part.items.map((item, i) => (
                <tr key={i}>
                  <td>{item.activity}</td>
                  <td>{item.benefit}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
