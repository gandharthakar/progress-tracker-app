const jwt = require('jsonwebtoken');
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
            const verTok = await jwt.verify(token, process.env.JWT_SECRET || "undefined");
            const uid = verTok.user_id;
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: uid });
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
        if (error.message == "jwt expired") {
            response = {
                success: false,
                message: "Your session is expired, Please login again."
            }
        } else if (error.message == "jwt malformed" || error.message == "jwt must be a string") {
            response = {
                success: false,
                message: "Wrong information provided, Please login again."
            }
        } else if (error.message == "invalid signature" || error.message == "invalid token") {
            response = {
                success: false,
                message: "Invalid information provided, Please login again."
            }
        } else {
            response = {
                success: false,
                message: error.message
            }
        }
        res.json(response);
    }
};

module.exports = authCheckerController;