import { fromFetch } from 'rxjs/fetch';
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
    style: string;
    item: number;
    width: number;
    height: number;
    bbox: string;
    shadingType: string;
    scale: number;
  },
  token: string,
) => {
  const url = `${dataSource.host}/api/maps/${dataSource.connection}?&styles=${config.style}&items=${config.item}&width=${config.width}&height=${config.height}&bbox=${config.bbox}&shadingtype=${config.shadingType}&scale=${config.scale}`;

  return fromFetch(url, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(dataSource.ids),
  });
};

export { fetchMapAnimationFiles };
