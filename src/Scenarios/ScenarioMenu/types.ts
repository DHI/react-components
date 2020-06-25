import { IScenario } from 'Scenarios/types';

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

export default IScenarioMenuProps;
