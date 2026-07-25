export interface PowerCreditPackage {
  id: string;
  name: string;
  credits: number;
  priceUsd: number;
  mwhEquivalent: number;
  bonusCredits: number;
  popular?: boolean;
}

export const CREDIT_PACKAGES: PowerCreditPackage[] = [
  {
    id: 'starter',
    name: 'Micro-Grid Node Starter',
    credits: 1000,
    priceUsd: 250,
    mwhEquivalent: 10,
    bonusCredits: 50,
  },
  {
    id: 'pro',
    name: 'Substation Enterprise Node',
    credits: 5000,
    priceUsd: 1100,
    mwhEquivalent: 50,
    bonusCredits: 500,
    popular: true,
  },
  {
    id: 'sovereign',
    name: 'Sovereign Utility Provider',
    credits: 25000,
    priceUsd: 5000,
    mwhEquivalent: 250,
    bonusCredits: 3500,
  },
];
