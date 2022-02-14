
export const getTileFromCache = (featureCollection: any, x: number, y: number, z: number): any => {
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

  return {
    type: 'FeatureCollection',
    features: featureCollection.features.filter((f: any) => {
      const coords = f.geometry.coordinates;
      const lon = coords[0];
      const lat = coords[1];
      return lon >= lonMin && lon <= lonMax && lat >= latMin && lat <= latMax;
    }),
  };
}

const tile2Long = (x: number, z: number) => {
  return (x / Math.pow(2, z) * 360 - 180);
}

const tile2Lat = (y: number, z: number) => {
  const n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
  return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
}
