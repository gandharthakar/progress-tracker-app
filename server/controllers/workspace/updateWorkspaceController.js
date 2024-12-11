const UsersModel = require("../../mongodb/models/userModel");
const WorkspaceModel = require('../../mongodb/models/workspaceModel');
const { isValidObjectIdString } = require("../../libs/helperFunctions");

const updateWorkspaceController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {
        const { workspace_id, workspace_title, workspace_description, user_id } = req.body;
        if (workspace_id && workspace_title && user_id) {
            const workspaceIDCheck = isValidObjectIdString(workspace_id);
            const verTok = req.user.user_id;
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
            if (userAlreadyExist !== null) {
                if (workspaceIDCheck) {
                    const workspaceAlreadyExist = await WorkspaceModel.findOne({ _id: workspace_id });
                    if (workspaceAlreadyExist !== null) {
                        await WorkspaceModel.findByIdAndUpdate({ _id: workspace_id }, { workspace_title, workspace_description });
                        status = 200;
                        response = {
                            success: true,
                            message: "Workspace updated successfully."
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

module.exports = updateWorkspaceController;