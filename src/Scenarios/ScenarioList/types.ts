import { IDescriptionField, IMenuItem, IScenario, Istatus } from 'Scenarios/types';

interface IScenarioListProps {
  /**
   * Style of the list
   */
  classes?: any;
  /**
   * The scenario menu function handlers
   */
  onContextMenuClick: Function;
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
  descriptionFields: IDescriptionField[];
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
  status: Istatus[];
}

export default IScenarioListProps;
