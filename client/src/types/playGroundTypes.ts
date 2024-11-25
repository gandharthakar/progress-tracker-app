export interface taskComboboxType {
    id: string
    label: string,
    value: string,
}

export interface workspaceType {
    workspace_id: string,
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
    section_id: string,
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