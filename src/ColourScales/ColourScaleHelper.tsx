export const InterpolateIntensityColor = (weight: number) => {
  const hexes = [
    '#800080',
    '#5500ab',
    '#2a00d5',
    '#0000ff',
    '#0038e1',
    '#006fc3',
    '#00a6a6',
    '#00c46e',
    '#00e237',
    '#00ff00',
    '#55ff00',
    '#aaff00',
    '#ffff00',
    '#ffaa00',
    '#ff5500',
    '#ff0000',
  ];
  const rgbs: number[][] = [];

  for (const hex of hexes) {
    const bigint = parseInt(hex.replace('#', ''), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;

    rgbs.push([r, g, b]);
  }

  for (let i = 0; i < hexes.length; i++) {
    const percentage = (i + 1) / hexes.length;
    const nextPercentage = (i + 2) / hexes.length;

    if (weight >= percentage && weight < nextPercentage) {
      const rgb = rgbs[i];

      return `#${((1 << 24) + (rgb[0] << 16) + (rgb[1] << 8) + rgb[2]).toString(16).slice(1)}`;
    }
  }

  return '#FFFFFF';
};
