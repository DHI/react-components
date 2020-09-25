interface AccountListProps {
  host: string;
  token: string;
  metadataAccounts?: MetadataAccount[];
  translations?: {
    /* not impl */
  };
}
interface AccountTableProps {
  error: boolean;
  loading: boolean;
  users: AccountData[];
  metadataAccounts?: MetadataAccount[];
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
  metadata: any;
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

interface MetadataBase {
  key: string;
  label: string;
  type: 'SingleChoice' | 'MultiChoice' | 'Text' | 'Boolean';
}

type MetadataDefault = string | boolean | string[];

interface MetadataAccount extends MetadataBase {
  options?: string[];
  default: MetadataDefault;
}

interface UserGroups {
  id: string;
  name: string;
  users: string[];
}
