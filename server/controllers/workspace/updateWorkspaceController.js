const jwt = require('jsonwebtoken');
const UsersModel = require("../../mongodb/models/userModel");
const WorkspaceModel = require('../../mongodb/models/workspaceModel');

const updateWorkspaceController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {
        const { workspace_id, workspace_title, workspace_description, user_id } = req.body;

        if (workspace_id && workspace_title && workspace_description && user_id) {
            const verTok = await jwt.verify(user_id, process.env.JWT_SECRET || "undefined");
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok.user_id });
            if (userAlreadyExist !== null) {
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
        if (error.message == "jwt expired") {
            response = {
                success: false,
                message: "Your link is expired, Please request again."
            }
        } else if (error.message == "jwt malformed" || error.message == "jwt must be a string") {
            response = {
                success: false,
                message: "Wrong information provided."
            }
        } else if (error.message == "invalid signature" || error.message == "invalid token") {
            response = {
                success: false,
                message: "Invalid information provided."
            }
        } else {
            response = {
                success: false,
                message: error.message
            }
        }
        res.json(response);
    }
}

module.exports = updateWorkspaceController;