const UsersModel = require("../../mongodb/models/usersModel");
const WorkspacesModel = require('../../mongodb/models/workspacesModel');
const { isValidObjectIdString } = require("../../libs/helperFunctions");

const saveLabelOrderController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {

        const { label_sequence, workspace_id, user_id } = req.body;
        if (label_sequence && workspace_id && user_id) {
            const workspaceIDCheck = isValidObjectIdString(workspace_id);
            const verTok = req.user.user_id;
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
            if (userAlreadyExist !== null) {
                if (workspaceIDCheck) {
                    const workspaceAlreadyExist = await WorkspacesModel.findOne({ _id: workspace_id });
                    if (workspaceAlreadyExist !== null) {
                        await WorkspacesModel.findByIdAndUpdate({ _id: workspace_id }, { label_sequence });
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

module.exports = saveLabelOrderController;