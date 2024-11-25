const demo_workspaces = [
    {
        workspace_id: "workspace_1",
        workspace_title: "My Workspace 1",
        workspace_description: "This is my workspace description written by me.",
        user_id: "1",
        completed_task: [],
        sections: []
    },
    {
        workspace_id: "workspace_2",
        workspace_title: "My Workspace 2",
        workspace_description: "",
        user_id: "1",
        completed_task: [],
        sections: []
    }
];

export const demo_sections = [
    {
        section_id: "w1_s1",
        section_title: "Section 1",
        section_value: "section_1",
        workspace_id: "workspace_1",
        user_id: "1"
    },
    {
        section_id: "w1_s2",
        section_title: "Section 2",
        section_value: "section_2",
        workspace_id: "workspace_1",
        user_id: "1"
    },
    {
        section_id: "w2_s1",
        section_title: "Group 1",
        section_value: "group_1",
        workspace_id: "workspace_2",
        user_id: "1"
    },
    {
        section_id: "w2_s2",
        section_title: "Group 2",
        section_value: "group_2",
        workspace_id: "workspace_2",
        user_id: "1"
    }
];

export const demo_tasks = [
    {
        task_id: 'task_1',
        task_title: 'Task 1',
        workspace_id: "workspace_1",
        section_id: "w1_s1",
        user_id: "1"
    },
    {
        task_id: 'task_2',
        task_title: 'Task 2',
        workspace_id: "workspace_1",
        section_id: "w1_s1",
        user_id: "1"
    },
    {
        task_id: 'task_3',
        task_title: 'Task 3',
        workspace_id: "workspace_1",
        section_id: "w1_s2",
        user_id: "1"
    },
    {
        task_id: 'task_4',
        task_title: 'Task 4',
        workspace_id: "workspace_1",
        section_id: "w1_s2",
        user_id: "1"
    },
    {
        task_id: 'task_5',
        task_title: 'Task 5',
        workspace_id: "workspace_2",
        section_id: "w2_s1",
        user_id: "1"
    },
    {
        task_id: 'task_6',
        task_title: 'Task 6',
        workspace_id: "workspace_2",
        section_id: "w2_s1",
        user_id: "1"
    },
    {
        task_id: 'task_7',
        task_title: 'Task 7',
        workspace_id: "workspace_2",
        section_id: "w2_s2",
        user_id: "1"
    },
    {
        task_id: 'task_8',
        task_title: 'Task 8',
        workspace_id: "workspace_2",
        section_id: "w2_s2",
        user_id: "1"
    }
]

export const demo_labels = [
    {
        label_id: "label_1",
        label_title: "Basic",
        label_value: "basic",
        workspace_id: "workspace_1",
        user_id: "1"
    },
    {
        label_id: "label_2",
        label_title: "Intermediate",
        label_value: "intermediate",
        workspace_id: "workspace_1",
        user_id: "1"
    },
    {
        label_id: "label_3",
        label_title: "Advance",
        label_value: "advance",
        workspace_id: "workspace_1",
        user_id: "1"
    },
    {
        label_id: "label_4",
        label_title: "Basic",
        label_value: "basic",
        workspace_id: "workspace_2",
        user_id: "1"
    },
    {
        label_id: "label_5",
        label_title: "Advance",
        label_value: "advance",
        workspace_id: "workspace_2",
        user_id: "1"
    }
];

export default demo_workspaces;