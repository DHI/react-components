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
  };
  /**
   * Customising scenario status display
   */
  status: {
    /**
     * Scenario status name
     */
    name: string;
    /**
     * Scenario status color
     */
    color: string;
    /**
     * Scenario status hand over message
     */
    message: string;
    /**
     * Scenario status progress percentage
     */
    progress?: number;
  }[];
  /**
   * Customising scenario description field display
   */
  descriptionFields: {
    /**
     * Scenario description data field to be diplay as value
     */
    field: string;
    /**
     * Scenario description data field to be diplay as label
     */
    name: string;
    /**
     * Optional condition to be display as description
     */
    condition?: {
      field: string;
      value: string;
    };
  }[];
  /**
   * The scenario menu options
   */
  menuItems: IMenuItem[];
  /**
   * The scenario menu function handlers
   */
  onContextMenuClick: Function;
  /**
   * The object data to be add as new scenario
   */
  addScenario: IScenario;
}

interface IScenario {
  /**
   * The Id of the scenario
   */
  id?: string;
  /**
   * Last status of scenario
   */
  lastJobStatus?: string;
  lastJobId?: string;
  /**
   * Date and time when scenario is created
   */
  dateTime?: string;
  version?: string;
  /**
   * Value containing description of scenario
   */
  data: string;
  lastJobProgress?: number;
}

interface IMenuItem {
  /**
   * The id of scenario option menu
   */
  id: string;
  /**
   * The display name of scenario option menu
   */
  label: string;
  taskId?: string;
  connection?: string;
  condition?: {
    field: string;
    value: string;
  };
}

interface IDialog {
  /**
   * Value to be display as dialog title
   */
  dialogTitle?: string;
  /**
   * Value to be display as content of dialog
   */
  dialogMessage?: string;
  /**
   * A function when dialog is confirmed
   */
  dialogCommand?: Function;
  /**
   * Indicates the dialog is displayed or not
   */
  showDialog: boolean;
}

interface IQueryDates {
  /**
   * Start date to fetch scenario by date
   */
  windowStart: string;
  /**
   * End date to fetch scenario by date
   */
  windowEnd: string;
}

export default IScenariosProps;
export { IScenario, IMenuItem, IDialog, IQueryDates };
