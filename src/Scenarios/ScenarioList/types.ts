interface IScenarioListProps {
  /**
   * Style of the list
   */
  classes?: any;
  /**
   * The scenario menu function handlers
   */
  onContextMenuClick: Function;
  menuItems: {
    /**
     * The id of scenario option menu
     */
    id: string;
    /**
     * The display name of scenario option menu
     */
    label: string;
    condition?: {
      field: string;
      value: string;
    };
  }[];
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
}

interface IScenario {
  /**
   * The Id of the scenario
   */
  id: string;
  /**
   * Last status of scenario
   */
  lastJobStatus: string;
  lastJobId: string;
  /**
   * Date and time when scenario is created
   */
  dateTime: string;
  version: string;
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

export default IScenarioListProps;
export { IScenario, ICondition, IDescriptionField };
