const UsersModel = require("../../mongodb/models/usersModel");
const WorkspaceModel = require('../../mongodb/models/workspacesModel');
const TasksModel = require("../../mongodb/models/tasksModel");
const SectionsModel = require("../../mongodb/models/sectionsModel");
const { isValidObjectIdString, insertValueAtIndex } = require("../../libs/helperFunctions");

const deleteTasksController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {

        const { task_id, section_id, workspace_id, user_id } = req.body;
        if (task_id && section_id && workspace_id && user_id) {
            const workspaceIDCheck = isValidObjectIdString(workspace_id);
            const verTok = req.user.user_id;
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
            if (userAlreadyExist !== null) {
                if (workspaceIDCheck) {
                    const workspaceAlreadyExist = await WorkspaceModel.findOne({ _id: workspace_id });
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
                                            await TasksModel.findByIdAndDelete({ _id: task_id });
                                            const filr = sectionAlreadyExist.task_sequence.filter((ids) => ids !== task_id);
                                            await SectionsModel.findByIdAndUpdate({ _id: section_id }, { task_sequence: filr })
                                            status = 200;
                                            response = {
                                                success: true,
                                                message: "Task deleted successfully."
                                            }
                                        } else {
                                            const newSection = await SectionsModel.findOne({ _id: section_id });
                                            const valueAlreadyExist = newSection.task_sequence.includes(task_id);
                                            if (!valueAlreadyExist) {
                                                status = 200;
                                                response = {
                                                    success: false,
                                                    message: "Please save the changes before deleting task."
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

module.exports = deleteTasksController;