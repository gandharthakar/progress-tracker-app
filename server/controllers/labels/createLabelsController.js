const UsersModel = require("../../mongodb/models/userModel");
const WorkspaceModel = require('../../mongodb/models/workspaceModel');
const LabelModel = require("../../mongodb/models/labelModel");
const { isValidObjectIdString } = require("../../libs/helperFunctions");

const createLabelsController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {
        const { label_title, label_value, workspace_id, user_id } = req.body;
        if (label_title && label_value && workspace_id && user_id) {
            const workspaceIDCheck = isValidObjectIdString(workspace_id);
            const verTok = req.user.user_id;
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
            if (userAlreadyExist !== null) {
                if (workspaceIDCheck) {
                    const workspaceAlreadyExist = await WorkspaceModel.findOne({ _id: workspace_id });
                    if (workspaceAlreadyExist !== null) {
                        const labelAlreadyExist = await LabelModel.findOne({ workspace_id, label_title });
                        if (labelAlreadyExist == null) {
                            const doc = new LabelModel({
                                label_title,
                                label_value,
                                workspace_id,
                                user_id: userAlreadyExist._id
                            });
                            await doc.save();
                            await WorkspaceModel.findByIdAndUpdate({ _id: workspace_id }, { label_sequence: [...workspaceAlreadyExist.label_sequence, doc._id] });
                            status = 201;
                            response = {
                                success: true,
                                message: "Label created successfully."
                            }
                        } else {
                            status = 200;
                            response = {
                                success: false,
                                message: "Label already exist."
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

module.exports = createLabelsController;