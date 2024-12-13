const UsersModel = require("../../mongodb/models/usersModel");
const WorkspaceModel = require('../../mongodb/models/workspacesModel');
const TasksModel = require("../../mongodb/models/tasksModel");
const { isValidObjectIdString } = require("../../libs/helperFunctions");

const updateTasksController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {

        const { task_id, task_title, section_id, workspace_id, user_id } = req.body;
        if (task_id && task_title && section_id && workspace_id && user_id) {
            const workspaceIDCheck = isValidObjectIdString(workspace_id);
            const verTok = req.user.user_id;
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
            if (userAlreadyExist !== null) {
                if (workspaceIDCheck) {
                    const workspaceAlreadyExist = await WorkspaceModel.findOne({ _id: workspace_id });
                    if (workspaceAlreadyExist !== null) {
                        const taskAlreadyExist = await TasksModel.findOne({ _id: task_id });
                        if (taskAlreadyExist !== null) {
                            if (taskAlreadyExist.task_title == task_title) {
                                status = 200;
                                response = {
                                    success: false,
                                    message: "Task already exist."
                                }
                            } else {
                                await TasksModel.findByIdAndUpdate({ _id: task_id }, { task_title, section_id });
                                status = 200;
                                response = {
                                    success: true,
                                    message: "Task Updated successfully."
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