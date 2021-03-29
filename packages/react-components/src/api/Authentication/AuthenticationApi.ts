import { tap } from 'rxjs/operators';
import { Token } from '../../Auth/types';
import { DEFAULT_OPTIONS, fetchUrl } from '../helpers';
import { User } from '../types';

/**
 * /api/tokens
 * Creates a JWT authorization token.
 * @param host
 * @param user
 */
const fetchToken = (host: string, user: User) => {
  return fetchUrl(`${host}/api/tokens`, {
    method: 'POST',
    body: JSON.stringify(user),
  }).pipe<Token>(
    tap(
      (res) => console.log('token res', res),
      (error) => console.log(error),
    ),
  );
};

/**
 * /api/tokens/validation
 * Performs validation of token.
 * @param host
 * @param token
 */
const validateToken = (host: string, token: string) => {
  return fetch(`${host}/api/tokens/validation`, {
    ...DEFAULT_OPTIONS,
    method: 'POST',
    body: JSON.stringify(token),
  });
};

export { fetchToken, validateToken };
