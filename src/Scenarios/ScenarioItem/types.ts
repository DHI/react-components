interface IScenarioItemProps {
  classes?: any;
  menu: {
    id: string;
    label: string;
    condition?: {
      field: string;
      value: string;
    };
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
  onContextMenuClick: Function;
  status: { message?: string; color?: string; progress?: number };
  showHour: boolean;
  showMenu: boolean;
  showStatus: boolean;
  isSelected: boolean;
  name: string;
  date: string;
  description: { name: string; value: string }[];
}

export default IScenarioItemProps;
