const UsersModel = require("../../mongodb/models/usersModel");
const WorkspaceModel = require('../../mongodb/models/workspacesModel');
const SectionsModel = require("../../mongodb/models/sectionsModel");
const { isValidObjectIdString } = require("../../libs/helperFunctions");

const createSectionsController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {

        const { section_title, section_value, workspace_id, user_id } = req.body;
        if (section_title && section_value && workspace_id && user_id) {
            const workspaceIDCheck = isValidObjectIdString(workspace_id);
            const verTok = req.user.user_id;
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
            if (userAlreadyExist !== null) {
                if (workspaceIDCheck) {
                    const workspaceAlreadyExist = await WorkspaceModel.findOne({ _id: workspace_id });
                    if (workspaceAlreadyExist !== null) {
                        const sectionAlreadyExist = await SectionsModel.findOne({ section_title, workspace_id });
                        if (sectionAlreadyExist == null) {
                            const doc = new SectionsModel({
                                section_title,
                                section_value,
                                workspace_id,
                                user_id: userAlreadyExist._id
                            });
                            await doc.save();
                            await WorkspaceModel.findByIdAndUpdate({ _id: workspace_id }, { section_sequence: [...workspaceAlreadyExist.section_sequence, doc._id] });
                            status = 201;
                            response = {
                                success: true,
                                message: "Section created successfully."
                            }
                        } else {
                            status = 200;
                            response = {
                                success: false,
                                message: "Section already exist."
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

module.exports = createSectionsController;