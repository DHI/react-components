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
  dataType?: null | 'string' | 'number' | 'dateTime';
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
  taskId?: string;
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
}

interface Scenario {
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
  windowStart: string;
  /**
   * End date to fetch scenario by date
   */
  windowEnd: string;
}

interface ContextMenuClickHandler {
  /** Handler on menu option clicked */
  (menuItem: MenuItem, scenario: Scenario): void;
}

interface CloseDialog {
  /** Handler on menu option closed */
  (value: boolean): void;
}

export { Status, DescriptionField, MenuItem, Scenario, Condition, QueryDates, ContextMenuClickHandler, CloseDialog };
