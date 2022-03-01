import { UserGroupsData } from '../../UserGroups/types';
import { MetadataProps } from '../Metadata/types';

export interface DeleteDialogProps {
  /**
   * The current Selected row from the table
   */
  selectedRow: any;
  /**
   * Boolean to open or close the popup dialog
   */
  showDialog: boolean;
  /**
   * Function to close the popup dialog
   */
  closeDialog: () => void;
  /**
   * Function to delete the row
   * @param row Selected Row
   */
  handleDelete: (row) => void;
}

export interface ActionsButtonsProps {
  /**
   * Optional: string to overwrite the cancel button label
   */
  cancelButtonText?: string;
  /**
   * string to overwrite the confirm button label
   *
   * Examples: 'Update', 'Delete', 'Submit', 'Send'
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
  isEditing?: boolean;
}

export interface PopupEditingProps {
  /**
   * Load the Popup.tsx component
   */
  popupComponent: React.FC<PopupProps>;
  /**
   * Title for the Popup component
   */
  title: string;
  /**
   * List of all the users
   */
  allUsers: Record<string, string>[];
  /**
   * Metadata supplied on the HOC to extend the table.
   */
  metadata: MetadataProps[];
  /**
   * Default columns supplied the table.
   */
  defaultColumns: any;
  /**
   * Function to save a new or editedRow data
   */
  onSave: (editedRow, isNew?) => void;
  /**
   * Tell popup if there is the Password and Repeat Password fields
   */
  hasPassword?: boolean;
  /**
   * Set User Groups default list when creating a new Account
   */
  userGroupsDefaultSelected?: string[];
}

export interface PopupProps {
  /**
   * Row with data
   */
  row: any;
  /**
   * Rows of data
   */
  rows: any;
  /**
   * Function called to change a field
   */
  onChange: (editedRow) => void;
  /**
   * Function called when user click on the dialog Save button
   */
  onApplyChanges: () => void;
  /**
   * Function called to change the Metadata data
   */
  onMetadataChange: (e) => void;
  /**
   * Function called when Cancel button is clicked
   */
  onCancelChanges: () => void;
  /**
   * Function called when the dropdown/list is changed
   */
  onListChange: (name, values) => void;
  /**
   * Boolean to open/close Dialog
   */
  open: boolean;
  /**
   * Dialog Title
   */
  title: string;
  /**
   * List of the current available users
   */
  users: Record<string, string>[];
  /**
   * Boolean to check if user is editing or creating a new row
   */
  isNew: boolean;
  /**
   * Default columns supplied the table.
   */
  defaultColumns: any;
  /**
   * Metadata data
   */
  metadata: MetadataProps[];
  /**
   * Tell popup if there is the Password and Repeat Password fields
   */
  hasPassword?: boolean;
  /**
   * Set User Groups default list when creating a new Account
   */
  userGroupsDefaultSelected?: string[];
}

export interface MetadataEditorProps {
  /**
   * Metadata data
   */
  metadata: MetadataProps[];
  /**
   * Row with the usergroup data
   */
  row: UserGroupsData;
  /**
   * Function called to change a field
   */
  onChange: (e) => void;
  /**
   * Function called when the dropdown/list is changed
   */
  onListChange: (key, values, isMetadata?) => void;
  /**
   * Function to pass if there is any error on Metadata Fields
   */
  onError: (error: boolean) => void;
}
