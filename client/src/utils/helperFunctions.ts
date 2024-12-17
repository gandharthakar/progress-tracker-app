import { labelType, taskType } from "@/types/playGroundTypes";
import demo_workspaces, { demo_sections, demo_tasks, demo_labels } from "@/utils/demoData";

// Encode string to slug
export const convertToSlug = (str: string): string => {

    //replace all special characters | symbols with a space
    //eslint-disable-next-line
    str = str.replace(/[`~!@#$%^&*()_\-+=\[\]{};:'"\\|\/,.<>?\s]/g, ' ')
        .toLowerCase();

    // trim spaces at start and end of string
    str = str.replace(/^\s+|\s+$/gm, '');

    // replace space with dash/hyphen
    str = str.replace(/\s+/g, '-');
    return str;
};

// a little function to help us with reordering the result
export const reorder = (list: labelType[], startIndex: number, endIndex: number) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
};

// Calculate percentage
export const calculatePercentage = (marksObtained: number, maxMarks: number): number => {
    if (maxMarks === 0) {
        throw new Error("Maximum marks cannot be zero.");
    }
    const percentage = (marksObtained / maxMarks) * 100;
    return percentage;
}

// get demo workspace data by ids.
export const getDemoWorkpaceDataByID = (wid: string) => {
    const getWs = demo_workspaces.filter((item) => item.workspace_id === wid);
    const getSecs = demo_sections.filter((item) => item.workspace_id === wid);
    const getTasks = getSecs.map((section) => {
        return {
            section_id: section.section_id,
            section_title: section.section_title,
            section_value: section.section_value,
            tasks: demo_tasks.filter((task) => task.section_id === section.section_id)
        }
    });
    const getLbs = demo_labels.filter((label) => label.workspace_id === wid);
    const prepData = {
        ...getWs[0],
        sections: getTasks,
        labels: getLbs
    }
    return prepData;
}

export const getSelectedTaskIDs = (selected_tasks: string[], tasks: taskType[]) => {
    // Extract task IDs from the sel array
    const taskIds = selected_tasks.map(item => item.split('_')[0]);

    // Filter tasks based on the extracted task IDs
    const filteredTasks = tasks.filter(task => taskIds.includes(task.task_id));

    return filteredTasks.map((task) => task.task_id);
}