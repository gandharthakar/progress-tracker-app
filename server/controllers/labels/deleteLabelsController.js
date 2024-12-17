const UsersModel = require("../../mongodb/models/usersModel");
const WorkspaceModel = require('../../mongodb/models/workspacesModel');
const LabelsModel = require("../../mongodb/models/labelsModel");
const { isValidObjectIdString } = require("../../libs/helperFunctions");

const deleteLabelsController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {
        const { label_id, workspace_id, user_id } = req.body;
        if (label_id && workspace_id && user_id) {
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
                                await LabelsModel.findByIdAndDelete({ _id: label_id });
                                const updLS = workspaceAlreadyExist.label_sequence.filter((ids) => ids !== label_id);
                                const filtlbl = workspaceAlreadyExist.completed_task.filter((wksp) => !wksp.includes(label_id));
                                await WorkspaceModel.findByIdAndUpdate({ _id: workspace_id }, { label_sequence: updLS, completed_task: filtlbl });
                                status = 200;
                                response = {
                                    success: true,
                                    message: "Label deleted successfully."
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

module.exports = deleteLabelsController;