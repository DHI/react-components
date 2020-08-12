type AccountListProps = {
  host: string;
  token: string;
  translations?: {
    /* not impl */
  };
};
type AccountData = {
  id: string;
  name: string;
  email: string;
  userGroups: string[];
};

type EditUser = {
  id: string;
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  userGroups: string[];
};

type UserGroups = {
  id: string;
  name: string;
  users: string[];
};
