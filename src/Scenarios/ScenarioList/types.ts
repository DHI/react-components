interface IScenarioListProps {
  classes?: any;
  onContextMenuClick: any;
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
  onSelectScenario: any;
  selectedScenarioId: string;
  status: {
    name: string;
    color: string;
    message: string;
  }[];
}

interface ObjectProperties {
  [key: string]: ObjectProperties | string;
}

export default IScenarioListProps;
export { ObjectProperties };
