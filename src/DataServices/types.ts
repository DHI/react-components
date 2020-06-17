interface Options {
  method?: string;
  body?: string;
  headers?: any;
  'Content-Type'?: string;
}

interface DataSource {
  dataSelectors?: any[];
  host: string;
  connection: string;
  from?: string;
  to?: string;
}

interface User {
  id: string;
  password: string;
}

export { Options, DataSource, User };
