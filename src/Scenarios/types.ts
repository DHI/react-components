interface Istatus {
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

interface IDescriptionField {
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
  condition?: ICondition;
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

interface ICondition {
  /**
   * Additional condition of description field
   */
  field: string;
  /**
   * Additional condition of description value
   */
  value: string;
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
   * Value to be add as a cancel button text
   */
  dialogCancelLabel?: string;
  /**
   * Value to be add as a confirm button text
   */
  dialogConfirmLabel?: string;
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

export { Istatus, IDescriptionField, IMenuItem, IScenario, ICondition, IDialog, IQueryDates };
