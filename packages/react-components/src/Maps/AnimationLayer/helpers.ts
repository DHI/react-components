
/**
 * Converts a WGS84 longitude/latitude to EPSG:3857.
 * Useful for creating an EPSG:3857 based bounding box for /api/maps
 * @param lon Longitude.
 * @param lat Latitude.
 * @returns [longitudeWGS84, latitudeWGS84]
 */
export function convertWGS84ToEPSG3857(lon: number, lat: number) {
  const x = (lon * 20037508.34) / 180;
  let y = Math.log(Math.tan(((90 + lat) * Math.PI) / 360)) / (Math.PI / 180);
  y = (y * 20037508.34) / 180;
  return [x, y];
}
