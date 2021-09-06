import { tap } from 'rxjs/operators';
import { fetchUrl } from '../helpers';

/**
 * /api/accounts/{id}
 * Gets an account with the specified identifier.
 * @param host
 * @param token
 * @param id
 */
const fetchAccount = (host: string, token: string, id: string) =>
  fetchUrl(`${host}/api/accounts/${id}`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

/**
 * /api/accounts
 * Gets a list of all accounts.
 * @param host
 * @param token
 */
const fetchAccounts = (host: string, token: string) =>
  fetchUrl(`${host}/api/accounts`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  });

/**
 * /api/accounts/{id}
 * Deletes the account with the specified identifier.
 * @param host
 * @param token
 * @param username
 */
const deleteAccount = (host: string, token: string, username: string) =>
  fetchUrl(`${host}/api/accounts/${username}`, {
    method: 'DELETE',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('deleted account', res)));

/**
 * /api/accounts
 * Updates an existing account.
 * NOTE: The password can be omitted from an update, but all other properties must be present. Otherwise, they will be set to null.
 * @param host
 * @param token
 * @param data
 */
const updateAccount = (host: string, token: string, data: Record<any, any>) =>
  fetchUrl(`${host}/api/accounts`, {
    method: 'PUT',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  }).pipe(tap((json) => console.log('updated user', json)));

/**
 * /api/accounts
 * Adds a new account.
 * NOTE: Adding a new account automatically activates the account.
 * @param host
 * @param token
 * @param data
 */
const createAccount = (host: string, token: string, data: Record<any, any>) =>
  fetchUrl(`${host}/api/accounts`, {
    method: 'POST',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

/**
 * /api/accounts/passwordreset
 * Generates a one-time token that allows for a password reset.
 * NOTE: Generates a one-time token that allows for a password reset for the account identified by the given email address
    or account ID. A password reset link with the generated reset token is sent to the user account in an email.
 * @param host 
 * @param user 
 * @param token 
 */
const resetPassword = (host: string, mailBody: string, emailAddress: string) =>
  fetchUrl(`${host}/api/accounts/passwordreset?mailBody=${mailBody}`, {
    method: 'POST',
    body: `"${emailAddress}"`,
  }).pipe(tap((res) => console.log('password reset', res)));

/**
 * /api/accounts/password
 * Updates the password for the user account associated with the given token.
 * NOTE: The necessary password reset token must be obtained from e.g. an email or a mobile text message.
 * @param host
 * @param token
 * @param passwordToken
 * @param newPassword
 */
const updatePassword = (host: string, token: string, newPassword: string) =>
  fetchUrl(`${host}/api/accounts/password?token=${token}`, {
    method: 'PUT',
    body: `"${newPassword}"`,
  }).pipe(tap((res) => console.log('password reset', res)));

/**
 * /api/accounts/password
 * Updates the password for the user account associated with the given token.
 * @param host
 * @param token
 * @param accountToken
 */
const activateAccount = (host: string, token: string, accountToken: string) =>
  fetchUrl(`${host}/api/accounts/password/token=${accountToken}`, {
    method: 'PUT',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('account activiated', res)));

export {
  resetPassword,
  fetchAccounts,
  deleteAccount,
  updateAccount,
  createAccount,
  fetchAccount,
  updatePassword,
  activateAccount,
};
