import { IMenuItem, IScenario, Istatus } from 'Scenarios/types';

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
  onContextMenuClick: Function;

  status: Istatus;
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
  date: string;
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
}

export default IScenarioItemProps;
