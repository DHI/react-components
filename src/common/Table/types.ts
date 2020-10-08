interface DefaultTableProps {
  /**
   * Error returned if there is no results when data is fetched
   */
  error: boolean;
  /**
   * Boolean to inform is the data fetched.
   */
  loading: boolean;
  /**
   * List of Header and Accessor to build the table headers.
   */
  tableHeaders: TableHeaders[];
  /**
   * Table data once fetched.
   */
  data: TableData[];
  /**
   * Items where the search filter checks for data.
   */
  searchItems: (item: any) => void;
}

interface TableHeaders {
  /**
   * Header Label
   */
  Header: string;
  /**
   * Header name
   */
  accessor: string;
}

interface TableData {
  /**
   * Table row ID
   */
  id: string;
  /**
   * Table row name
   */
  name: string;
  /**
   * Optional: table row email
   */
  email?: string;
  /**
   * Optional: table row list of user groups
   */
  userGroups?: string[];
  /**
   * Optional: table row list of users
   */
  users?: string[];
  /**
   * Table row metadata
   */
  metadata?: {};
}

interface ActionsButtonsProps {
  /**
   * Optional: string to overwrite the cancel button label
   */
  cancelButtonText?: string;
  /**
   * string to overwrite the confirm button label
   *
   * Example: 'Update', 'Delete', 'Submit', 'Send'
   */
  confirmButtonText: string;
  /**
   * Function to close the Dialog once the cancel button is clicked.
   */
  onCancel: (item: {}) => void;
  /**
   *  Submit the data from the form to a HOC to create or update the data.
   */
  onSubmit: (e) => void;
  /**
   *  Check if the current form is on edit mode
   */
  isEditing: boolean;
}

/**
 * Section above the table
 */
interface TopTableSectionProps {
  /**
   * Section Title
   */
  title: string;
  /**
   * value passed to filter the data in the table.
   */
  filter: string;
  /**
   * Function to filter the current data in the table.
   */
  setFilter: (event: string) => void;
  /**
   * Function to open an empty form
   */
  onNew: () => void;
}

interface ActionCellProps {
  /**
   * Data from the row
   */
  item: Record<any, any>;
  /**
   * Function to open the dialog with the current data in it.
   */
  onEdit: (data: Record<any, any>) => void;
  /**
   * Function to open the dialog with the current user name and id in it.
   */
  onDelete: (data: Record<any, any>) => void;
  /**
   * category to go into the action button labels.
   * Default: User
   */
  category?: string;
}

export { DefaultTableProps, TableHeaders, TableData, ActionsButtonsProps, TopTableSectionProps, ActionCellProps };
