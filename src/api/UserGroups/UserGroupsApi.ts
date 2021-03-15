import { tap } from 'rxjs/operators';
import { fetchUrl } from '../../DataServices/DataServices';
import { UserGroupsData } from '../../UserGroups/types';

// Could be an account name or `me`.

/**
 * /api/usergroups
 * Gets a list of all user groups.
 * @param host
 * @param token
 */
const fetchUserGroups = (host: string, token: string) =>
  fetchUrl(`${host}/api/usergroups`, {
    method: 'GET',
    additionalHeaders: { Authorization: `Bearer ${token}` },
  }).pipe(tap((res) => console.log('fetchUserGroups', res)));

/**
 * /api/usergroups/user/{userId}
 * Adds a user to all groups with the specified identifiers.
 * @param host
 * @param token
 * @param data
 */
const updateUserGroupsForUser = (host: string, token: string, data: { userId: string; groups: string[] }) =>
  fetchUrl(`${host}/api/usergroups/user/${data.userId}`, {
    method: 'POST',
    additionalHeaders: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data.groups),
  }).pipe(tap((res) => console.log('fetchUserGroups', res)));

/**
 * /api/usergroups
 * Adds a new user group.
 * @param host
 * @param token
 * @param data
 */
const createUserGroup = (host: string, token: string, data: UserGroupsData) =>
  fetchUrl(`${host}/api/usergroups`, {
    method: 'POST',
    additionalHeaders: { Authorization: `Bearer ${token}` },
    body: JSON.stringify(data),
  }).pipe(tap((res) => console.log('createUserGroup', res)));

/**
 * /api/usergroups
 * Updates an existing user group.
 * @param host
 * @param token
 * @param data
 */
const updateUserGroups = (host: string, token: string, data: UserGroupsData) =>
  fetchUrl(`${host}/api/usergroups`, {
    method: 'PUT',
    additionalHeaders: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({
      id: data.id,
      name: data.name,
      users: data.users,
      metadata: data.metadata,
    }),
  }).pipe(tap((res) => console.log('updateUserGroups', res)));

/**
 * /api/usergroups/{id}
 * Deletes the user group with the specified identifier.
 * @param host
 * @param token
 * @param id
 */
const deleteUserGroup = (host: string, token: string, id: string) =>
  fetchUrl(`${host}/api/usergroups/${id}`, {
    method: 'DELETE',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('deleted account', res)));

export { fetchUserGroups, updateUserGroupsForUser, createUserGroup, updateUserGroups, deleteUserGroup };
