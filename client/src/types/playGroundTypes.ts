export interface taskComboboxType {
    id: string
    label: string,
    value: string,
}

export interface workspaceType {
    workspace_id?: string,
    workspace_title: string,
    workspace_description: string | undefined,
    user_id?: string | undefined
}

export interface taskType {
    task_id?: string | undefined,
    task_title: string,
    section_id: string,
    taskIndex?: string | number,
    workspace_id?: string | undefined,
    user_id?: string | undefined
}

export interface sectionType {
    section_id?: string,
    section_title: string,
    section_value: string,
    sectionIndex?: number | string,
    workspace_id?: string | undefined,
    user_id?: string | undefined,
}

export interface sectionApiType {
    section_id: string,
    section_title: string,
    section_value: string,
    workspace_id?: string | undefined,
    user_id?: string | undefined,
    tasks: taskType[] | undefined
}

export interface labelType {
    label_id?: string,
    label_title: string,
    label_value: string,
    labelIndex?: string | number,
    workspace_id?: string | undefined,
    user_id?: string | undefined
}

export interface workspaceApiType {
    workspace_id: string,
    workspace_title: string,
    workspace_description: string | undefined,
    completed_task: string[] | undefined,
    user_id: string | undefined,
    sections: sectionApiType[] | undefined,
    labels: labelType[] | undefined
}

export interface pieChartDataType {
    id: string | number,
    value: number,
    color: string,
    label: string
}

export interface rdAlWkspPayloadType {
    success: boolean,
    message: string,
    workspace: workspaceType[]
}

export interface delWkspPayloadType {
    workspace_id: string,
    user_id: string
}

export interface delSecsPayloadType {
    section_id: string,
    workspace_id: string,
    user_id: string
}

export interface rdMastWkspPayloadType {
    workspace_id: string,
    token: string
}

export interface rdMastWkspdataType {
    success: boolean,
    message: string,
    master_workspace: workspaceApiType
}

export interface rdSecDataType {
    success: boolean,
    message: string,
    sections: [{
        section_id: string,
        section_title: string,
        section_value: string,
        workspace_id: string,
        user_id: string,
    }]
}

export interface secUpdMsWk {
    section_id: string,
    task_sequence: (string | undefined)[] | undefined;
}

export interface updMstWkspType {
    completed_task: string[]
    section_sequence: string[],
    sections: secUpdMsWk[],
    workspace_id: string,
    user_id: string
}

export interface delTasksPayloadType {
    task_id: string,
    section_id: string,
    workspace_id: string,
    user_id: string
}

export interface rdLblsDataType {
    success: boolean,
    message: string,
    labels: labelType[]
}

export interface updLblOrdPayloadType {
    workspace_id: string,
    user_id: string,
    label_sequence: (string | undefined)[] | undefined;
}

export interface delLblsPayloadType {
    label_id: string,
    workspace_id: string,
    labelIndex: string | number,
    user_id: string
}

export interface PiDataType {
    id: number,
    value: number,
    color: string,
    label: string
}