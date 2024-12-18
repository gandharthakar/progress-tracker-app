const UsersModel = require("../../mongodb/models/usersModel");
const WorkspacesModel = require('../../mongodb/models/workspacesModel');
const TasksModel = require("../../mongodb/models/tasksModel");
const { isValidObjectIdString } = require("../../libs/helperFunctions");

const readSingleTaskController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {

        const { task_id, workspace_id, token } = req.query;
        if (task_id && workspace_id && token) {
            const workspaceIDCheck = isValidObjectIdString(workspace_id);
            const verTok = req.user.user_id;
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
            if (userAlreadyExist !== null) {
                if (workspaceIDCheck) {
                    const workspaceAlreadyExist = await WorkspacesModel.findOne({ _id: workspace_id });
                    if (workspaceAlreadyExist !== null) {
                        const taskIDCheck = isValidObjectIdString(task_id);
                        if (taskIDCheck) {
                            const taskAlreadyExist = await TasksModel.findOne({ _id: task_id });
                            if (taskAlreadyExist !== null) {
                                status = 200;
                                response = {
                                    success: true,
                                    message: "Task found successfully.",
                                    task: {
                                        task_id: taskAlreadyExist._id,
                                        task_title: taskAlreadyExist.task_title,
                                        section_id: taskAlreadyExist.section_id,
                                        workspace_id: taskAlreadyExist.workspace_id,
                                        user_id: taskAlreadyExist.user_id
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

module.exports = readSingleTaskController;