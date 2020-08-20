interface AccountListProps {
  host: string;
  token: string;
  translations?: {
    /* not impl */
  };
}
interface AccountTableProps {
  error: boolean;
  loading: boolean;
  users: AccountData[];
  onNew: () => void;
  onEdit: (data: any) => void;
  onDelete: (data: any) => void;
}

interface ActionCellProps {
  item: Record<any, any>;
  onEdit: (data: Record<any, any>) => void;
  onDelete: (data: Record<any, any>) => void;
}

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
