// Tokenized Renewable Energy Assets & Sub-Station Infrastructure Store
export interface EnergyAsset {
  id: string;
  name: string;
  type: 'Solar PV' | 'Wind Farm' | 'BESS Battery' | 'Hydro Array';
  capacityMW: number;
  currentOutputMW: number;
  location: string;
  tokenMint: string;
  status: 'operational' | 'curtailed' | 'maintenance';
  dailyRevenueUSD: number;
}

export const POWERCHAIN_ENERGY_ASSETS: EnergyAsset[] = [
  {
    id: 'ast-solar-01',
    name: 'Mojave Desert Solar Field Alpha',
    type: 'Solar PV',
    capacityMW: 450,
    currentOutputMW: 412,
    location: 'Mojave, CA',
    tokenMint: 'SolAlpha1111111111111111111111111111111111',
    status: 'operational',
    dailyRevenueUSD: 58400,
  },
  {
    id: 'ast-wind-02',
    name: 'Columbia River Wind Facility',
    type: 'Wind Farm',
    capacityMW: 320,
    currentOutputMW: 298,
    location: 'Sherman County, OR',
    tokenMint: 'WindCol1111111111111111111111111111111111',
    status: 'operational',
    dailyRevenueUSD: 41200,
  },
  {
    id: 'ast-bess-03',
    name: 'Texas Grid Panhandle BESS-04',
    type: 'BESS Battery',
    capacityMW: 200,
    currentOutputMW: 185,
    location: 'Amarillo, TX',
    tokenMint: 'BessTx11111111111111111111111111111111111',
    status: 'operational',
    dailyRevenueUSD: 28900,
  },
];
