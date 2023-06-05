import { AutomationData } from "../type";

export const DUMMY_DATA_AUTOMATIONS: AutomationData[] = [
    {
        id: 'group3/automation1',
        taskId: 'Workflows.DownloadRTNGFS',
        workflowInputParametersFilePath: "C:\\Services\\JobExecutor\\Script\\DownloadRTNGFSParam.json",
        fullName: "group3/automation1",
        group: "group3",
        name: "automation1",
        updated: "2023-05-23T05:04:34.8177343Z",
        hostGroup: "Minion",
        
        priority: 1,
        isEnabled: true,
        tag: 'tag',
        parameters: {
            utcNow: '05:04:34'
        },
        triggerCondition: {
            conditional: "trigger1 AND trigger2",
            isMet: false,
            triggers: [
                {
                    id: 'trigger1',
                    interval: "06:00:00",
                    description: "Download GFS every six hours",
                    isEnabled: true,
                    startTimeUtc: '2023-05-16T17:00:00',
                    type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
                    isMet: true
                },
                {
                    id: 'trigger2',
                    interval: "06:00:00",
                    description: "Download GFS every six hours",
                    isEnabled: true,
                    startTimeUtc: '2023-05-16T17:00:00',
                    type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
                    isMet: false
                }
            ],
        }
    },
    {
        id: 'group3/automation2',
        taskId: 'Workflows.DownloadRTNGFS',
        workflowInputParametersFilePath: "C:\\Services\\JobExecutor\\Script\\DownloadRTNGFSParam.json",
        fullName: "group3/automation2",
        group: "group3",
        name: "automation2",
        updated: "2023-05-23T05:04:34.8177343Z",
        hostGroup: "Minion",
        
        priority: 1,
        isEnabled: false,
        tag: 'tag',
        parameters: {
            utcNow: '05:04:34'
        },
        triggerCondition: {
            conditional: "trigger1 AND trigger2",
            isMet: true,
            triggers: [
                {
                    id: 'trigger1',
                    interval: "06:00:00",
                    description: "Download GFS every six hours",
                    isEnabled: true,
                    startTimeUtc: '2023-05-16T17:00:00',
                    type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
                    isMet: true
                },
                {
                    id: 'trigger2',
                    interval: "06:00:00",
                    description: "Download GFS every six hours",
                    isEnabled: true,
                    startTimeUtc: '2023-05-16T17:00:00',
                    type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
                    isMet: true
                }
            ],
        }
    },
    {
        id: 'group4/automaions3',
        taskId: 'Workflows.DownloadRTNGFS',
        workflowInputParametersFilePath: "C:\\Services\\JobExecutor\\Script\\DownloadRTNGFSParam.json",
        fullName: "group4/automation3",
        group: "group4",
        name: "automation3",
        updated: "2023-05-23T05:04:34.8177343Z",
        hostGroup: "Minion",
        
        priority: 1,
        isEnabled: true,
        tag: 'tag',
        parameters: {
            utcNow: '05:04:34'
        },
        triggerCondition: {
            conditional: "(trigger1 AND trigger2) OR (trigger3 OR trigger4)",
            isMet: false,
            triggers: [
                {
                    id: 'trigger1',
                    interval: "06:00:00",
                    description: "Download GFS every six hours",
                    isEnabled: true,
                    startTimeUtc: '2023-05-16T17:00:00',
                    type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
                    isMet: true
                },
                {
                    id: 'trigger2',
                    interval: "06:00:00",
                    description: "Download GFS every six hours",
                    isEnabled: true,
                    startTimeUtc: '2023-05-16T17:00:00',
                    type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
                    isMet: false
                },
                {
                    id: 'trigger3',
                    interval: "06:00:00",
                    description: "Download GFS every six hours",
                    isEnabled: true,
                    startTimeUtc: '2023-05-16T17:00:00',
                    type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
                    isMet: true
                },
                {
                    id: 'trigger4',
                    interval: "06:00:00",
                    description: "Download GFS every six hours",
                    isEnabled: true,
                    startTimeUtc: '2023-05-16T17:00:00',
                    type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
                    isMet: false
                }
            ],
        }
    },
    {
        id: 'group4/automation4',
        taskId: 'Workflows.DownloadRTNGFS',
        workflowInputParametersFilePath: "C:\\Services\\JobExecutor\\Script\\DownloadRTNGFSParam.json",
        fullName: "group4/automation4",
        group: "group4",
        name: "automation3",
        updated: "2023-05-23T05:04:34.8177343Z",
        hostGroup: "Minion",
        
        priority: 1,
        isEnabled: true,
        tag: 'tag',
        parameters: {
            utcNow: '05:04:34'
        },
        triggerCondition: {
            conditional: "trigger1 AND trigger2",
            isMet: false,
            triggers: [
                {
                    id: 'trigger1',
                    interval: "06:00:00",
                    description: "Download GFS every six hours",
                    isEnabled: true,
                    startTimeUtc: '2023-05-16T17:00:00',
                    type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
                    isMet: true
                },
                {
                    id: 'trigger2',
                    interval: "06:00:00",
                    description: "Download GFS every six hours",
                    isEnabled: true,
                    startTimeUtc: '2023-05-16T17:00:00',
                    type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
                    isMet: false
                }
            ],
        }
    },
    {
        id: 'group5/automation5',
        taskId: 'Workflows.DownloadRTNGFS',
        workflowInputParametersFilePath: "C:\\Services\\JobExecutor\\Script\\DownloadRTNGFSParam.json",
        fullName: "group5/automation5",
        group: "group5",
        name: "automation5",
        updated: "2023-05-23T05:04:34.8177343Z",
        hostGroup: "Minion",
        
        priority: 1,
        isEnabled: true,
        tag: 'tag',
        parameters: {
            utcNow: '05:04:34'
        },
        triggerCondition: {
            conditional: "trigger1 OR trigger2",
            isMet: true,
            triggers: [
                {
                    id: 'trigger1',
                    interval: "06:00:00",
                    description: "Download GFS every six hours",
                    isEnabled: true,
                    startTimeUtc: '2023-05-16T17:00:00',
                    type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
                    isMet: true
                },
                {
                    id: 'trigger2',
                    interval: "06:00:00",
                    description: "Download GFS every six hours",
                    isEnabled: true,
                    startTimeUtc: '2023-05-16T17:00:00',
                    type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
                    isMet: false
                }
            ],
        }
    },
    {
        id: 'group5/automation6',
        taskId: 'Workflows.DownloadRTNGFS',
        workflowInputParametersFilePath: "C:\\Services\\JobExecutor\\Script\\DownloadRTNGFSParam.json",
        fullName: "group5/automation6",
        group: "group5",
        name: "automation6",
        updated: "2023-05-23T05:04:34.8177343Z",
        hostGroup: "Minion",
        
        priority: 1,
        isEnabled: true,
        tag: 'tag',
        parameters: {
            utcNow: '05:04:34'
        },
        triggerCondition: {
            conditional: "(trigger1 OR trigger2) AND trigger3",
            isMet: true,
            triggers: [
                {
                    id: 'trigger1',
                    interval: "06:00:00",
                    description: "Download GFS every six hours",
                    isEnabled: true,
                    startTimeUtc: '2023-05-16T17:00:00',
                    type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
                    isMet: true
                },
                {
                    id: 'trigger2',
                    interval: "06:00:00",
                    description: "Download GFS every six hours",
                    isEnabled: true,
                    startTimeUtc: '2023-05-16T17:00:00',
                    type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
                    isMet: false
                },
                {
                    id: 'trigger3',
                    interval: "06:00:00",
                    description: "Download GFS every six hours",
                    isEnabled: true,
                    startTimeUtc: '2023-05-16T17:00:00',
                    type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
                    isMet: true
                }
            ],
        }
    },
    {
        id: 'group6/automation7',
        taskId: 'Workflows.DownloadRTNGFS',
        workflowInputParametersFilePath: "C:\\Services\\JobExecutor\\Script\\DownloadRTNGFSParam.json",
        fullName: "group6/automation7",
        group: "group6",
        name: "automation7",
        updated: "2023-05-23T05:04:34.8177343Z",
        hostGroup: "Minion",
        
        priority: 1,
        isEnabled: true,
        tag: 'tag',
        parameters: {
            utcNow: '05:04:34'
        },
        triggerCondition: {
            conditional: "trigger1 AND trigger2",
            isMet: false,
            triggers: [
                {
                    id: 'trigger1',
                    interval: "06:00:00",
                    description: "Download GFS every six hours",
                    isEnabled: true,
                    startTimeUtc: '2023-05-16T17:00:00',
                    type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
                    isMet: false
                },
                {
                    id: 'trigger2',
                    interval: "06:00:00",
                    description: "Download GFS every six hours",
                    isEnabled: true,
                    startTimeUtc: '2023-05-16T17:00:00',
                    type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
                    isMet: false
                }
            ],
        }
    },
    // {
    //     id: 'group6/automation8',
    //     taskId: 'Workflows.DownloadRTNGFS',
    //     workflowInputParametersFilePath: "C:\\Services\\JobExecutor\\Script\\DownloadRTNGFSParam.json",
    //     fullName: "group6/automation8",
    //     group: "group6",
    //     name: "automation8",
    //     updated: "2023-05-23T05:04:34.8177343Z",
    //     hostGroup: "Minion",
    //     
    //     priority: 1,
    //     isEnabled: false,
    //     tag: 'tag',
    //     parameters: {
    //         utcNow: '05:04:34'
    //     },
    //     triggerCondition: {
    //         conditional: "trigger1 AND trigger2",
    //         isMet: false,
    //         triggers: [
    //             {
    //                 id: 'trigger1',
    //                 interval: "06:00:00",
    //                 description: "Download GFS every six hours",
    //                 isEnabled: true,
    //                 startTimeUtc: '2023-05-16T17:00:00',
    // type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
    //                 isMet: true
    //             },
    //             {
    //                 id: 'trigger2',
    //                 interval: "06:00:00",
    //                 description: "Download GFS every six hours",
    //                 isEnabled: true,
    //                 startTimeUtc: '2023-05-16T17:00:00',
    // type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
    //                 isMet: false
    //             }
    //         ],
    //     }
    // },
    // {
    //     id: 'group7/automation9',
    //     taskId: 'Workflows.DownloadRTNGFS',
    //     workflowInputParametersFilePath: "C:\\Services\\JobExecutor\\Script\\DownloadRTNGFSParam.json",
    //     fullName: "group7/automation9",
    //     group: "group7",
    //     name: "automation9",
    //     updated: "2023-05-23T05:04:34.8177343Z",
    //     hostGroup: "Minion",
    //     
    //     priority: 1,
    //     isEnabled: false,
    //     tag: 'tag',
    //     parameters: {
    //         utcNow: '05:04:34'
    //     },
    //     triggerCondition: {
    //         conditional: "trigger1 AND trigger2",
    //         isMet: false,
    //         triggers: [
    //             {
    //                 id: 'trigger1',
    //                 interval: "06:00:00",
    //                 description: "Download GFS every six hours",
    //                 isEnabled: true,
    //                 startTimeUtc: '2023-05-16T17:00:00',
    // type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
    //                 isMet: true
    //             },
    //             {
    //                 id: 'trigger2',
    //                 interval: "06:00:00",
    //                 description: "Download GFS every six hours",
    //                 isEnabled: true,
    //                 startTimeUtc: '2023-05-16T17:00:00',
    // type: 'DHI.Services.Jobs.Automations.Triggers.ScheduledTrigger, DHI.Services.Jobs, Version=10.1.0.0, Culture=neutral, PublicKeyToken=null"',
    //                 isMet: false
    //             }
    //         ],
    //     }
    // },
]
