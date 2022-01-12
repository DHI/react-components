import { MenuItem, Scenario } from '../types';

interface ScenarioMenuProps {
  /**
   * The scenario menu function handlers
   */
  onContextMenuClick: (menuItem: MenuItem, scenario: Scenario) => void;
  /**
   * On click event on the menu item list wrapper to send the current scenario so the menu item list can be built.
   */
  onClick: (scenario: Scenario) => void;
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
  scenario: Scenario;
}

export default ScenarioMenuProps;
