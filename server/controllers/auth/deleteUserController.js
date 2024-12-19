const UsersModel = require("../../mongodb/models/usersModel");
const WorkspacesModel = require('../../mongodb/models/workspacesModel');
const TasksModel = require("../../mongodb/models/tasksModel");
const SectionsModel = require("../../mongodb/models/sectionsModel");
const LabelsModel = require("../../mongodb/models/labelsModel");

const deleteUserController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {
        const { token } = req.body;
        if (token) {
            const verTok = req.user.user_id;
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
            if (userAlreadyExist !== null) {
                await UsersModel.findByIdAndDelete({ _id: verTok });
                await WorkspacesModel.deleteMany({ user_id: verTok });
                await SectionsModel.deleteMany({ user_id: verTok });
                await TasksModel.deleteMany({ user_id: verTok });
                await LabelsModel.deleteMany({ user_id: verTok });
                status = 200;
                response = {
                    success: true,
                    message: "Your account deleted successfully."
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

module.exports = deleteUserController;