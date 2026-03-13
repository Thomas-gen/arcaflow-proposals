export interface Challenge {
  area: string;
  impact: string;
}

export interface PartItem {
  activity: string;
  benefit: string;
}

export interface Part {
  title: string;
  items: PartItem[];
}

export interface TimelinePhase {
  phase: string;
  duration: string;
}

export interface InvestmentItem {
  deliverable: string;
  price: string | null;
}

export interface InvestmentSingle {
  type: "single";
  total: string;
  roi_framing: string;
  items: InvestmentItem[];
}

export interface InvestmentOption {
  name: string;
  label: string;
  items: InvestmentItem[];
  total: string;
  roi_framing: string;
}

export interface InvestmentMulti {
  type: "multi";
  options: [InvestmentOption, InvestmentOption];
  transition_note?: string;
}

export type Investment = InvestmentSingle | InvestmentMulti;

export interface Bonus {
  bonus: string;
  detail: string;
}

export interface Term {
  area: string;
  detail: string;
}

export interface ApproachPoint {
  label: string;
  description: string;
}

export interface Approach {
  body: string;
  points?: ApproachPoint[];
}

export interface ProposalData {
  slug: string;
  client: string;
  company: string;
  service: string;
  date: string;
  language: "en" | "it";
  challenges: Challenge[];
  approach?: Approach;
  parts: Part[];
  timeline: TimelinePhase[];
  investment: Investment;
  bonuses: Bonus[];
  final_total: string;
  next_steps: string[];
  terms: Term[];
  contact: string;
}
