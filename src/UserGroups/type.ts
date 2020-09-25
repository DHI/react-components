interface UserGroupListProps {
  host: string;
  token: string;
  metadataUserGroups?: MetadataUserGoups[];
  translations?: {
    /* not impl */
  };
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

interface UserGoupsData {
  id: string;
  name: string;
  users: string[];
}
