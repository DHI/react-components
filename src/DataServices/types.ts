interface Options {
  method?: string;
  body?: string | {};
  additionalHeaders?: Header;
}

interface DataSource {
  id?: string;
  ids?: string[];
  dataSelectors?: string[];
  host: string;
  connection: string;
  from?: string;
  to?: string;
  sheetName?: string;
}

interface User {
  id: string;
  password: string;
  otp?: string;
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
