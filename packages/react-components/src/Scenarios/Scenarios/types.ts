import { JobParameters } from '../../api/types';
import { DescriptionField, MenuItem, QueryDates, Scenario, Status, ActionButton } from '../types';

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
   * Indicates if the date groups of the scenario list should be shown
   */
  showDateGroups?: boolean;
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
   * Backend host for jobs (if omitted, will use regular `host`)
   */
  jobHost?: string;
  /**
   * Authorization header to backend call
   */
  token: string;
  /**
   * Backend token for jobs (if omitted, will use regular `token`)
   */
  jobToken?: string;
  /**
   * Object to filter data
   */
  queryBody?: QueryBody[];
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
   * Job query item key (eg. ScenarioId / EventId)
   */
  jobQueryItemKey: string;
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
   * Highlight name field with an accent colour if status matches this
   */
  highlightNameOnStatus: string;
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
   * An action button which sits on the right hand side, below the menu
   */
  actionButton?: ActionButton;
  /**
   * Should show the report button?
   */
  showReportButton: boolean;
  /**
   * Should show the edit button?
   */
  showEditButton: boolean;
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
   * A ReactElement which is overridable to change the row's display.
   * @param scenario
   */
  onRenderScenarioItem?: (scenario: Scenario) => void;
  /**
   * A ReactElement which is overridable to change the icon's display.
   * @param scenario
   */
  onRenderScenarioIcon?: (scenario: Scenario) => void;
  /**
   * The object data to be added as new scenario (optional)
   */
  addScenario?: Scenario | undefined;
  /**
   * Time zone (IANA format) for date display
   */
  timeZone?: string;
  /**
   * Set debug mode on to track what SignalR is emitting
   */
  debug?: boolean;
  /**
   * SignalR connection hub URL.
   */
  signalRConnectionHubUrl: string;
}

interface QueryBody {
  Item: string;
  QueryOperator: string;
  Value: string;
}

interface dataFilterbyPropertyObj {
  field: string;
  value?: string | null;
}

export default ScenariosProps;
export { QueryBody };
