import { MenuItemOld, ScenarioOld, StatusOld } from '../types';

interface ScenarioItemOldProps {
  /**
   * Style of the scenario item
   */
  classes?: any;
  menu: MenuItemOld[];
  scenario: ScenarioOld;
  /**
   * The scenario menu function handlers
   */
  onContextMenuClick: (menuItem: MenuItemOld, scenario: ScenarioOld) => void;

  status: StatusOld;
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

export default ScenarioItemOldProps;
