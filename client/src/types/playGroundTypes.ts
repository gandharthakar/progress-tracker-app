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
    task_id: string,
    task_title: string,
    workspace_id?: string | undefined,
    section_id: string,
    user_id?: string | undefined
}

export interface sectionType {
    section_id?: string,
    section_title: string,
    section_value: string,
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
    label_id: string,
    label_title: string,
    label_value: string,
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

export interface secUpdMsWk {
    section_id: string,
    task_sequence: string[] | undefined
}

export interface updMstWkspType {
    completed_task: string[]
    section_sequence: string[],
    sections: secUpdMsWk[],
    workspace_id: string,
    user_id: string
}