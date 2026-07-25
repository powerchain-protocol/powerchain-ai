export interface GridMapNode {
  id: string;
  name: string;
  lat: number;
  lng: number;
  type: 'solar' | 'wind' | 'hydro' | 'bess' | 'geothermal';
  capacityMW: number;
  status: 'optimal' | 'warning' | 'offline';
}

export const GRID_MAP_NODES: GridMapNode[] = [
  { id: 'sol-01', name: 'Mojave Solar Array #04', lat: 35.011, lng: -115.473, type: 'solar', capacityMW: 120, status: 'optimal' },
  { id: 'bess-04', name: 'Pacific Energy Storage (BESS-04)', lat: 37.387, lng: -122.057, type: 'bess', capacityMW: 50, status: 'optimal' },
  { id: 'wind-02', name: 'Tehachapi Wind Farm', lat: 35.132, lng: -118.449, type: 'wind', capacityMW: 200, status: 'optimal' },
  { id: 'hydro-01', name: 'Columbia River Hydro', lat: 45.628, lng: -121.13, type: 'hydro', capacityMW: 150, status: 'optimal' },
];
