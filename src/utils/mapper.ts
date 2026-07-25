import { RenewableAsset } from '../data/renewables';
import { GridMapNode } from '../data/maps';

export function mapAssetToGridNode(asset: RenewableAsset): GridMapNode {
  const coords: Record<string, { lat: number; lng: number }> = {
    'sol-01': { lat: 35.011, lng: -115.473 },
    'bess-04': { lat: 37.387, lng: -122.057 },
    'wind-02': { lat: 35.132, lng: -118.449 },
    'hydro-01': { lat: 45.628, lng: -121.13 },
  };

  const coord = coords[asset.id] || { lat: 36.7783, lng: -119.4179 };

  return {
    id: asset.id,
    name: asset.name,
    lat: coord.lat,
    lng: coord.lng,
    type: asset.type,
    capacityMW: asset.capacityMW,
    status: asset.status === 'maintenance' ? 'warning' : asset.status,
  };
}
