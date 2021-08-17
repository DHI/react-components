import { DescriptionField, MenuItem, Scenario, ScenarioOLD, Status, ActionButton } from '../types';

interface ScenarioListProps {
  /**
   * Style of the list
   */
  classes?: any;
  /**
   * List of menu items
   */
  menuItems: MenuItem[];
  /**
   * An action button which sits on the right hand side, below the menu
   */
  actionButton?: ActionButton;
  /**
   * The list of scenario
   */
  scenarios: ScenarioOLD[];
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
   * Highlight name field with an accent colour if status matches this
   */
  highlightNameOnStatus: string;
  /**
   * Time zone (IANA format) for date display
   */
  timeZone?: string;
}

export default ScenarioListProps;
