import { tap } from 'rxjs/operators';
import { fetchUrl } from '../helpers';
import { DataSource } from '../types';

/**
 * /api/spreadsheets/{connectionId}/{id}/{sheetName}/usedrange
 * Gets the cell values in the used range in the given sheet in the given spreadsheet.
 * @param dataSource
 * @param token
 */
const fetchSpreadsheetUsedRange = (dataSource: DataSource, token: string) =>
  fetchUrl(
    `${dataSource.host}/api/spreadsheets/${dataSource.connection}/${dataSource.id}/${dataSource.sheetName}/usedrange`,
    {
      method: 'GET',
      additionalHeaders: {
        Authorization: `Bearer ${token}`,
      },
    },
  ).pipe(tap((res) => console.log(`spread sheet fetched`, res)));

/**
 * /api/spreadsheets/{connectionId}
 * Updates an existing spreadsheet.
 * @param host
 * @param connection
 * @param token
 * @param spreadSheetToUpdate
 */
const updateSpreadsheet = (host: string, connection: string, token: string, spreadSheetToUpdate: any) =>
  fetchUrl(`${host}/api/spreadsheets/${connection}`, {
    method: 'PUT',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(spreadSheetToUpdate),
  }).pipe(tap((json) => console.log('updated spread sheet', json)));

export { fetchSpreadsheetUsedRange, updateSpreadsheet };
