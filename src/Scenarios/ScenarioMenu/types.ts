interface IScenarioMenuProps {
  onContextMenuClick: any;
  menu: {
    id: string;
    label: string;
  }[];
  scenario: any;
}

export default IScenarioMenuProps;
