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
  allUsers: string[];
  /**
   * Metadata supplied on the HOC to extend the table.
   */
  metadata: MetadataProps[];
  /**
   * Function to save a new or editedRow data
   */
  onSave: (editedRow, isNew?) => void;
}

export interface PopupProps {
  /**
   * Row with the usergroup data
   */
  row: any;
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
  users: string[];
  /**
   * Boolean to check if user is editing or creating a new row
   */
  isNew: boolean;
  /**
   * Metadata data
   */
  metadata: MetadataProps[];
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
