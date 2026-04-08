export interface CaseStudyResult {
  metric: string;      // e.g. "400+"
  label: string;       // e.g. "calls recovered per month"
  positive: boolean;   // true = green, false = red (problems before)
}

export interface CaseStudyProblem {
  area: string;
  impact: string;
}

export interface CaseStudySolution {
  title: string;
  description: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  author: string;
  role: string;
}

export interface CaseStudyData {
  slug: string;
  client: string;
  company: string;
  industry: string;
  service: string;           // e.g. "AI Voice Agent + CRM Automation"
  headline: string;          // hero result in one line, e.g. "400 missed calls → automated"
  date: string;              // YYYY-MM-DD (project completion)
  language: "en" | "it";

  problems: CaseStudyProblem[];           // 2–4 before-state pain points
  solutions: CaseStudySolution[];         // 3–5 what was built
  results: CaseStudyResult[];             // 3–6 outcome metrics (the hero slide)
  timeline: string;                       // e.g. "3 weeks"
  testimonial?: CaseStudyTestimonial;     // optional client quote
  cta_label?: string;                     // CTA button text, default "Book a Call"
  cta_url?: string;                       // CTA link, default cal.com
}
