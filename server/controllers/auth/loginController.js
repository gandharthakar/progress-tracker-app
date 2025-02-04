const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const UsersModel = require("../../mongodb/models/usersModel");
const { userLoginFormValidationSchema } = require('../../libs/zod/schemas/userAreaValidationSchemas');

const loginUserController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {
        const { user_email, user_password } = req.body;
        if (user_email && user_password) {
            const valResult = userLoginFormValidationSchema.safeParse({
                email: user_email,
                password: user_password
            });

            if (valResult.success) {
                // Check user already exist.
                const userAlreadyExist = await UsersModel.findOne({ user_email });
                if (userAlreadyExist !== null) {
                    const isPasswordMatch = await bcrypt.compare(user_password, userAlreadyExist.user_password);
                    if (isPasswordMatch) {
                        const token = jwt.sign({ user_id: userAlreadyExist._id }, process.env.JWT_SECRET || "undefined", { expiresIn: "1hr" });
                        status = 200;
                        response = {
                            success: true,
                            message: "User login successfully.",
                            token
                        }
                    } else {
                        status = 200;
                        response = {
                            success: false,
                            message: "Password is missmatched."
                        }
                    }
                } else {
                    status = 200;
                    response = {
                        success: false,
                        message: "User not found with this email. Please register first."
                    }
                }
            } else {
                status = 200;
                response = {
                    success: false,
                    message: valResult.error.issues.map((err) => {
                        return { message: err.message, field: err.path[0] }
                    })
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

module.exports = loginUserController;