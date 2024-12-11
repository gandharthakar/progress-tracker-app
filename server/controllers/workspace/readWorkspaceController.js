const UsersModel = require("../../mongodb/models/userModel");
const WorkspaceModel = require('../../mongodb/models/workspaceModel');
const { isValidObjectIdString } = require("../../libs/helperFunctions");

const readWorkspaceController = async (req, res) => {
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
            if (isValidObjectIdString(verTok)) {
                // Check user already exist.
                const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
                if (userAlreadyExist !== null) {
                    if (workspaceIDCheck) {
                        const workspaceAlreadyExist = await WorkspaceModel.findOne({ _id: workspace_id });
                        if (workspaceAlreadyExist !== null) {
                            status = 200;
                            response = {
                                success: true,
                                message: "Workspace found successfully.",
                                workspace: {
                                    workspace_id: workspaceAlreadyExist._id,
                                    workspace_title: workspaceAlreadyExist.workspace_title,
                                    workspace_description: workspaceAlreadyExist.workspace_description,
                                    user_id: userAlreadyExist._id
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
                status = 200;
                response = {
                    success: false,
                    message: "Invalid user ID found."
                }
            }
        } else {
            status = 400;
            response = {
                success: false,
                message: "Missing required information."
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

module.exports = readWorkspaceController;