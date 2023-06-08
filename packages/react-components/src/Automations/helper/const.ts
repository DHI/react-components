
export const fields = ['name', 'group', 'taskId', 'hostGroup', 'tag'];
export const triggerFields = ['triggerCondition'];

export const initialFormValues = {
  name: '',
  group: '',
  taskId: '',
  hostGroup: '',
  priority: 0,
  tag: '',
  isEnabled: false,
};

export const initialFormErrors = {
  nameError: false,
  groupError: false,
  taskIdError: false,
  hostGroupError: false,
  tagError: false,
};

export const initialTrigger = {
  triggerCondition: '',
  triggerId: '',
  type: '',
  isEnabled: false
};

export const initialTriggerError = {
  triggerConditionError: false,
  triggerIdError: false,
  typeError: false,
};
