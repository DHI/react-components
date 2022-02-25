import { AisFeatureCollection, Feature } from './types';

/**
 * Set of functions used to pull out the specific features relevant to the "tile" being rendered.
 * Used as an optimisation so that the 3D vessels only need to be rendered within the local region.
 */
export const getTileFromCache = (
  featureCollection: AisFeatureCollection,
  x: number,
  y: number,
  z: number,
): AisFeatureCollection => {
  const lonMin = tile2Long(x, z);
  const lonMax = tile2Long(x + 1, z);
  const latMax = tile2Lat(y, z);
  const latMin = tile2Lat(y + 1, z);

  if (!featureCollection) {
    return {
      type: 'FeatureCollection',
      features: [],
    };
  }

  const features = featureCollection.features as Feature[];
  return {
    type: 'FeatureCollection',
    features: features.filter((f: any) => {
      const coords = f.geometry.coordinates;
      const lon = coords[0];
      const lat = coords[1];
      return lon >= lonMin && lon <= lonMax && lat >= latMin && lat <= latMax;
    }),
  };
};

const tile2Long = (x: number, z: number) => {
  return (x / Math.pow(2, z)) * 360 - 180;
};

const tile2Lat = (y: number, z: number) => {
  const n = Math.PI - (2 * Math.PI * y) / Math.pow(2, z);
  return (180 / Math.PI) * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n)));
};
