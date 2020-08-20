interface StatusOld {
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

interface DescriptionFieldOld {
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
  condition?: ConditionOld;
}

interface MenuItemOld {
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
  condition?: ConditionOld;
  /**
   * Extra job parameters
   */
  jobParameters?: any;
}

interface ScenarioOld {
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
interface ConditionOld {
  /**
   * Id of field
   */
  field: string;
  /**
   * If value omitted, just test if field has or does not have a value ('has not' denoted by ! prefix in `field` parameter)
   */
  value?: string | string[];
}

interface QueryDatesOld {
  /**
   * Start date to fetch scenario by date
   */
  windowStart: string;
  /**
   * End date to fetch scenario by date
   */
  windowEnd: string;
}

interface ContextMenuClickHandlerOld {
  /** Handler on menu option clicked */
  (menuItem: MenuItemOld, scenario: ScenarioOld): void;
}

interface CloseDialogOld {
  /** Handler on menu option closed */
  (value: boolean): void;
}

export {
  StatusOld,
  DescriptionFieldOld,
  MenuItemOld,
  ScenarioOld,
  ConditionOld,
  QueryDatesOld,
  ContextMenuClickHandlerOld,
  CloseDialogOld,
};
