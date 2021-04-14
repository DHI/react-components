import { fetchUrl } from '../helpers';
import { DataSource } from '../types';

/**
 * /api/maps/{connectionId}
 * Returns a list of base64 encoded bitmap images.
 * @param dataSource
 * @param config
 * @param token
 */
const fetchMapAnimationFiles = (
  dataSource: DataSource,
  config: {
    style: any;
    item: any;
    width: any;
    height: any;
    bbox: any;
    shadingType: any;
    scale: any;
  },
  token: string,
) => {
  const url = `${dataSource.host}/api/maps/${dataSource.connection}?&style=${config.style}&item=${config.item}&width=${config.width}&height=${config.height}&bbox=${config.bbox}&shadingtype=${config.shadingType}&scale=${config.scale}`;

  return fetchUrl(url, {
    method: 'POST',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(dataSource.ids),
  });
};

export { fetchMapAnimationFiles };
