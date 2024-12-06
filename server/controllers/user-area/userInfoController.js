const jwt = require('jsonwebtoken');
const UsersModel = require("../../mongodb/models/userModel");

const userInfoController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {
        const { token, required_data_code } = req.body;

        if (token) {
            const verTok = await jwt.verify(token, process.env.JWT_SECRET || "undefined");
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok.user_id });
            if (userAlreadyExist !== null) {
                let user = {};
                if (required_data_code && required_data_code !== "") {
                    switch (required_data_code) {
                        case "115521":
                            user = {
                                user_full_name: userAlreadyExist.user_full_name,
                            }
                            break;
                        case "761958":
                            user = {
                                user_email: userAlreadyExist.user_email,
                            }
                            break;
                        case "349246":
                            user = {
                                isEmailVerified: userAlreadyExist.isEmailVerified
                            }
                            break;
                        case "824637":
                            user = {
                                user_full_name: userAlreadyExist.user_full_name,
                                user_email: userAlreadyExist.user_email,
                            }
                            break;
                        case "259418":
                            user = {
                                user_full_name: userAlreadyExist.user_full_name,
                                isEmailVerified: userAlreadyExist.isEmailVerified
                            }
                            break;
                        case "955637":
                            user = {
                                user_email: userAlreadyExist.user_email,
                                isEmailVerified: userAlreadyExist.isEmailVerified
                            }
                            break;
                        case "694537":
                            user = {
                                user_full_name: userAlreadyExist.user_full_name,
                                user_email: userAlreadyExist.user_email,
                                isEmailVerified: userAlreadyExist.isEmailVerified
                            }
                            break;

                        default:
                            user = {}
                            break;
                    }
                } else {
                    user = {}
                }
                status = 200;
                response = {
                    success: true,
                    message: "User found.",
                    user
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

module.exports = userInfoController;