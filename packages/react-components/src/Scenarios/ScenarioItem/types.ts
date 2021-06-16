import { MenuItem, Scenario, ScenarioOLD, Status } from '../types';

// TODO: remove ScenarioItemProps
interface ScenarioItemOLDProps {
  /**
   * Style of the scenario item
   */
  classes?: any;
  menu: MenuItem[];
  scenario: ScenarioOLD;
  /**
   * The scenario menu function handlers
   */
  onContextMenuClick: (menuItem: MenuItem, scenario: ScenarioOLD) => void;
  /**
   * Scenario item click event handler
   */
  onClick: (scenario) => void;

  status: Status;
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
   * Indicates scenario is selected or not
   */
  isSelected: boolean;
  /**
   * The Name of scenario
   */
  name: string;
  /**
   * The Date of scenario creation
   */
  date: string | null;
  /**
   * The Description of scenario
   */
  description: {
    /**
     * Scenario description label
     */
    name: string;
    /**
     * Scenario description value
     */
    value: string;
  }[];
  /**
   * Time zone (IANA format) for date display
   */
  timeZone?: string;
}

interface ScenarioItemProps {
  /**
   * Style of the scenario item
   */
  classes?: any;
  menu: MenuItem[];
  scenario: Scenario;
  /**
   * The scenario menu function handlers
   */
  onContextMenuClick: (menuItem: MenuItem, scenario: Scenario) => void;

  status: Status;
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
   * Indicates scenario is selected or not
   */
  isSelected: boolean;
  /**
   * The Name of scenario
   */
  name: string;
  /**
   * The Date of scenario creation
   */
  date: Scenario | null;
  /**
   * The Description of scenario
   */
  description: {
    /**
     * Scenario description label
     */
    name: string;
    /**
     * Scenario description value
     */
    value: string;
  }[];
  /**
   * Time zone (IANA format) for date display
   */
  timeZone?: string;
}

export { ScenarioItemProps as ScenarioItemJSONProps };
export default ScenarioItemOLDProps;
