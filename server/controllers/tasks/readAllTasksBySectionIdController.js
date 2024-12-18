const UsersModel = require("../../mongodb/models/usersModel");
const WorkspacesModel = require('../../mongodb/models/workspacesModel');
const TasksModel = require("../../mongodb/models/tasksModel");
const SectionsModel = require("../../mongodb/models/sectionsModel");
const { isValidObjectIdString, sortTasksBySequence } = require("../../libs/helperFunctions");

const readAllTasksBySectionIdController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {

        const { section_id, workspace_id, token } = req.query;
        if (section_id && workspace_id && token) {
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
                                const tasksAlreadyExist = await TasksModel.find({ workspace_id, section_id });
                                if (tasksAlreadyExist.length > 0) {
                                    const tskData = await TasksModel.find({ workspace_id, section_id })
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
                                    const sortedTasks = sortTasksBySequence(tskData, sectionAlreadyExist.task_sequence);
                                    status = 200;
                                    response = {
                                        success: true,
                                        message: "Tasks found successfully.",
                                        tasks: sortedTasks
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

module.exports = readAllTasksBySectionIdController;