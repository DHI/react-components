import { MenuItemOld, ScenarioOld, DescriptionFieldOld, StatusOld } from '../types';

interface ScenarioListOldProps {
  /**
   * Style of the list
   */
  classes?: any;
  /**
   * List of menu items
   */
  menuItems: MenuItemOld[];
  /**
   * The list of scenario
   */
  scenarios: ScenarioOld[];
  /**
   * Property field to specify the scenario name
   */
  nameField: string;
  /**
   * Customising scenario description field display
   */
  descriptionFields?: DescriptionFieldOld[];
  /**
   * Customising scenario extra field display
   */
  extraFields?: DescriptionFieldOld[];
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
  onContextMenuClick: (menuItem: MenuItemOld, scenario: ScenarioOld) => void;
  /**
   * Emit event to client when scenario selected by user
   */
  onScenarioSelected: (scenario: ScenarioOld) => void;
  /**
   * Customising scenario status display
   */
  status: StatusOld[];
  /**
   * Time zone (IANA format) for date display
   */
  timeZone?: string;
}

export default ScenarioListOldProps;
