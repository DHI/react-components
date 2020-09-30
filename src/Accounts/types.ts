interface AccountListProps {
  host: string;
  token: string;
  metadata?: Metadata[];
  translations?: {
    /* not impl */
  };
}
interface AccountTableProps {
  error: boolean;
  loading: boolean;
  users: AccountData[];
  metadata?: Metadata[];
  onNew: () => void;
  onEdit: (data: any) => void;
  onDelete: (data: any) => void;
}

interface ActionCellProps {
  item: Record<any, any>;
  onEdit: (data: Record<any, any>) => void;
  onDelete: (data: Record<any, any>) => void;
}

interface AccountData {
  id: string;
  name: string;
  email: string;
  userGroups: string[];
  metadata: {};
}

interface AccountTableHeaderProps {
  filter: string;
  setFilter: (event: any) => any;
  onNew: () => any;
}

interface EditUser {
  id: string;
  name: string;
  email: string;
  password: string;
  repeatPassword: string;
  userGroups: string[];
  metadata: {};
}

interface UserGroups {
  id: string;
  name: string;
  users: string[];
  metadata: {};
}

interface AccountsFormProps {
  host: string;
  token: string;
  onSubmit: (e: any) => void;
  isEditing: boolean;
  selectedUser: AccountData;
  onCancel: () => void;
  metadata: Metadata[];
}
