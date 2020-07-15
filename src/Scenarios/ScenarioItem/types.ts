import { IMenuItem, IScenario, IStatus } from '../types';

interface IScenarioItemProps {
  /**
   * Style of the scenario item
   */
  classes?: any;
  menu: IMenuItem[];
  scenario: IScenario;
  /**
   * The scenario menu function handlers
   */
  onContextMenuClick: (menuItem: IMenuItem, scenario: IScenario) => void;

  status: IStatus;
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

export default IScenarioItemProps;
