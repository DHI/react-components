import { DataSource } from '../../api/types';
import { DateProps } from '../../common/types';

interface AutomationsListProps {
    /** Data source to get the logs data */
    dataSources?: DataSource[];
    /** Hide or show columns */
    disabledColumns?: string[];
    /** Data source to get the logs specific parameters */
    parameters?: Parameters[];
    /** The date time format that the dates shown in */
    dateTimeFormat?: string;
    /** Selected date for log entries from */
    startTimeUtc?: string;
    /** Time zone to display data from the server to user time */
    timeZone?: string;
    /** Emit event to client when Automations received from the server */
    onReceived?: (data: any) => void;
}

interface Parameters {
    /** Name to populate Automations table matching the payload */
    utcNow: string
}

interface AutomationData {
    /** Id of Automation */
    id: string;
    /** Task Id of Automation */
    taskId: string;
    /** Group of the Automation */
    group: string;
    /** Host of Automation  */
    hostId: string;
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
    /** updated time of Automation */
    updated: string;
    /** Parameters of Automation */
    parameters: IParameters;
    /** List Trigger of Automation */
    triggerCondition: ITriggerCondition;
    /** WorkflowInput of Automation */
    workflowInputParametersFilePath: string;
}

interface ITriggerCondition {
    /** list of all trigger */
    triggers: ITrigger[],
    /** list of trigger condition */
    conditional: string
    /** status for final condition */
    isMet: boolean
}

interface ITrigger {
    /** id for trigger */
    id: string;
    /** description for trigger */
    description: string;
    /** enabling for trigger */
    isEnabled: boolean;
    /** Interval for trigger */
    interval: string;
    /** time utc for trigger */
    startTimeUtc: string
    /** check for color status */
    isMet: boolean
}

interface IParameters {
    utcNow: string;
}

interface FilterProps {
    column: {
        /** Value that use to filter the data */
        filterValue: string;
        /** Function to set the filter value data */
        setFilter: React.Dispatch<React.SetStateAction<string>>;
        /** Row before data filtered */
        preFilteredRows: any;
        /** The id of column to be filtered */
        id: string;
    };
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

interface DateFilterProps {
    dateTimeFormat: string;
    startTimeUtc: string;
    timeZone: string;
    date: DateProps;
    onSetDate: (date: DateProps) => void;
    onClearDateFilter: () => void;
}

export default AutomationsListProps;
export { AutomationData, FilterProps, AutomationDetailProps, DateFilterProps, Parameters };
