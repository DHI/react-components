// ==========================================
// Contents
// ==========================================
// 1. Color Helpers.
// 2. Coordinate conversion helpers.

// ==========================================
// 1. Color Helpers.
// ==========================================

export const hexColorToArray = (color: string, opacity: number) => {
  const rHex = parseInt(color.slice(1, 3), 16);
  const gHex = parseInt(color.slice(3, 5), 16);
  const bHex = parseInt(color.slice(5, 7), 16);

  return [rHex, gHex, bHex, Math.round(opacity * 255)];
};

// ==========================================
// 2. Coordinate conversion helpers.
// ==========================================

export const utmToLatLng = (zone: number, easting: number, northing: number, northernHemisphere: boolean) => {
  if (northernHemisphere == undefined) {
    var northernHemisphere = true;
  }

  if (!northernHemisphere) {
    northing = 10000000 - northing;
  }

  const a = 6378137;
  const e = 0.081819191;
  const e1sq = 0.006739497;
  const k0 = 0.9996;

  const arc = northing / k0;
  const mu = arc / (a * (1 - Math.pow(e, 2) / 4.0 - (3 * Math.pow(e, 4)) / 64.0 - (5 * Math.pow(e, 6)) / 256.0));

  const ei = (1 - Math.pow(1 - e * e, 1 / 2.0)) / (1 + Math.pow(1 - e * e, 1 / 2.0));

  const ca = (3 * ei) / 2 - (27 * Math.pow(ei, 3)) / 32.0;

  const cb = (21 * Math.pow(ei, 2)) / 16 - (55 * Math.pow(ei, 4)) / 32;
  const cc = (151 * Math.pow(ei, 3)) / 96;
  const cd = (1097 * Math.pow(ei, 4)) / 512;
  const phi1 = mu + ca * Math.sin(2 * mu) + cb * Math.sin(4 * mu) + cc * Math.sin(6 * mu) + cd * Math.sin(8 * mu);

  const n0 = a / Math.pow(1 - Math.pow(e * Math.sin(phi1), 2), 1 / 2.0);

  const r0 = (a * (1 - e * e)) / Math.pow(1 - Math.pow(e * Math.sin(phi1), 2), 3 / 2.0);
  const fact1 = (n0 * Math.tan(phi1)) / r0;

  const _a1 = 500000 - easting;
  const dd0 = _a1 / (n0 * k0);
  const fact2 = (dd0 * dd0) / 2;

  const t0 = Math.pow(Math.tan(phi1), 2);
  const Q0 = e1sq * Math.pow(Math.cos(phi1), 2);
  const fact3 = ((5 + 3 * t0 + 10 * Q0 - 4 * Q0 * Q0 - 9 * e1sq) * Math.pow(dd0, 4)) / 24;

  const fact4 = ((61 + 90 * t0 + 298 * Q0 + 45 * t0 * t0 - 252 * e1sq - 3 * Q0 * Q0) * Math.pow(dd0, 6)) / 720;

  const lof1 = _a1 / (n0 * k0);
  const lof2 = ((1 + 2 * t0 + Q0) * Math.pow(dd0, 3)) / 6.0;
  const lof3 =
    ((5 - 2 * Q0 + 28 * t0 - 3 * Math.pow(Q0, 2) + 8 * e1sq + 24 * Math.pow(t0, 2)) * Math.pow(dd0, 5)) / 120;
  const _a2 = (lof1 - lof2 + lof3) / Math.cos(phi1);
  const _a3 = (_a2 * 180) / Math.PI;

  let latitude = (180 * (phi1 - fact1 * (fact2 + fact3 + fact4))) / Math.PI;

  if (!northernHemisphere) {
    latitude = -latitude;
  }

  const longitude = ((zone > 0 && 6 * zone - 183.0) || 3.0) - _a3;

  return { latitude: latitude, longitude: longitude };
};

export const latLngToUtm = (
  lat: number,
  lon: number,
): { zone: number; easting: number; northing: number; northernHemisphere: boolean } => {
  const UTMScaleFactor = 0.9996;

  const result: any = {};
  result.zone = Math.floor((lon + 180.0) / 6) + 1;

  mapLatLonToXY(degToRad(lat), degToRad(lon), degToRad(-183.0 + result.zone * 6.0), result);

  /* Adjust easting and northing for UTM system. */
  result.easting = result.easting * UTMScaleFactor + 500000.0;
  result.northing = result.northing * UTMScaleFactor;
  if (result.northing < 0.0) {
    result.northing = result.northing + 10000000.0;
  }

  result.northernHemisphere = lat > 0;

  return result;
};

const arcLengthOfMeridian = (phi: number) => {
  const sm_a = 6378137.0;
  const sm_b = 6356752.314;

  let alpha, beta, gamma, delta, epsilon, n;
  let result;

  n = (sm_a - sm_b) / (sm_a + sm_b);
  alpha = ((sm_a + sm_b) / 2.0) * (1.0 + Math.pow(n, 2.0) / 4.0 + Math.pow(n, 4.0) / 64.0);
  beta = (-3.0 * n) / 2.0 + (9.0 * Math.pow(n, 3.0)) / 16.0 + (-3.0 * Math.pow(n, 5.0)) / 32.0;
  gamma = (15.0 * Math.pow(n, 2.0)) / 16.0 + (-15.0 * Math.pow(n, 4.0)) / 32.0;
  delta = (-35.0 * Math.pow(n, 3.0)) / 48.0 + (105.0 * Math.pow(n, 5.0)) / 256.0;
  epsilon = (315.0 * Math.pow(n, 4.0)) / 512.0;

  result =
    alpha *
    (phi +
      beta * Math.sin(2.0 * phi) +
      gamma * Math.sin(4.0 * phi) +
      delta * Math.sin(6.0 * phi) +
      epsilon * Math.sin(8.0 * phi));

  return result;
};

const mapLatLonToXY = (phi: number, lambda: number, lambda0: number, result: any) => {
  const sm_a = 6378137.0;
  const sm_b = 6356752.314;

  var N, nu2, ep2, t, t2, l;
  var l3coef, l4coef, l5coef, l6coef, l7coef, l8coef;
  var tmp;

  ep2 = (Math.pow(sm_a, 2.0) - Math.pow(sm_b, 2.0)) / Math.pow(sm_b, 2.0);
  nu2 = ep2 * Math.pow(Math.cos(phi), 2.0);
  N = Math.pow(sm_a, 2.0) / (sm_b * Math.sqrt(1 + nu2));
  t = Math.tan(phi);
  t2 = t * t;
  tmp = t2 * t2 * t2 - Math.pow(t, 6.0);
  l = lambda - lambda0;
  l3coef = 1.0 - t2 + nu2;
  l4coef = 5.0 - t2 + 9 * nu2 + 4.0 * (nu2 * nu2);
  l5coef = 5.0 - 18.0 * t2 + t2 * t2 + 14.0 * nu2 - 58.0 * t2 * nu2;
  l6coef = 61.0 - 58.0 * t2 + t2 * t2 + 270.0 * nu2 - 330.0 * t2 * nu2;
  l7coef = 61.0 - 479.0 * t2 + 179.0 * (t2 * t2) - t2 * t2 * t2;
  l8coef = 1385.0 - 3111.0 * t2 + 543.0 * (t2 * t2) - t2 * t2 * t2;

  /* Calculate easting (x) */
  result.easting =
    N * Math.cos(phi) * l +
    (N / 6.0) * Math.pow(Math.cos(phi), 3.0) * l3coef * Math.pow(l, 3.0) +
    (N / 120.0) * Math.pow(Math.cos(phi), 5.0) * l5coef * Math.pow(l, 5.0) +
    (N / 5040.0) * Math.pow(Math.cos(phi), 7.0) * l7coef * Math.pow(l, 7.0);

  /* Calculate northing (y) */
  result.northing =
    arcLengthOfMeridian(phi) +
    (t / 2.0) * N * Math.pow(Math.cos(phi), 2.0) * Math.pow(l, 2.0) +
    (t / 24.0) * N * Math.pow(Math.cos(phi), 4.0) * l4coef * Math.pow(l, 4.0) +
    (t / 720.0) * N * Math.pow(Math.cos(phi), 6.0) * l6coef * Math.pow(l, 6.0) +
    (t / 40320.0) * N * Math.pow(Math.cos(phi), 8.0) * l8coef * Math.pow(l, 8.0);
};

const degToRad = (deg: number) => {
  return (deg / 180.0) * Math.PI;
};
