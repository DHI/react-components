import { from, of, throwError } from 'rxjs';
import { catchError, flatMap, map, tap } from 'rxjs/operators';
import { Options } from '../api/types';

const DEFAULT_OPTIONS = {
  headers: {
    'Content-Type': 'application/json',
  },
};

const checkStatus = (response: Response) => {
  if (response.status === 204 || response.status === 202) {
    return of(response);
  }

  return response.json();
};

const fetchUrl = (endPoint: RequestInfo, options?: Options) => {
  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
    headers: {
      ...DEFAULT_OPTIONS.headers,
      ...options?.additionalHeaders,
    },
  };

  return from(fetch(endPoint, mergedOptions as any)).pipe(
    tap((response) => console.log(`Response status: ${response.status}`)),
    map((response) => {
      if (response.status >= 400) {
        throw new Error(`Error: ${response.status}, reason: ${response.statusText}`);
      } else {
        return response;
      }
    }),
    flatMap((response) => checkStatus(response)),
    catchError((error) => throwError(error)),
  );
};

export { DEFAULT_OPTIONS, fetchUrl };
