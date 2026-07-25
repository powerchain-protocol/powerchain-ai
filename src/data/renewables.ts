export interface RenewableAsset {
  id: string;
  name: string;
  type: 'solar' | 'wind' | 'hydro' | 'bess' | 'geothermal';
  capacityMW: number;
  currentOutputMW: number;
  location: string;
  efficiencyPercent: number;
  co2SavedTonsDaily: number;
  pwrcCreditsEarned: number;
  status: 'optimal' | 'warning' | 'maintenance' | 'offline';
  nodeAddress: string;
}

export const RENEWABLE_ASSETS: RenewableAsset[] = [
  {
    id: 'sol-01',
    name: 'Mojave Desert Solar Array #04',
    type: 'solar',
    capacityMW: 120,
    currentOutputMW: 108.4,
    location: 'Mojave, CA',
    efficiencyPercent: 98.2,
    co2SavedTonsDaily: 215.4,
    pwrcCreditsEarned: 10840,
    status: 'optimal',
    nodeAddress: 'PWRC_MOJAVE_SOL_04',
  },
  {
    id: 'bess-04',
    name: 'Pacific Energy Storage Battery (BESS-04)',
    type: 'bess',
    capacityMW: 50,
    currentOutputMW: 42.1,
    location: 'Silicon Valley, CA',
    efficiencyPercent: 94.6,
    co2SavedTonsDaily: 84.2,
    pwrcCreditsEarned: 4210,
    status: 'optimal',
    nodeAddress: 'PWRC_BESS_SILICON_04',
  },
  {
    id: 'wind-02',
    name: 'Tehachapi Pass Wind Farm Alpha',
    type: 'wind',
    capacityMW: 200,
    currentOutputMW: 182.5,
    location: 'Tehachapi Pass, CA',
    efficiencyPercent: 96.8,
    co2SavedTonsDaily: 365.0,
    pwrcCreditsEarned: 18250,
    status: 'optimal',
    nodeAddress: 'PWRC_WIND_TEHACHAPI_02',
  },
  {
    id: 'hydro-01',
    name: 'Columbia River Hydro Generation #01',
    type: 'hydro',
    capacityMW: 150,
    currentOutputMW: 145.0,
    location: 'Columbia River, WA',
    efficiencyPercent: 99.1,
    co2SavedTonsDaily: 290.0,
    pwrcCreditsEarned: 14500,
    status: 'optimal',
    nodeAddress: 'PWRC_HYDRO_COLUMBIA_01',
  },
];

export const TOTAL_RENEWABLE_SUMMARY = {
  totalCapacityMW: 520,
  currentGenerationMW: 478.0,
  dailyCO2OffsetTons: 954.6,
  totalPwrcCreditsIssued: 47800,
  activeNodesCount: 24,
  averageUptime: '99.98%',
};
