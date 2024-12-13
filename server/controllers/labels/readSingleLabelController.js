const UsersModel = require("../../mongodb/models/usersModel");
const WorkspaceModel = require('../../mongodb/models/workspacesModel');
const LabelsModel = require("../../mongodb/models/labelsModel");
const { isValidObjectIdString } = require("../../libs/helperFunctions");

const readSingleLabelController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {
        const { label_id, workspace_id, token } = req.query;
        if (label_id && workspace_id && token) {
            const workspaceIDCheck = isValidObjectIdString(workspace_id);
            const verTok = req.user.user_id;
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
            if (userAlreadyExist !== null) {
                if (workspaceIDCheck) {
                    const workspaceAlreadyExist = await WorkspaceModel.findOne({ _id: workspace_id });
                    if (workspaceAlreadyExist !== null) {
                        const labelIDCheck = isValidObjectIdString(label_id);
                        if (labelIDCheck) {
                            const labelAlreadyExist = await LabelsModel.findOne({ _id: label_id });
                            if (labelAlreadyExist !== null) {
                                status = 200;
                                response = {
                                    success: true,
                                    message: "Label found successfully.",
                                    label: {
                                        label_id: labelAlreadyExist._id,
                                        label_title: labelAlreadyExist.label_title,
                                        label_value: labelAlreadyExist.label_value,
                                        workspace_id: labelAlreadyExist.workspace_id,
                                        user_id: labelAlreadyExist.user_id
                                    }
                                }
                            } else {
                                status = 200;
                                response = {
                                    success: false,
                                    message: "Label not found."
                                }
                            }
                        } else {
                            status = 200;
                            response = {
                                success: false,
                                message: "Invalid label ID found."
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

module.exports = readSingleLabelController;