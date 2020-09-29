interface UserGroupListProps {
  host: string;
  token: string;
  metadata?: Metadata[];
  translations?: {
    /* not impl */
  };
}

interface UserGroupTableHeaderProps {
  filter: string;
  setFilter: (event: any) => any;
  onNew: () => any;
}

interface UserGroupsData {
  id: string;
  name: string;
  users: string[];
  metadata: {};
}

interface UserGroupFormProps {
  onSubmit: (e: any) => void;
  isEditing: boolean;
  selectedUserGroup: UserGroupsData;
  onChange: (name: string, value: string[] | string) => void;
  onCancel: () => void;
  metadata: Metadata[];
}
