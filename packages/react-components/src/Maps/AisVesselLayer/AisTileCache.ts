
export const getTileFromCache = (featureCollection: any, x: number, y: number, z: number) => {
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


const lon2tile = (lon: number, zoom: number) => {
  return (Math.floor((lon + 180) / 360 * Math.pow(2, zoom)));
}
const lat2tile = (lat: number, zoom: number) => {
  return (Math.floor((1 - Math.log(Math.tan(lat * Math.PI / 180) + 1 / Math.cos(lat * Math.PI / 180)) / Math.PI) / 2 * Math.pow(2, zoom)));
}

const tile2Long = (x: number, z: number) => {
  return (x / Math.pow(2, z) * 360 - 180);
}

const tile2Lat = (y: number, z: number) => {
  const n = Math.PI - 2 * Math.PI * y / Math.pow(2, z);
  return (180 / Math.PI * Math.atan(0.5 * (Math.exp(n) - Math.exp(-n))));
}

const numberOfTilesAtZoomLevel = (zoom: number, northEdge: number, eastEdge: number, southEdge: number, westEdge: number) => {
  const topTile    = lat2tile(northEdge, zoom);
  const leftTile   = lon2tile(westEdge, zoom);
  const bottomTile = lat2tile(southEdge, zoom);
  const rightTile  = lon2tile(eastEdge, zoom);
  const width      = Math.abs(leftTile - rightTile) + 1;
  const height     = Math.abs(topTile - bottomTile) + 1;
  const totalTiles = width * height;
  return totalTiles;
}