const UsersModel = require("../../mongodb/models/usersModel");
const WorkspacesModel = require('../../mongodb/models/workspacesModel');
const TasksModel = require("../../mongodb/models/tasksModel");
const { isValidObjectIdString } = require("../../libs/helperFunctions");

const readAllTasksController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {

        const { workspace_id, token } = req.query;
        if (workspace_id && token) {
            const workspaceIDCheck = isValidObjectIdString(workspace_id);
            const verTok = req.user.user_id;
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
            if (userAlreadyExist !== null) {
                if (workspaceIDCheck) {
                    const workspaceAlreadyExist = await WorkspacesModel.findOne({ _id: workspace_id });
                    if (workspaceAlreadyExist !== null) {
                        const tasksAlreadyExist = await TasksModel.find({ workspace_id });
                        if (tasksAlreadyExist.length > 0) {
                            const tskData = await TasksModel.find({ workspace_id })
                                .exec()
                                .then(docs => {
                                    return docs.map((doc) => {
                                        return {
                                            task_id: doc._id,
                                            task_title: doc.task_title,
                                            section_id: doc.section_id,
                                            workspace_id: doc.workspace_id,
                                            user_id: doc.user_id
                                        }
                                    })
                                });
                            status = 200;
                            response = {
                                success: true,
                                message: "Tasks found successfully.",
                                tasks: tskData
                            }
                        } else {
                            status = 200;
                            response = {
                                success: false,
                                message: "No tasks found.",
                                tasks: []
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

module.exports = readAllTasksController;