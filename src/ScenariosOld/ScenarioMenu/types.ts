import { ScenarioOld, MenuItemOld } from '../types';

interface ScenarioMenuOldProps {
  /**
   * The scenario menu function handlers
   */
  onContextMenuClick: (menuItem: MenuItemOld, scenario: ScenarioOld) => void;
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
  scenario: ScenarioOld;
}

export default ScenarioMenuOldProps;
