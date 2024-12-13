const UsersModel = require("../../mongodb/models/usersModel");
const WorkspaceModel = require('../../mongodb/models/workspacesModel');
const SectionsModel = require("../../mongodb/models/sectionsModel");
const { isValidObjectIdString } = require("../../libs/helperFunctions");

const updateSectionsController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {

        const { section_id, section_title, section_value, workspace_id, user_id } = req.body;
        if (section_id && section_title && section_value && workspace_id && user_id) {
            const workspaceIDCheck = isValidObjectIdString(workspace_id);
            const verTok = req.user.user_id;
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
            if (userAlreadyExist !== null) {
                if (workspaceIDCheck) {
                    const workspaceAlreadyExist = await WorkspaceModel.findOne({ _id: workspace_id });
                    if (workspaceAlreadyExist !== null) {
                        const sectionAlreadyExist = await SectionsModel.findOne({ _id: section_id });
                        if (sectionAlreadyExist !== null) {
                            if (sectionAlreadyExist.section_title == section_title) {
                                status = 200;
                                response = {
                                    success: false,
                                    message: "Section already exist."
                                }
                            } else {
                                await SectionsModel.findByIdAndUpdate({ _id: section_id }, { section_title, section_value });
                                status = 200;
                                response = {
                                    success: true,
                                    message: "Section updated successfully."
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

module.exports = updateSectionsController;