const UsersModel = require("../../mongodb/models/usersModel");
const WorkspacesModel = require('../../mongodb/models/workspacesModel');
const LabelsModel = require("../../mongodb/models/labelsModel");
const { isValidObjectIdString, insertValueAtIndex } = require("../../libs/helperFunctions");

const updateLabelsController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {
        const { label_id, label_title, label_value, labelIndex, workspace_id, user_id } = req.body;
        if (label_id && label_title && label_value && labelIndex && workspace_id && user_id) {
            const workspaceIDCheck = isValidObjectIdString(workspace_id);
            const verTok = req.user.user_id;
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
            if (userAlreadyExist !== null) {
                if (workspaceIDCheck) {
                    const workspaceAlreadyExist = await WorkspacesModel.findOne({ _id: workspace_id });
                    if (workspaceAlreadyExist !== null) {
                        const labelIDCheck = isValidObjectIdString(label_id);
                        if (labelIDCheck) {
                            const labelAlreadyExist = await LabelsModel.findOne({ _id: label_id });
                            if (labelAlreadyExist !== null) {
                                if (workspaceAlreadyExist.label_sequence[Number(labelIndex)] === label_id) {
                                    await LabelsModel.findByIdAndUpdate({ _id: label_id }, { label_title, label_value });
                                    status = 200;
                                    response = {
                                        success: true,
                                        message: "Label updated successfully."
                                    }
                                } else {
                                    if (Number(labelIndex) < 0 || Number(labelIndex) > workspaceAlreadyExist.label_sequence.length) {
                                        status = 200;
                                        response = {
                                            success: false,
                                            message: "Wrong index number provided or index out of bounds."
                                        }
                                    } else {
                                        // Remove from sequence first.
                                        const fupd = workspaceAlreadyExist.label_sequence.filter((ids) => ids !== label_id);
                                        // Make copy.
                                        const cpy = [...fupd];
                                        // Add item.
                                        const upd = insertValueAtIndex(cpy, Number(labelIndex), label_id);
                                        await LabelsModel.findByIdAndUpdate({ _id: label_id }, { label_title, label_value });
                                        await WorkspacesModel.findByIdAndUpdate({ _id: workspace_id }, { label_sequence: upd });
                                        status = 200;
                                        response = {
                                            success: true,
                                            message: "Label updated successfully."
                                        }
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

module.exports = updateLabelsController;