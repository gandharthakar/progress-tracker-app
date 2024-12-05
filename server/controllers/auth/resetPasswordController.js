const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const UsersModel = require("../../mongodb/models/userModel");

const resetPasswordController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {
        const { token, user_password, confirm_user_password } = req.body;

        if (token && user_password && confirm_user_password) {
            if (user_password === confirm_user_password) {
                const verTok = await jwt.verify(token, process.env.JWT_SECRET || "undefined");
                // Check user already exist.
                const userAlreadyExist = await UsersModel.findOne({ user_email: verTok.user_email });
                if (userAlreadyExist !== null) {
                    const hashPassword = await bcrypt.hash(user_password, Number(process.env.BCRYPT_ROUNDS) || 10);
                    const uid = verTok.user_id;
                    await UsersModel.findByIdAndUpdate({ _id: uid }, {
                        user_password: hashPassword
                    });
                    status = 200;
                    response = {
                        success: true,
                        message: "Password reset successfully."
                    }
                } else {
                    status = 200;
                    response = {
                        success: false,
                        message: "User not found with this email address."
                    }
                }
            } else {
                status = 200;
                response = {
                    success: false,
                    message: "Password is missmatched."
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
                message: "Your link is expired, Please request again."
            }
        } else if (error.message == "jwt malformed" || error.message == "jwt must be a string") {
            response = {
                success: false,
                message: "Wrong information provided."
            }
        } else if (error.message == "invalid signature" || error.message == "invalid token") {
            response = {
                success: false,
                message: "Invalid information provided."
            }
        } else {
            response = {
                success: false,
                message: error.message
            }
        }
        res.json(response);
    }
}

module.exports = resetPasswordController;