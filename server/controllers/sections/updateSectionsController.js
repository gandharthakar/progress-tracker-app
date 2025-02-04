const UsersModel = require("../../mongodb/models/usersModel");
const WorkspacesModel = require('../../mongodb/models/workspacesModel');
const SectionsModel = require("../../mongodb/models/sectionsModel");
const { isValidObjectIdString, insertValueAtIndex } = require("../../libs/helperFunctions");

const updateSectionsController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {

        const { section_id, section_title, section_value, sectionIndex, workspace_id, user_id } = req.body;
        if (section_id && section_title && section_value && sectionIndex && workspace_id && user_id) {
            const workspaceIDCheck = isValidObjectIdString(workspace_id);
            const verTok = req.user.user_id;
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
            if (userAlreadyExist !== null) {
                if (workspaceIDCheck) {
                    const workspaceAlreadyExist = await WorkspacesModel.findOne({ _id: workspace_id });
                    if (workspaceAlreadyExist !== null) {
                        const sectionIDCheck = isValidObjectIdString(section_id);
                        if (sectionIDCheck) {
                            const sectionAlreadyExist = await SectionsModel.findOne({ _id: section_id });
                            if (sectionAlreadyExist !== null) {
                                if (workspaceAlreadyExist.section_sequence[Number(sectionIndex)] === section_id) {
                                    if (sectionAlreadyExist.section_title == section_title) {
                                        status = 200;
                                        response = {
                                            success: false,
                                            message: "Section already exist."
                                        }
                                    } else {
                                        await SectionsModel.findByIdAndUpdate({ _id: section_id }, { section_title, section_value });
                                        status = 200;
                                        response = {
                                            success: true,
                                            message: "Section updated successfully."
                                        }
                                    }
                                } else {
                                    if (Number(sectionIndex) < 0 || Number(sectionIndex) > workspaceAlreadyExist.section_sequence.length) {
                                        status = 200;
                                        response = {
                                            success: false,
                                            message: "Wrong index number provided or index out of bounds."
                                        }
                                    } else {
                                        // Remove from sequence first.
                                        const fupd = workspaceAlreadyExist.section_sequence.filter((ids) => ids !== section_id);
                                        // Make copy.
                                        const cpy = [...fupd];
                                        // Add item.
                                        const upd = insertValueAtIndex(cpy, Number(sectionIndex), section_id);
                                        await SectionsModel.findByIdAndUpdate({ _id: section_id }, { section_title, section_value });
                                        await WorkspacesModel.findByIdAndUpdate({ _id: workspace_id }, { section_sequence: upd });
                                        status = 200;
                                        response = {
                                            success: true,
                                            message: "Section updated successfully."
                                        }
                                    }
                                }
                            } else {
                                status = 200;
                                response = {
                                    success: false,
                                    message: "Section not found."
                                }
                            }
                        } else {
                            status = 200;
                            response = {
                                success: false,
                                message: "Invalid section ID found."
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

module.exports = updateSectionsController;