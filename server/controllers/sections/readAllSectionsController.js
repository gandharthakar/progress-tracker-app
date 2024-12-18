const UsersModel = require("../../mongodb/models/usersModel");
const WorkspacesModel = require('../../mongodb/models/workspacesModel');
const SectionsModel = require("../../mongodb/models/sectionsModel");
const { isValidObjectIdString, sortSectionsBySequence } = require("../../libs/helperFunctions");

const readAllSectionsController = async (req, res) => {
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
                    const workspaceAlreadyExist = await WorkspacesModel.findOne({ _id: workspace_id });
                    if (workspaceAlreadyExist !== null) {
                        const sectionsAlreadyExist = await SectionsModel.find({ workspace_id });
                        if (sectionsAlreadyExist.length > 0) {
                            const secData = await SectionsModel.find({ workspace_id })
                                .exec()
                                .then(docs => {
                                    return docs.map((doc) => {
                                        return {
                                            section_id: doc._id,
                                            section_title: doc.section_title,
                                            section_value: doc.section_value,
                                            workspace_id: doc.workspace_id,
                                            user_id: doc.user_id
                                        }
                                    })
                                });
                            const sortedSections = sortSectionsBySequence(secData, workspaceAlreadyExist.section_sequence);
                            status = 200;
                            response = {
                                success: true,
                                message: "Sections found successfully.",
                                sections: sortedSections
                            }
                        } else {
                            status = 200;
                            response = {
                                success: false,
                                message: "No sections found.",
                                sections: []
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

module.exports = readAllSectionsController;