interface Status {
  /**
   * Scenario status name
   */
  name?: string;
  /**
   * Scenario status color
   */
  color?: string;
  /**
   * Scenario status hand over message
   */
  message?: string;
  /**
   * Scenario status progress percentage
   */
  progress?: number;
  /**
   * Scenario icon component
   */
  Icon?: any;
}

interface DescriptionField {
  /**
   * Scenario description data field to be diplay as value
   */
  field: string;
  /**
   * Scenario description data field to be diplay as label
   */
  name: string;
  /**
   * Data type, generally for formatting purposes
   */
  dataType?: null | 'string' | 'number' | 'dateTime' | 'createdTime';
  /**
   * Format string specifier
   */
  format?: string;
  /**
   * Optional display conditions
   * Prefix with `!` to indicate _not equal to_
   */
  condition?: Condition;
}

interface MenuItem {
  /**
   * The id of scenario option menu
   */
  id: string;
  /**
   * The display name of scenario option menu
   */
  label: string;
  /**
   * The task to execute
   */
  taskId?: string;
  /**
   * The host group to use
   */
  hostGroup?: string;
  /**
   * The connection to use
   */
  connection?: string;
  /**
   * Optional display conditions
   * Prefix with `!` to indicate _not equal to_
   */
  condition?: Condition;
  /**
   * Extra job parameters
   */
  jobParameters?: any;
  /**
   * Ability to disable a button
   */
  disabled?: boolean;
}

interface ActionButton {
  name: string;
  color: string;
  handleActionButton: () => void;
}

interface ScenarioOLD {
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

interface Scenario {
  /**
   * The Id of the scenario
   */
  fullName?: string;
  /**
   * Value containing description of scenario
   */
  data: any;
  /**
   * Timestamp added when the SignalR emits a new scenario.
   */
  added?: Date;
  /**
   * Scenario Permissions
   */
  permissions?: ScenarioJsonPermissions[];
  dateTime?: string;
  /**
   * Last job actioned by this scenario
   */
  lastJob?: any;
}

interface ScenarioJsonPermissions {
  principals: string[];
  operation: string;
  type?: string;
}

/**
 * Optional display conditions
 * Prefix with `!` to indicate _not equal to_
 */
interface Condition {
  /**
   * Id of field
   */
  field: string;
  /**
   * If value omitted, just test if field has or does not have a value ('has not' denoted by ! prefix in `field` parameter)
   */
  value?: string | string[];
}

interface QueryDates {
  /**
   * Start date to fetch scenario by date
   */
  from: string;
  /**
   * End date to fetch scenario by date
   */
  to: string;
}

interface ContextMenuClickHandler {
  /** Handler on menu option clicked */
  (menuItem: MenuItem, scenario: ScenarioOLD): void;
}

interface CloseDialog {
  /** Handler on menu option closed */
  (value: boolean): void;
}

export {
  Status,
  DescriptionField,
  MenuItem,
  ActionButton,
  ScenarioOLD,
  Scenario,
  Condition,
  QueryDates,
  ContextMenuClickHandler,
  CloseDialog,
};
