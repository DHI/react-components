interface IScenarioMenuProps {
  /**
   * The scenario menu function handlers
   */
  onContextMenuClick: Function;
  menu: {
    /**
     * The id of scenario option menu
     */
    id: string;
    /**
     * The display name of scenario option menu
     */
    label: string;
  }[];
  /**
   * The scenario data
   */
  scenario: IScenario;
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
  dateTime: string;
  version: string;
  /**
   * Value containing description of scenario
   */
  data: string;
  lastJobProgress?: number;
}

interface IMenuItems {
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

export default IScenarioMenuProps;
export { IScenario, IMenuItems };
