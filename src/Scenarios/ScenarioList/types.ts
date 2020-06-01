interface IScenarioListProps {
  classes?: any;
  onContextMenuClick: Function;
  menuItems: {
    id: string;
    label: string;
    condition?: {
      field: string;
      value: string;
    };
  }[];
  scenarios: {
    id: string;
    lastJobStatus: string;
    lastJobId: string;
    dateTime: string;
    version: string;
    data: string;
    lastJobProgress?: number;
  }[];
  nameField: string;
  descriptionFields: {
    field: string;
    name: string;
    condition?: {
      field: string;
      value: string;
    };
  }[];
  showDate: boolean;
  showHour: boolean;
  showMenu: boolean;
  showStatus: boolean;
  selectedScenarioId: string;
  status: {
    name: string;
    color: string;
    message: string;
    progress?: number;
  }[];
}

interface ObjectProperties {
  [key: string]: ObjectProperties | string;
}

export default IScenarioListProps;
export { ObjectProperties };
