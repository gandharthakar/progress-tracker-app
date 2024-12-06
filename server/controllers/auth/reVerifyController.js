const jwt = require('jsonwebtoken');
require('dotenv').config();
const UsersModel = require("../../mongodb/models/userModel");
const { isGmail } = require("../../libs/helperFunctions");

const reBerifyEmailController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {
        const { token, otp } = req.body;
        if (token && otp) {
            const verTok = await jwt.verify(token, process.env.JWT_SECRET || "undefined");
            // console.log(verTok);
            if (verTok.user.otp === otp) {
                // Check for gmail.
                if (isGmail(verTok.user.user_email)) {
                    // Check user already exist.
                    const userAlreadyExist = await UsersModel.findOne({ user_email: verTok.user.user_email });
                    if (userAlreadyExist !== null) {
                        await UsersModel.findByIdAndUpdate({ _id: verTok.user.user_id }, { isEmailVerified: true });
                        status = 200;
                        response = {
                            success: true,
                            message: "Email verified successfully."
                        }
                    } else {
                        status = 200;
                        response = {
                            success: false,
                            message: "User not found."
                        }
                    }
                } else {
                    status = 200;
                    response = {
                        success: false,
                        message: "Only gmail allowed."
                    }
                }
            } else {
                status = 200;
                response = {
                    success: false,
                    message: "Incorrect OTP entered. Please try again."
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
                message: "Your link is expired."
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

module.exports = reBerifyEmailController;