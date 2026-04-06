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
  description?: string;
}

export interface InvestmentItem {
  deliverable: string;
  price: string | null;
}

export interface InvestmentSingle {
  type: "single";
  total: string;
  original_total?: string;
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
  detail_items?: string[];
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

export interface TeamMember {
  role: string;
  name?: string;
  description: string;
}

export interface ProfitMonth {
  month: string;
  clients_min: number;
  clients_max: number;
}

export interface ProfitCalculator {
  client_value: number;
  months: ProfitMonth[];
}

export interface ProposalData {
  profit_calculator?: ProfitCalculator;
  team?: TeamMember[];
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
  investment?: Investment;
  bonuses: Bonus[];
  final_total: string;
  bonus_tagline?: string;
  next_steps: string[];
  terms: Term[];
  contact: string;
}
