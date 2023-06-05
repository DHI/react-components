
export const fields = ['name', 'group', 'taskId', 'hostGroup', 'priority', 'tag', 'workflowInputParametersFilePath'];
export const triggerFields = ['triggerCondition'];

export const initialFormValues = {
  name: '',
  nameError: false,
  group: '',
  groupError: false,
  taskId: '',
  taskIdError: false,
  hostGroup: '',
  hostGroupError: false,
  workflowInputParametersFilePath: '',
  workflowInputParametersFilePathError: false,
  priority: 0,
  priorityError: false,
  tag: '',
  tagError: false,
  isEnabled: false,
};

export const initialTrigger = {
  triggerCondition: '',
  triggerConditionError: false,
  triggerId: '',
  triggerIdError: false,
  type: '',
  typeError: false,
  isEnabled: false
};
