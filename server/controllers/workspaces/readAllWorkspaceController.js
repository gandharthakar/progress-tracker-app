const UsersModel = require("../../mongodb/models/usersModel");
const WorkspacesModel = require('../../mongodb/models/workspacesModel');

const readAllWorkspacesController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {
        const { token } = req.query;
        if (token) {
            const verTok = req.user.user_id;
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
            if (userAlreadyExist !== null) {
                const workspaceAlreadyExist = await WorkspacesModel.find({ user_id: userAlreadyExist._id });
                if (workspaceAlreadyExist.length > 0) {
                    const wkData = await WorkspacesModel.find({ user_id: userAlreadyExist._id })
                        .exec()
                        .then(docs => {
                            return docs.map((doc) => {
                                return {
                                    workspace_id: doc._id,
                                    workspace_title: doc.workspace_title,
                                    workspace_description: doc.workspace_description,
                                    user_id: doc.user_id
                                }
                            })
                        });
                    status = 200;
                    response = {
                        success: true,
                        message: "Workspaces found successfully.",
                        workspace: wkData
                    }
                } else {
                    status = 200;
                    response = {
                        success: false,
                        message: "No workspaces found.",
                        workspace: []
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

module.exports = readAllWorkspacesController;