const UsersModel = require("../../mongodb/models/usersModel");
const WorkspaceModel = require('../../mongodb/models/workspacesModel');
const LabelsModel = require("../../mongodb/models/labelsModel");
const { isValidObjectIdString, sortLabelsBySequence } = require("../../libs/helperFunctions");

const readAllLabelsController = async (req, res) => {
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
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
            if (userAlreadyExist !== null) {
                if (workspaceIDCheck) {
                    const workspaceAlreadyExist = await WorkspaceModel.findOne({ _id: workspace_id });
                    if (workspaceAlreadyExist !== null) {
                        const labelsAlreadyExist = await LabelsModel.find({ workspace_id });
                        if (labelsAlreadyExist.length > 0) {
                            const lbData = await LabelsModel.find({ workspace_id })
                                .exec()
                                .then(docs => {
                                    return docs.map((doc) => {
                                        return {
                                            label_id: doc._id,
                                            label_title: doc.label_title,
                                            label_value: doc.label_value,
                                            workspace_id: doc.workspace_id,
                                            user_id: doc.user_id
                                        }
                                    })
                                });
                            const sortedLabels = sortLabelsBySequence(lbData, workspaceAlreadyExist.label_sequence);
                            status = 200;
                            response = {
                                success: true,
                                message: "Labels found successfully.",
                                labels: sortedLabels
                            }
                        } else {
                            status = 200;
                            response = {
                                success: false,
                                message: "No labels found.",
                                labels: []
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

module.exports = readAllLabelsController;