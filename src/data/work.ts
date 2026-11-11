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
    service: 'rescue-and-modernisation',
  },
  {
    id: 'poc-to-startup',
    by: 'founders',
    title: 'From proof of concept to startup',
    body: 'An R&D tax credit consultancy asked our founder for an AI proof of concept to take them into construction. It worked, and they invited our founder to co-found the business that grew from it: CogniBuild, an AI platform for construction, now in trials.',
    short: {
      title: 'From proof of concept to startup',
      body: 'An AI proof of concept for a client grew into CogniBuild, a construction-tech startup our founder co-founded.',
    },
    sector: 'Construction',
    stage: 'explore',
    service: 'product-development',
  },
  {
    id: 'elucidat',
    by: 'founders',
    title: 'Elucidat',
    body: 'From the early days of this VC-backed SaaS platform to Head of Engineering, through three funding rounds and its acquisition in 2025.',
    sector: 'SaaS',
    stage: 'grow',
    service: 'technical-leadership',
  },
  {
    id: 'council-tax-fraud',
    by: 'founders',
    title: 'Council tax fraud detection',
    body: 'Co-founded a data analytics startup whose fraud detection tool was trialled by a Welsh city council. It flagged accounts that needed a closer look; the council wrote to them, and some paid what they owed while others updated their details.',
    sector: 'Public sector',
    stage: 'explore',
    service: 'product-development',
  },
  {
    id: 'charity',
    by: 'founders',
    title: 'A tech education charity',
    body: 'Mentoring, help with proofs of concept, and running a hackathon.',
    sector: 'Charity',
    stage: 'explore',
    service: 'technical-leadership',
  },
  {
    id: 'supermarket',
    by: 'founders',
    title: 'A major UK supermarket',
    body: 'Maintenance and new features for the intranet its staff use.',
    sector: 'Retail',
    stage: 'sustain',
    service: 'hosting-and-support',
  },
  {
    id: 'cafe-chain',
    by: 'founders',
    title: 'A café chain',
    body: 'A proof of concept for a game-style website and menus.',
    sector: 'Hospitality',
    stage: 'explore',
    service: 'product-development',
  },
  {
    id: 'agency',
    by: 'founders',
    title: 'An ad and marketing agency',
    body: 'Extra development capacity, on demand, when their own team was stretched.',
    sector: 'Marketing',
    stage: 'build',
    service: 'product-development',
  },
];

export const work = (id: string) => {
  const w = WORK.find((x) => x.id === id);
  if (!w) throw new Error(`No work item "${id}"`);
  return w;
};
