import { ProposalData } from "@/types/proposal";

interface Props {
  data: ProposalData;
}

const ROLE_ICONS: Record<string, string> = {
  cmo: "🎯",
  strategy: "🎯",
  developer: "⚙️",
  dev: "⚙️",
  automation: "🤖",
  ai: "🤖",
};

function getRoleIcon(role: string): string {
  const key = role.toLowerCase();
  for (const [k, icon] of Object.entries(ROLE_ICONS)) {
    if (key.includes(k)) return icon;
  }
  return "✦";
}

const CARD_COLORS = [
  { bg: "#f0f7f4", border: "#2d6a4f", accent: "#2d6a4f" },
  { bg: "#f0f4ff", border: "#4a6fa5", accent: "#4a6fa5" },
  { bg: "#fff8f0", border: "#c07a2a", accent: "#c07a2a" },
];

export default function TeamSlide({ data }: Props) {
  if (!data.team || data.team.length === 0) return null;

  const heading = data.language === "it" ? "Il Team" : "The Team";
  const frameLabel = data.language === "it" ? "CHI LAVORA AL TUO PROGETTO" : "YOUR PROJECT TEAM";
  const tagline =
    data.language === "it"
      ? "Strategia e tecnica nello stesso team — nessun intermediario, nessun briefing perso."
      : "Strategy and technical execution in one team — no middlemen, no lost briefings.";

  return (
    <div
      className="w-full h-full flex flex-col items-center justify-center px-6 md:px-16 py-16"
      style={{ zIndex: 1, position: "relative" }}
    >
      <div className="w-full max-w-4xl">
        <span className="frame-label">{frameLabel}</span>
        <h2
          style={{
            fontSize: "clamp(22px, 2.5vw, 32px)",
            fontWeight: 800,
            color: "#1a1a2e",
            marginBottom: "32px",
            letterSpacing: "-0.01em",
          }}
        >
          {heading}
        </h2>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: `repeat(${data.team.length}, 1fr)`,
            gap: "20px",
            marginBottom: "28px",
          }}
        >
          {data.team.map((member, i) => {
            const color = CARD_COLORS[i % CARD_COLORS.length];
            return (
              <div
                key={i}
                style={{
                  background: color.bg,
                  border: `2px solid ${color.border}`,
                  borderRadius: "14px",
                  padding: "28px 24px",
                  display: "flex",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <div
                  style={{
                    fontSize: "32px",
                    lineHeight: 1,
                  }}
                >
                  {getRoleIcon(member.role)}
                </div>

                <div>
                  <div
                    style={{
                      fontSize: "11px",
                      fontWeight: 700,
                      letterSpacing: "0.08em",
                      color: color.accent,
                      textTransform: "uppercase",
                      marginBottom: "4px",
                    }}
                  >
                    {member.role}
                  </div>
                  {member.name && (
                    <div
                      style={{
                        fontSize: "17px",
                        fontWeight: 700,
                        color: "#1a1a2e",
                      }}
                    >
                      {member.name}
                    </div>
                  )}
                </div>

                <div
                  style={{
                    fontSize: "13px",
                    color: "#444",
                    lineHeight: "1.6",
                    flex: 1,
                  }}
                >
                  {member.description}
                </div>
              </div>
            );
          })}
        </div>

        {/* Tagline callout */}
        <div className="callout">
          <span className="callout-text">{tagline}</span>
        </div>
      </div>
    </div>
  );
}
