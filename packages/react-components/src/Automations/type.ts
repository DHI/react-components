import { DataSource } from '../api/types';

interface AutomationsListProps {
    /** Data source to get the automations data */
    dataSources: DataSource;
    /** Hide or show columns */
    disabledColumns?: string[];
    /** Disabled spesific text field */
    disabledTextField?: Record<string, boolean>
    /** Disabled trigger now action field */
    disabledTriggerNow?: boolean
    /** Reffering Job Pages */
    jobReferringPage?: string
}

interface AutomationData {
    /** Id of Automation */
    id?: string;
    /** Task Id of Automation */
    taskId: string;
    /** Jobs Id of Automation */
    jobId?: string;
    /** Group of the Automation */
    group: string;
    /** Host group of Automations */
    hostGroup: string;
    /** priority of Automations */
    priority: number;
    /** tag of Automations */
    tag: string;
    /** enabling of Automation */
    isEnabled: boolean;
    /** fullname of Automation */
    fullName: string;
    /** name of Automation */
    name: string;
    /** requested time of Automation that are related to Job */
    requested?: string;
    /** current status of Automation that are related to Job */
    currentStatus?: string;
    /** Parameters of Automation */
    taskParameters?: IParameters;
    /** List Trigger of Automation */
    triggerCondition: ITriggerCondition;
    /** WorkflowInput of Automation */
    workflowInputParametersFilePath?: string;
}

export interface ITriggerCondition {
    /** list of all trigger */
    triggers: ITrigger[],
    /** list of trigger condition */
    conditional: string
    /** status for final condition */
    isMet?: boolean
}

export interface ITrigger {
    /** id for trigger */
    id: string;
    /** description for trigger */
    description?: string;
    /** enabling for trigger */
    isEnabled: boolean;
    /** Interval for trigger */
    interval?: string;
    /** time utc for trigger */
    startTimeUtc?: string
    /** check for color status */
    isMet?: boolean
    /** type for trigger */
    type: string

}

interface IParameters {
    [key: string]: string;
}

interface AutomationDetailProps {
    detail: AutomationData;
    /**  Boolean to scroll the Automationdetail textarea down on load. */
    textareaScrolled: boolean;
    /** Location timezone */
    timeZone: string;
    /** Date format to be converted to */
    dateTimeFormat: string;
    /** Button to close Automation Detail container */
    onClose: () => void;
}

interface IFormAutomationDialog {
    dataSources: DataSource;
    fetchData: (change?: boolean) => void
    loading: boolean
    setLoading: (state: boolean) => void
    open: boolean;
    onClose: () => void;
    automation?: AutomationData
    disabledTextField?: Record<string, boolean>
    listAutomation?: AutomationData[]
}

interface ITriggerParameter {
    triggerType: string,
    triggerValues: any,
    schema: any
    uiSchema: any
    setTriggerValues: (value) => void
}

interface DetailAutomationsDialogProps {
    open: boolean;
    onClose: () => void;
    automation?: AutomationData
}

interface DynamicFieldProps {
    index: number;
    parameter: IParameters;
    updateField: (index: number, key: string, value: string) => void;
    removeField: (index: number) => void;
}

export default AutomationsListProps;
export {
    AutomationData,
    AutomationDetailProps,
    IParameters,
    IFormAutomationDialog,
    ITriggerParameter,
    DetailAutomationsDialogProps,
    DynamicFieldProps,
};
