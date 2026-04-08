import { CaseStudyData } from "@/types/case-study";

export default function CaseStudyTestimonial({ data }: { data: CaseStudyData }) {
  if (!data.testimonial) return null;
  const t = data.testimonial;
  return (
    <div className="cs-slide">
      <div className="cs-inner" style={{ maxWidth: "720px" }}>
        <div className="cs-label">In Their Words</div>
        <div style={{
          fontSize: "clamp(18px, 2.5vw, 28px)",
          fontFamily: "'Caveat', cursive",
          color: "#e5e7eb",
          lineHeight: 1.5,
          marginBottom: "32px",
          marginTop: "12px"
        }}>
          &ldquo;{t.quote}&rdquo;
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div style={{ width: "40px", height: "2px", background: "#e51551" }} />
          <div>
            <div style={{ fontWeight: 700, fontSize: "14px", color: "#e5e7eb" }}>{t.author}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>{t.role}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
