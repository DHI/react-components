interface IScenarioItemProps {
  /**
   * Style of the scenario item
   */
  classes?: any;
  menu: {
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
  scenario: {
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
  };
  /**
   * The scenario menu function handlers
   */
  onContextMenuClick: Function;

  status: {
    /**
     * Scenario status hand over message
     */
    message?: string;
    /**
     * Scenario status color
     */

    color?: string;
    /**
     * Scenario status progress percentage
     */
    progress?: number;
  };
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
   * Indicates scenario is selected or not
   */
  isSelected: boolean;
  /**
   * The Name of scenario
   */
  name: string;
  /**
   * The Date of scenario creation
   */
  date: string;
  /**
   * The Description of scenario
   */
  description: {
    /**
     * Scenario description label
     */
    name: string;
    /**
     * Scenario description value
     */
    value: string;
  }[];
}

export default IScenarioItemProps;
