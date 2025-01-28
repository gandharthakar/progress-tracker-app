const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const UsersModel = require("../../mongodb/models/usersModel");
const emailTransporter = require('../../nodemailer/emailConfig');
const fgtPwdEmailTemplate = require('../../nodemailer/template/fgtPwdEmailTemplate');
const { userForgotPasswordFormValidationSchema } = require('../../libs/zod/schemas/userAreaValidationSchemas');

const forgotPasswordController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {
        const { user_email } = req.body;
        if (user_email) {
            const valResult = userForgotPasswordFormValidationSchema.safeParse({
                email: user_email,
            });
            if (valResult.success) {
                // Check user already exist.
                const userAlreadyExist = await UsersModel.findOne({ user_email });
                if (userAlreadyExist !== null) {
                    if (userAlreadyExist.isEmailVerified) {
                        const token = jwt.sign({ user_id: userAlreadyExist._id, user_email: userAlreadyExist.user_email }, process.env.JWT_SECRET || "undefined", { expiresIn: "5m" });
                        const frontEndLink = `${process.env.FRONTEND_CLIENT_URI}/auth/reset-password/${token}`;
                        await emailTransporter.sendMail({
                            from: process.env.EMAIL_FROM,
                            to: user_email, // list of receivers
                            subject: "Password Reset Link - PT.APP", // Subject line
                            html: fgtPwdEmailTemplate(frontEndLink)
                        });
                        status = 200;
                        response = {
                            success: true,
                            message: "Password reset link has been sent to your registered email address.",
                        }
                    } else {
                        status = 200;
                        response = {
                            success: false,
                            message: "Your email is not verified.",
                        }
                    }
                } else {
                    status = 200;
                    response = {
                        success: false,
                        message: "User not found with this email."
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

module.exports = forgotPasswordController;