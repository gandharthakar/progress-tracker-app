const bcrypt = require('bcrypt');
require('dotenv').config();
const UsersModel = require("../../mongodb/models/usersModel");

const passwordSettingController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {
        const { token, user_password, confirm_user_password } = req.body;

        if (token && user_password && confirm_user_password) {
            if (user_password === confirm_user_password) {
                const verTok = req.user.user_id;
                // Check user already exist.
                const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
                if (userAlreadyExist !== null) {
                    const hashPassword = await bcrypt.hash(user_password, Number(process.env.BCRYPT_ROUNDS) || 10);
                    await UsersModel.findByIdAndUpdate({ _id: verTok }, { user_password: hashPassword })
                    status = 200;
                    response = {
                        success: true,
                        message: "Password Changed successfully."
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
        response = {
            success: false,
            message: error.message
        }
        res.json(response);
    }
};

module.exports = passwordSettingController;