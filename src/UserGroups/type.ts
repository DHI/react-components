interface UserGroupListProps {
  host: string;
  token: string;
  metadataUserGroups?: MetadataUserGoups[];
  translations?: {
    /* not impl */
  };
}

interface UserGroupTableHeaderProps {
  filter: string;
  setFilter: (event: any) => any;
  onNew: () => any;
}

interface MetadataBase {
  key: string;
  label: string;
  type: 'SingleChoice' | 'MultiChoice' | 'Text' | 'Boolean';
}

interface MetadataUserGoups extends MetadataBase {
  options?: string[];
  default: MetadataDefault;
}

interface UserGroupsData {
  id: string;
  name: string;
  users: string[];
}

interface UserGroupFormProps {
  onSubmit: (e: any) => void;
  isEditing: boolean;
  selectedUserGroup: UserGroupsData;
  onChange: (name: string, value: string[] | string) => void;
  onCancel: () => void;
}
