interface TreeViewProps {
  list: TreeViewExtraProps[];
  onExpand: (expand) => void;
  onChecked: (checked) => void;
}

interface TreeViewExtraProps extends TreeViewListProps {
  topLevel?: boolean;
  children?: TreeViewListProps[];
}

interface TreeViewListProps {
  value: string;
  label: string;
}

export { TreeViewProps, TreeViewExtraProps, TreeViewListProps };
