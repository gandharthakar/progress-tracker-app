const UsersModel = require("../../mongodb/models/usersModel");
const WorkspacesModel = require('../../mongodb/models/workspacesModel');
const SectionsModel = require("../../mongodb/models/sectionsModel");
const { isValidObjectIdString } = require("../../libs/helperFunctions");

const updateMasterWorkspaceController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {
        const { completed_task, section_sequence, sections, workspace_id, user_id } = req.body;
        if (completed_task && section_sequence && sections && workspace_id && user_id) {
            const workspaceIDCheck = isValidObjectIdString(workspace_id);
            const verTok = req.user.user_id;
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
            if (userAlreadyExist !== null) {
                if (workspaceIDCheck) {
                    const workspaceAlreadyExist = await WorkspacesModel.findOne({ _id: workspace_id });
                    if (workspaceAlreadyExist !== null) {
                        await WorkspacesModel.findByIdAndUpdate({ _id: workspace_id }, {
                            section_sequence,
                            completed_task
                        });
                        const writeOpts = sections.map((sec) => {
                            return {
                                updateOne: {
                                    filter: { _id: sec.section_id },
                                    update: { task_sequence: sec.task_sequence }
                                }
                            }
                        });
                        await SectionsModel.bulkWrite(writeOpts);
                        status = 200;
                        response = {
                            success: true,
                            message: "Changes saved successfully."
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

module.exports = updateMasterWorkspaceController;