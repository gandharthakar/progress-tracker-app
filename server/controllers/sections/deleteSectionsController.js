const UsersModel = require("../../mongodb/models/usersModel");
const WorkspacesModel = require('../../mongodb/models/workspacesModel');
const SectionsModel = require("../../mongodb/models/sectionsModel");
const TasksModel = require("../../mongodb/models/tasksModel");
const { isValidObjectIdString } = require("../../libs/helperFunctions");

const deleteSectionsController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {
        const { section_id, sectionIndex, selected_tasks, workspace_id, user_id } = req.body;
        if (section_id && sectionIndex && selected_tasks && workspace_id && user_id) {
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
                                if (workspaceAlreadyExist.section_sequence[Number(sectionIndex)] === section_id) {
                                    await SectionsModel.findByIdAndDelete({ _id: section_id });
                                    const updSs = workspaceAlreadyExist.section_sequence.filter((ids) => ids !== section_id);
                                    const filtlbl = workspaceAlreadyExist.completed_task.filter((taskId) => {
                                        const [idPart] = taskId.split('_');
                                        return !selected_tasks.includes(idPart);
                                    });
                                    await WorkspacesModel.findByIdAndUpdate({ _id: workspace_id }, { section_sequence: updSs, completed_task: filtlbl });
                                    await TasksModel.deleteMany({ section_id });
                                    status = 200;
                                    response = {
                                        success: true,
                                        message: "Section deleted successfully."
                                    }
                                } else {
                                    if (Number(sectionIndex) < 0 || Number(sectionIndex) > workspaceAlreadyExist.section_sequence.length) {
                                        status = 200;
                                        response = {
                                            success: false,
                                            message: "Wrong index number provided or index out of bounds."
                                        }
                                    } else {
                                        status = 200;
                                        response = {
                                            success: false,
                                            message: "Please save the changes before deleting section."
                                        }
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

module.exports = deleteSectionsController;