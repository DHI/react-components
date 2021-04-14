import { tap } from 'rxjs/operators';
import { fetchUrl } from '../helpers';

/**
 * /api/mapstyles/{id}/palette
 * Gets the palette for the map style with the specified identifier.
 * @param host
 * @param token
 * @param id
 */
const fetchMapStylePalette = (host: string, token: string, id: string) =>
  fetchUrl(`${host}/api/mapstyles/${id}/palette`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('fetch style palette', res)));

/**
 * /api/mapstyles/{id}
 * Gets the map style with the specified identifier.
 * @param host
 * @param token
 * @param id
 */
const fetchMapStyle = (host: string, token: string, id: string) =>
  fetchUrl(`${host}/api/mapstyles/${id}`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('fetch style', res)));

/**
 * /api/mapstyles
 * Gets a list of all map styles.
 * @param host
 * @param token
 */
const fetchMapStyles = (host: string, token: string) =>
  fetchUrl(`${host}/api/mapstyles`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('fetch style', res)));

/**
 * /api/mapstyles
 * Adds a new map style.
 * @param host
 * @param token
 * @param styleDTO
 */
const createMapStyle = (host: string, token: string, styleDTO: any) =>
  fetchUrl(`${host}/api/mapstyles`, {
    method: 'POST',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(styleDTO),
  }).pipe(tap((res) => console.log('fetch style', res)));

/**
 * /api/mapstyles/count
 * Gets the total number of map styles.
 * @param host
 * @param token
 */
const fetchMapStyleCount = (host: string, token: string) =>
  fetchUrl(`${host}/api/mapstyles/count`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('fetch style', res)));

/**
 *
 * /api/mapstyles/{id}
 * Deletes the map style with the specified identifier.
 * @param host
 * @param token
 * @param id
 */
const deleteMapStyle = (host: string, token: string, id: string) =>
  fetchUrl(`${host}/api/mapstyles/${id}`, {
    method: 'DELETE',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('delete style', res)));

export { fetchMapStylePalette, fetchMapStyle, fetchMapStyles, createMapStyle, fetchMapStyleCount, deleteMapStyle };
