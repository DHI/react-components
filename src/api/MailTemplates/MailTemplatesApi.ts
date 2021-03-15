import { tap } from 'rxjs/operators';
import { fetchUrl } from '../../DataServices/DataServices';

/**
 * /api/mailtemplates/{id}
 * Gets the email template with the specified identifier.
 * @param host
 * @param token
 * @param id
 */
const fetchMailTemplate = (host: string, token: string, id: string) =>
  fetchUrl(`${host}/api/mailtemplates/${id}`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('fetch mail template', res)));

/**
 * /api/mailtemplates
 * Gets a list of all email templates.
 * @param host
 * @param token
 */
const fetchMailTemplates = (host: string, token: string) =>
  fetchUrl(`${host}/api/mailtemplates`, {
    method: 'GET',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('fetch mail templates', res)));

/**
 * /api/mailtemplates/{id}
 * Deletes the email template with the specified identifier.
 * @param host
 * @param token
 * @param id
 */
const deleteMailTemplate = (host: string, token: string, id: string) =>
  fetchUrl(`${host}/api/mailtemplates/${id}`, {
    method: 'DELETE',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
  }).pipe(tap((res) => console.log('delete mail template', res)));

/**
 * /api/mailtemplates
 * Updates an existing email template.
 * @param host
 * @param token
 * @param id
 * @param mailTemplateDTO
 */
const updateMailTemplate = (host: string, token: string, id: string, mailTemplateDTO: any) =>
  fetchUrl(`${host}/api/mailtemplates/${id}`, {
    method: 'PUT',
    additionalHeaders: {
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(mailTemplateDTO),
  }).pipe(tap((res) => console.log('delete mail template', res)));

export { updateMailTemplate, fetchMailTemplate, fetchMailTemplates, deleteMailTemplate };
