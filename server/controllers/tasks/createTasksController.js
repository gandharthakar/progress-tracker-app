const UsersModel = require("../../mongodb/models/usersModel");
const WorkspaceModel = require('../../mongodb/models/workspacesModel');
const TasksModel = require("../../mongodb/models/tasksModel");
const SectionsModel = require("../../mongodb/models/sectionsModel");
const { isValidObjectIdString } = require("../../libs/helperFunctions");

const createTasksController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {

        const { task_title, section_id, workspace_id, user_id } = req.body;
        if (task_title && section_id && workspace_id && user_id) {
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
                                const taskAlreadyExist = await TasksModel.findOne({ task_title, workspace_id });
                                if (taskAlreadyExist == null) {
                                    const doc = new TasksModel({
                                        task_title,
                                        section_id,
                                        workspace_id,
                                        user_id: userAlreadyExist._id
                                    });
                                    await doc.save();
                                    await SectionsModel.findByIdAndUpdate({ _id: section_id }, { task_sequence: [...sectionAlreadyExist.task_sequence, doc._id] });
                                    status = 201;
                                    response = {
                                        success: true,
                                        message: "Task created successfully."
                                    }
                                } else {
                                    status = 200;
                                    response = {
                                        success: false,
                                        message: "Task already exist."
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

module.exports = createTasksController;