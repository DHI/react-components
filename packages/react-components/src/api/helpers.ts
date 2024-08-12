import { from, of, throwError } from 'rxjs';
import { catchError, flatMap, map, mergeMap } from 'rxjs/operators';
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

  return response.text().then((text) => {
    return text ? JSON.parse(text) : {};
  });
};

const fetchUrl = (endPoint: RequestInfo, options?: Options, authHost?: string) => {
  const mergedOptions = {
    ...DEFAULT_OPTIONS,
    ...options,
    headers: {
      ...DEFAULT_OPTIONS.headers,
      ...options?.additionalHeaders,
    },
  };
  if(authHost){
    return from(fetch(endPoint, mergedOptions as any)).pipe(
      mergeMap((response) => {
        if (response.status === 401) { 
          return from(refreshToken(authHost)).pipe(
            mergeMap((newToken) => {
              mergedOptions.headers['Authorization'] = `Bearer ${newToken}`;
              return fetch(endPoint, mergedOptions as any);
            })
          );
        } else {
          return of(response);
        }
      }),
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
  }
  
  return from(fetch(endPoint, mergedOptions as any)).pipe(
    flatMap((response) => {
      if (response.status >= 400) {
        return response.text().then((errorText) => {
          throw new Error(errorText);
        });
      } else {
        return of(response);
      }
    }),
    flatMap((response) => checkStatus(response)),
    catchError((error) => {
      console.error('An error occurred:', error);
      return throwError(error);
    })
  );
};


const refreshToken = async (authHost: string) => {
  const refreshToken = localStorage.getItem('refreshToken');
  const response = await fetch(`${authHost}/api/tokens/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: `"${refreshToken}"`,
  });

  if (response.status !== 200) {
    window.location.assign(`login`);
  }

  const data = await response.json();

  const accessTokenList = JSON.parse(localStorage.getItem('accessTokenList'))
  const newAccessTokenList = accessTokenList.map(item => {
    if(item.host === authHost){
      return {
        ...item,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
        tokenType: data.tokenType
      }
    }
    return item
  });
  localStorage.setItem('refreshToken', data.refreshToken.token)
  localStorage.setItem('accessToken', data.accessToken.token);
  localStorage.setItem('expiration', data.accessToken.expiration)
  localStorage.setItem('accessTokenList', JSON.stringify(newAccessTokenList));
  return data.accessToken.token;
};


export { DEFAULT_OPTIONS, fetchUrl };
