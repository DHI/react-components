interface AccountListProps {
  host: string;
  token: string;
  metadataAccounts: MetadaAccounts[] | [];
  translations?: {
    /* not impl */
  };
}
interface AccountTableProps {
  error: boolean;
  loading: boolean;
  users: AccountData[];
  metadataAccounts: MetadaAccounts[] | [];
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
  type: string;
}

// interface MetadataSingleChoice extends MetadataBase {
//   options?: string[];
//   default?: string | boolean;
// }

// interface MetadataMultiChoice extends MetadataBase {
//   options?: string[];
//   default?: string[];
// }

// interface MetadataBoolean extends MetadataBase {
//   default?: boolean;
// }

// interface MetadataText extends MetadataBase {
//   default?: string;
// }

interface MetadaAccounts extends MetadataBase {
  options?: string[];
  default: string | boolean | string[];
}

interface UserGroups {
  id: string;
  name: string;
  users: string[];
}
