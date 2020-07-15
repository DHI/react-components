import { DescriptionField, IMenuItem, IScenario, IStatus } from '../types';

interface IScenarioListProps {
  /**
   * Style of the list
   */
  classes?: any;
  /**
   * The scenario menu function handlers
   */
  onContextMenuClick: (menuItem: IMenuItem, scenario: IScenario) => void;
  /**
   * List of menu items
   */
  menuItems: IMenuItem[];
  /**
   * The list of scenario
   */
  scenarios: IScenario[];
  /**
   * Property field to specify the scenario name
   */
  nameField: string;
  /**
   * Customising scenario description field display
   */
  descriptionFields?: DescriptionField[];
  /**
   * Customising scenario extra field display
   */
  extraFields?: DescriptionField[];
  /**
   * Indicates if the date of the scenario should be shown
   */
  showDate: boolean;
  /**
   * Indicates if the hour of the scenario should be shown
   */
  showHour: boolean;
  /**
   * Indicates if the menu options of the scenario should be shown
   */
  showMenu: boolean;
  /**
   * Indicates if the status of the scenario should be shown
   */
  showStatus: boolean;
  /**
   * The id of selected scenario when it clicked
   */
  selectedScenarioId?: string;
  /**
   * Customising scenario status display
   */
  status: IStatus[];
  /**
   * Time zone (IANA format) for date display
   */
  timeZone?: string;
}

export default IScenarioListProps;
