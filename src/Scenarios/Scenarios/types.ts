import { IDescriptionField, IMenuItem, IQueryDates, IScenario, IStatus } from '../types';

interface IScenariosProps {
  /**
   * Property field to specify the scenario name
   */
  nameField: string;
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
   * The id to execute scenario
   */
  taskId?: string;
  /**
   * The id of selected scenario when it clicked
   */
  selectedScenarioId?: string;
  /**
   * Time interval to fetch data in second
   */
  frequency: number;
  /**
   * Backend host
   */
  host: string;
  /**
   * Authorization header to backend call
   */
  token: string;
  /**
   * Scenario connection to fetch scenario by date
   */
  scenarioConnection: string;
  /**
   * Connection to fetch data from backend
   */
  jobConnection: string;
  /**
   * Value range to fetch scenario by date
   */
  queryDates?: IQueryDates;
  /**
   * Customising translation dialog
   */
  translations?: {
    /**
     * Scenario termination confirmation dialog
     */
    terminateConfirmation?: string;
    /**
     * Scenario execution confirmation dialog
     */
    executeConfirmation?: string;
    /**
     * Scenario clone confirmation dialog
     */
    cloneConfirmation?: string;
    /**
     * Scenario deletion confirmation dialog
     */
    deleteConfirmation?: string;
    /**
     * Value to be add as a cancel button text
     */
    cancelLabel?: string;
    /**
     * Value to be add as a confirm button text
     */
    confirmLabel?: string;
  };
  /**
   * Customising scenario status display
   */
  status: IStatus[];
  /**
   * Customising scenario description field display
   */
  descriptionFields: IDescriptionField[];
  /**
   * The scenario menu options
   */
  menuItems: IMenuItem[];
  /**
   * The scenario menu function handlers
   */
  onContextMenuClick: (menuItem: IMenuItem, scenario: IScenario) => void;
  /**
   * The object data to be add as new scenario
   */
  addScenario: IScenario | undefined;
}

export default IScenariosProps;
