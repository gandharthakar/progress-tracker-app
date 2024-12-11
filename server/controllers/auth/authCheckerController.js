const UsersModel = require("../../mongodb/models/userModel");

const authCheckerController = async (req, res) => {
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
                status = 200;
                response = {
                    success: true,
                    message: "User is valid.",
                    isEmailVerified: userAlreadyExist.isEmailVerified
                }
            } else {
                status = 200;
                response = {
                    success: false,
                    message: "User is not valid."
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
};

module.exports = authCheckerController;