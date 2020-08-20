import { JobParameters as JobParametersOld } from '../../DataServices/types';
import { QueryDatesOld, ScenarioOld, MenuItemOld, DescriptionFieldOld, StatusOld } from '../types';

interface ScenariosOldProps {
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
  frequency?: number;
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
   * Set of job parameters
   */
  jobParameters?: JobParametersOld;
  /**
   * Value range to fetch scenario by date
   */
  queryDates?: QueryDatesOld;
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
  status: StatusOld[];
  /**
   * Customising scenario description field display
   */
  descriptionFields?: DescriptionFieldOld[];
  /**
   * Customising scenario extra field display
   */
  extraFields?: DescriptionFieldOld[];
  /**
   * The scenario menu options
   */
  menuItems: MenuItemOld[];
  /**
   * The scenario menu function handlers
   */
  onContextMenuClick: (menuItem: MenuItemOld, scenario: ScenarioOld) => void;
  /**
   * Emit event to client when scenario selected by user (basic scenario data)
   */
  onScenarioSelected: (scenario: ScenarioOld) => void;
  /**
   * Emit event to client when scenario received from the server after a selection (full scenario data)
   */
  onScenarioReceived: (scenario: ScenarioOld) => void;
  /**
   * Emit even to client when list of scenarios received from the server
   */
  onScenariosReceived: (scenarios: ScenarioOld[]) => void;
  /**
   * The object data to be added as new scenario (optional)
   */
  addScenario?: ScenarioOld | undefined;
  /**
   * Time zone (IANA format) for date display
   */
  timeZone?: string;
}

export default ScenariosOldProps;
