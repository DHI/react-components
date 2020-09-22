interface AccountListProps {
  host: string;
  token: string;
  metadataAccounts: MetadataSingleChoice | MetadataBoolean | MetadataText | MetadataMultiChoice | {};
  translations?: {
    /* not impl */
  };
}
interface AccountTableProps {
  error: boolean;
  loading: boolean;
  users: AccountData[];
  metadataAccounts: MetadataSingleChoice | MetadataBoolean | MetadataText | MetadataMultiChoice | {};
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
  metaData: [
    {
      key: string;
      label: string;
      type: string;
      options: string[];
      default: string;
    },
  ];
}

interface MetadataBase {
  key: string;
  label: string;
  type: string;
}

interface MetadataSingleChoice extends MetadataBase {
  options: string[];
  default: string;
}

interface MetadataMultiChoice extends MetadataBase {
  options: string[];
  default: string[];
}

interface MetadataBoolean extends MetadataBase {
  default: boolean;
}

interface MetadataText extends MetadataBase {
  default: string;
}

interface UserGroups {
  id: string;
  name: string;
  users: string[];
}
