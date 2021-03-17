import { JobParameters } from '../../DataServices/types';
import { DescriptionField, MenuItem, QueryDates, Scenario, Status } from '../types';

interface ScenariosProps {
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
  taskId: string;
  /**
   * The hostgroup used to execute the job
   */
  hostGroup?: string;
  /**
   * The id of selected scenario when it clicked
   */
  selectedScenarioId?: string;
  /**
   * Time interval to fetch data in second
   */
  frequency?: number;
  /**
   * Object to filter data by its property
   * @param field object property e.g.: data.mooring
   * @param value to filter to a specific value
   */
  dataFilterbyProperty?: dataFilterbyPropertyObj[];
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
  jobParameters?: JobParameters;
  /**
   * Temporary for discarding modules which do not match
   */
  module?: string;
  /**
   * Value range to fetch scenario by date
   */
  queryDates?: QueryDates;
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
     * Scenario clone Title dialog
     */
    cloneTitle?: string;
    /**
     * Scenario clone confirmation dialog
     */
    cloneConfirmation?: string;
    /**
     * Scenario delete title dialog
     */
    deleteTitle?: string;
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
  status: Status[];
  /**
   * Customising scenario description field display
   */
  descriptionFields?: DescriptionField[];
  /**
   * Customising scenario extra field display
   */
  extraFields?: DescriptionField[];
  /**
   * The scenario menu options
   */
  menuItems: MenuItem[];
  /**
   * The scenario menu function handlers
   */
  onContextMenuClick: (menuItem: MenuItem, scenario: Scenario) => void;
  /**
   * Emit event to client when scenario selected by user (basic scenario data)
   */
  onScenarioSelected: (scenario: Scenario) => void;
  /**
   * Emit event to client when scenario received from the server after a selection (full scenario data)
   */
  onScenarioReceived: (scenario: Scenario) => void;
  /**
   * Emit even to client when list of scenarios received from the server
   */
  onScenariosReceived: (scenarios: Scenario[]) => void;
  /**
   * The object data to be added as new scenario (optional)
   */
  addScenario?: Scenario | undefined;
  /**
   * Time zone (IANA format) for date display
   */
  timeZone?: string;
}

interface dataFilterbyPropertyObj {
  field: string;
  value?: string | null;
}

export default ScenariosProps;
