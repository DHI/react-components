interface IScenarioMenuProps {
  onContextMenuClick: Function;
  menu: {
    id: string;
    label: string;
  }[];
  scenario: {
    id: string;
    lastJobStatus: string;
    lastJobId: string;
    dateTime: string;
    version: string;
    data: string;
    lastJobProgress?: number;
  };
}

export default IScenarioMenuProps;
