import { MetadataProps } from '../common/Metadata/types';
interface AccountProps {
  /**
   * An endpoint url
   */
  host: string;
  /**
   * Autogenerated token
   */
  token: string;
  /**
   * An array of objects to be added to the table.
   */
  metadata?: MetadataProps[];
  translations?: {
    /* not impl */
  };
}

/**
 * Account Data Structure
 */
interface AccountData {
  /**
   * The account id
   */
  id: string;
  /**
   *  The account name
   */
  name: string;
  /**
   *  The account email
   */
  email: string;
  /**
   *  A list of user groups
   */
  userGroups: string[];
  /**
   *  Metadata object supplied to extend the table
   */
  metadata: {};
}

/**
 * User/Row selected
 */
interface EditUser {
  /**
   * User id
   */
  id: string;
  /**
   * User Name
   */
  name: string;
  /**
   * User email
   */
  email: string;
  /**
   * User password
   */
  password: string;
  /**
   * User repeated password
   */
  repeatPassword: string;
  /**
   * List of user groups
   */
  userGroups: string[];
  /**
   *  Metadata object supplied to extend the table
   */
  metadata: {};
}

interface AccountsFormProps {
  /**
   * An endpoint url
   */
  host: string;
  /**
   * Autogenerated token
   */
  token: string;
  /**
   *  Submit the data from the form to a HOC to create or update the data.
   */
  onSubmit: (e: any) => void;
  /**
   *  Check if the current form is on edit mode
   */
  isEditing: boolean;
  /**
   * Current selected user.
   */
  selectedUser: AccountData;
  /**
   * Function to close the Dialog once the cancel button is clicked.
   */
  onCancel: () => void;
  /**
   * Metadata supplied on the HOC to extend the table.
   */
  metadata: MetadataProps[];
}

export { AccountProps, AccountData, EditUser, AccountsFormProps };
