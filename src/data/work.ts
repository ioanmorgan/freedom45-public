// The work shown on the Our work page, the homepage and the public-sector page.
// Every line here was confirmed by Ioan (11 Nov 2026); keep the bid library's
// founder evidence saying the same thing.

export type Stage = 'explore' | 'build' | 'grow' | 'sustain';
export type Service =
  | 'product-development'
  | 'rescue-and-modernisation'
  | 'hosting-and-support'
  | 'technical-leadership';

// Labels and anchors match the How we work and Services pages.
export const STAGES: Record<Stage, string> = {
  explore: 'Explore',
  build: 'Build',
  grow: 'Grow',
  sustain: 'Sustain',
};
export const SERVICES: Record<Service, string> = {
  'product-development': 'Product development',
  'rescue-and-modernisation': 'Rescue and modernisation',
  'hosting-and-support': 'Hosting and support',
  'technical-leadership': 'Technical leadership',
};

export interface Work {
  id: string;
  by: 'freedom45' | 'founders';
  title: string;
  body: string;
  /** Homepage card: shorter title and text */
  short?: { title: string; body: string };
  sector: string;
  stage: Stage;
  service: Service;
}

export const WORK: Work[] = [
  {
    id: 'pre-launch-review',
    by: 'freedom45',
    title: 'Pre-launch review of a council procurement platform',
    body: 'A startup building procurement software for UK councils asked us to check their platform before launch. We reviewed its security, scalability and code quality, verified every finding against the code, and handed over a prioritised risk list and a roadmap to fix it.',
    short: {
      title: 'Pre-launch review',
      body: 'Security, scalability and code quality for a council procurement platform: a prioritised risk list and a roadmap to fix it.',
    },
    sector: 'Public sector',
    stage: 'build',
    service: 'technical-leadership',
  },
  {
    id: 'poc-to-startup',
    by: 'founders',
    title: 'From proof of concept to startup',
    body: 'An R&D tax credit consultancy asked one of our founders for an AI proof of concept to take them into construction. It worked, and the consultancy invited them to co-found the business that grew from it: CogniBuild, an AI platform for construction, now in trials.',
    short: {
      title: 'From proof of concept to startup',
      body: 'CogniBuild, an AI platform for construction, now in trials.',
    },
    sector: 'Construction',
    stage: 'build',
    service: 'product-development',
  },
  {
    id: 'elucidat',
    by: 'founders',
    title: 'Elucidat',
    body: 'One of our founders joined this SaaS platform in its early days, before it was VC-backed, and grew to Head of Engineering through three funding rounds and its acquisition in 2025.',
    short: {
      title: 'Elucidat',
      body: 'A SaaS platform, from its early days through three funding rounds and its acquisition in 2025.',
    },
    sector: 'SaaS',
    stage: 'grow',
    service: 'technical-leadership',
  },
  {
    id: 'charity',
    by: 'founders',
    title: 'A tech education charity',
    body: 'Mentoring students as they became founders, helping with their proofs of concept, and helping run a hackathon to bring new students in.',
    sector: 'Charity',
    stage: 'explore',
    service: 'technical-leadership',
  },
  {
    id: 'council-tax-fraud',
    by: 'founders',
    title: 'Council tax fraud detection',
    body: 'Co-founded a data analytics startup whose fraud detection tool was trialled by a Welsh city council. It combined credit reference data with public records to score each property\'s risk of fraud. The council wrote to the properties it flagged: some paid what they owed, others updated their details.',
    sector: 'Public sector',
    stage: 'explore',
    service: 'product-development',
  },
  {
    id: 'supermarket',
    by: 'founders',
    title: 'A major UK supermarket',
    body: 'Social and multimedia features for the intranet its staff use, bug fixes and scalability work, and its APIs built out ahead of a mobile app.',
    sector: 'Retail',
    stage: 'grow',
    service: 'rescue-and-modernisation',
  },
  {
    id: 'cafe-chain',
    by: 'founders',
    title: 'A café chain',
    body: 'A proof of concept to make their website stand out: a side-scrolling, game-style site where visitors could explore the brand, its venues and its menus.',
    sector: 'Hospitality',
    stage: 'explore',
    service: 'product-development',
  },
  {
    id: 'agency',
    by: 'founders',
    title: 'An ad and marketing agency',
    body: 'Development work to keep their projects on track while their CTO was on long-term leave, plus holiday cover and other gaps.',
    sector: 'Marketing',
    stage: 'sustain',
    service: 'hosting-and-support',
  },
];

export const work = (id: string) => {
  const w = WORK.find((x) => x.id === id);
  if (!w) throw new Error(`No work item "${id}"`);
  return w;
};
