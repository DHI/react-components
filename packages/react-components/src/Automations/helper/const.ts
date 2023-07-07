import { JSONSchema7 } from "json-schema";

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

export const uiSchema = {
  startTimeUtc: {
    "ui:options": {
      label: false
    }
  },
  description: {
    "ui:widget": "text",
    "ui:options": {
      label: false
    }
  },
  interval: {
    "ui:widget": "text",
    "ui:options": {
      label: false,
    }
  },
};

export const schema : JSONSchema7 = {
  type: "object",
  properties: {
    startTimeUtc: {
      type: "string",
      format: "date-time",
      title: "Start Date Time"
    },
    description: {
      type: "string",
      title: "Description"
    },
    interval: {
      type: "string",
      title: "Interval",
      description: "Format: d.hh:mm:ss.ff",
    }
  }
};