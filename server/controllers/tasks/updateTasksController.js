const UsersModel = require("../../mongodb/models/usersModel");
const WorkspacesModel = require('../../mongodb/models/workspacesModel');
const TasksModel = require("../../mongodb/models/tasksModel");
const SectionsModel = require("../../mongodb/models/sectionsModel");
const { isValidObjectIdString, insertValueAtIndex } = require("../../libs/helperFunctions");

const updateTasksController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {

        const { task_id, task_title, section_id, taskIndex, workspace_id, user_id } = req.body;
        if (task_id && task_title && section_id && taskIndex && workspace_id && user_id) {
            const workspaceIDCheck = isValidObjectIdString(workspace_id);
            const verTok = req.user.user_id;
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
            if (userAlreadyExist !== null) {
                if (workspaceIDCheck) {
                    const workspaceAlreadyExist = await WorkspacesModel.findOne({ _id: workspace_id });
                    if (workspaceAlreadyExist !== null) {
                        const sectionIDCheck = isValidObjectIdString(section_id);
                        if (sectionIDCheck) {
                            const sectionAlreadyExist = await SectionsModel.findOne({ _id: section_id });
                            if (sectionAlreadyExist !== null) {
                                const taskIDCheck = isValidObjectIdString(task_id);
                                if (taskIDCheck) {
                                    const taskAlreadyExist = await TasksModel.findOne({ _id: task_id });
                                    if (taskAlreadyExist !== null) {
                                        if (taskAlreadyExist.section_id == section_id) {
                                            if (taskAlreadyExist.task_title == task_title) {
                                                status = 200;
                                                response = {
                                                    success: false,
                                                    message: "Task already exist."
                                                }
                                            } else {
                                                await TasksModel.findByIdAndUpdate({ _id: task_id }, { task_title });
                                                status = 200;
                                                response = {
                                                    success: true,
                                                    message: "Task Updated successfully."
                                                }
                                            }
                                        } else {
                                            const newSection = await SectionsModel.findOne({ _id: section_id });
                                            if (newSection.task_sequence.length > 0) {
                                                // Check for valid index & length of array because valid index number must be within or in between array length.
                                                if (Number(taskIndex) < 0 || Number(taskIndex) > newSection.task_sequence.length) {
                                                    status = 200;
                                                    response = {
                                                        success: false,
                                                        message: "Wrong index number provided or index out of bounds."
                                                    }
                                                } else {
                                                    // First Remove task from old section sequence.
                                                    const oldSection = await SectionsModel.findOne({ _id: taskAlreadyExist.section_id });
                                                    const filterOldSS = oldSection.task_sequence.filter((ids) => ids !== task_id);
                                                    await SectionsModel.findByIdAndUpdate({ _id: taskAlreadyExist.section_id }, { task_sequence: filterOldSS });

                                                    // Second Add task to the new section.
                                                    const updSec = [...newSection.task_sequence];
                                                    const upd = insertValueAtIndex(updSec, Number(taskIndex), task_id);
                                                    await SectionsModel.findByIdAndUpdate({ _id: section_id }, { task_sequence: upd });
                                                    // Finally Update section ID to the Task Object.
                                                    await TasksModel.findByIdAndUpdate({ _id: task_id }, { task_title, section_id });
                                                    status = 200;
                                                    response = {
                                                        success: true,
                                                        message: "Task Updated successfully."
                                                    }
                                                }
                                            } else {
                                                // First Remove task from old section sequence.
                                                const oldSection = await SectionsModel.findOne({ _id: taskAlreadyExist.section_id });
                                                const filterOldSS = oldSection.task_sequence.filter((ids) => ids !== task_id);
                                                await SectionsModel.findByIdAndUpdate({ _id: taskAlreadyExist.section_id }, { task_sequence: filterOldSS });

                                                // Second Add task to the new section.
                                                const updSec = [...newSection.task_sequence];
                                                const upd = insertValueAtIndex(updSec, 0, task_id);
                                                await SectionsModel.findByIdAndUpdate({ _id: section_id }, { task_sequence: upd });
                                                // Finally Update section ID to the Task Object.
                                                await TasksModel.findByIdAndUpdate({ _id: task_id }, { task_title, section_id });
                                                status = 200;
                                                response = {
                                                    success: true,
                                                    message: "Task Updated successfully."
                                                }
                                            }
                                        }
                                    } else {
                                        status = 200;
                                        response = {
                                            success: false,
                                            message: "Task not found."
                                        }
                                    }
                                } else {
                                    status = 200;
                                    response = {
                                        success: false,
                                        message: "Invalid task ID found."
                                    }
                                }
                            } else {
                                status = 200;
                                response = {
                                    success: false,
                                    message: "Section not found."
                                }
                            }
                        } else {
                            status = 200;
                            response = {
                                success: false,
                                message: "Invalid section ID found."
                            }
                        }
                    } else {
                        status = 200;
                        response = {
                            success: false,
                            message: "Workspace not found."
                        }
                    }
                } else {
                    status = 200;
                    response = {
                        success: false,
                        message: "Invalid workspace ID found."
                    }
                }
            } else {
                status = 200;
                response = {
                    success: false,
                    message: "User not found."
                }
            }
        } else {
            status = 400;
            response = {
                success: false,
                message: "Missing required fields."
            }
        }

        res.status(status).json(response);
    } catch (error) {
        response = {
            success: false,
            message: error.message
        }
        res.json(response);
    }
}

module.exports = updateTasksController;