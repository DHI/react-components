import { DescriptionField, MenuItem, Scenario, Status } from '../types';

interface ScenarioListOLDProps {
  /**
   * Style of the list
   */
  classes?: any;
  /**
   * List of menu items
   */
  menuItems: MenuItem[];
  /**
   * The list of scenario
   */
  scenarios: Scenario[];
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
   * The scenario menu function handlers
   */
  onContextMenuClick: (menuItem: MenuItem, scenario: Scenario) => void;
  /**
   * Emit event to client when scenario selected by user
   */
  onScenarioSelected: (scenario: Scenario) => void;
  /**
   * Customising scenario status display
   */
  status: Status[];
  /**
   * Time zone (IANA format) for date display
   */
  timeZone?: string;
  /**
   * Show mooring notifications in scenario items
   */
  showMooringStatus?: boolean;
}

export default ScenarioListOLDProps;
