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
  dateField: string;
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

interface Scenario {
  id: string;
  lastJobStatus: string;
  lastJobId: string;
  dateTime: string;
  version: string;
  data: string;
  lastJobProgress?: number;
}

interface Condition {
  field: string;
  value: string;
}

interface DescriptionFields {
  field: string;
  name: string;
  condition: {
    field: string;
    value: string;
  };
}

export default IScenarioListProps;
export { Scenario, Condition, DescriptionFields };
