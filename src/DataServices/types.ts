interface Options {
  method?: string;
  body?: string | {};
  additionalHeaders?: Header;
}

interface DataSource {
  id?: string;
  ids?: string[];
  dataSelectors?: string[];
  /**
   * Host url, normally set on .env
   */
  host: string;
  connection: string;
  /**
   * Date from
   * Format: new Date();
   */
  from?: string;
  /**
   * Date To
   * Format: new Date();
   */
  to?: string;
  sheetName?: string;
  connectionJobLog?: string;
  /**
   * NOTE: Only applicable if the connection type is grouped (hierarchical).
   * If a group is given, a list of time series full-name identifiers within the given group (recursive) is retrieved.
   */
  group?: string;
}

interface User {
  /**
   * User id/name
   */
  id: string;
  /**
   * User Password
   */
  password: string;
  /**
   * User 2FA password
   */
  otp?: string;
  /**
   * Type of Authenticator.
   */
  otpAuthenticator?: string;
}

interface Header {
  Authorization: string;
}

interface JobQuery {
  account: string;
  since: string;
  task: string;
  tag: string;
  status: string;
}

interface JobParameters {
  [key: string]: string;
}

export { Options, DataSource, Header, JobQuery, JobParameters, User };
