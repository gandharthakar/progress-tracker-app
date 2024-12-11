const jwt = require('jsonwebtoken');
const UsersModel = require("../../mongodb/models/userModel");
const { generateOTP, isGmail } = require("../../libs/helperFunctions");
const emailTransporter = require('../../nodemailer/emailConfig');
const emailVerificationWithOTP = require('../../nodemailer/template/otpEmailTemplate');

const otp = generateOTP(6);

const generalSettingsController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {

        const { token, user_email, user_full_name } = req.body;

        if (token && user_email && user_full_name) {
            const verTok = req.user.user_id;
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok });
            if (userAlreadyExist !== null) {
                if (user_email == userAlreadyExist.user_email) {
                    await UsersModel.findByIdAndUpdate({ _id: verTok }, {
                        user_full_name
                    });
                    status = 200;
                    response = {
                        success: true,
                        message: "General settings updated."
                    }
                } else {
                    if (isGmail(user_email)) {
                        await UsersModel.findByIdAndUpdate({ _id: verTok }, {
                            user_full_name,
                            user_email,
                            isEmailVerified: false
                        });
                        const verifyData = {
                            user_id: userAlreadyExist._id,
                            user_email,
                            otp
                        };
                        const token = jwt.sign({ user: verifyData }, process.env.JWT_SECRET || "undefined", { expiresIn: "5m" });
                        const frontEndLink = `${process.env.FRONTEND_CLIENT_URI}/auth/re-verify-email/${token}`;
                        await emailTransporter.sendMail({
                            from: process.env.EMAIL_FROM,
                            to: user_email, // list of receivers
                            subject: "Email Verification Link & OTP - PT.APP", // Subject line
                            html: emailVerificationWithOTP(otp, frontEndLink)
                        });
                        status = 200;
                        response = {
                            success: true,
                            message: "General settings updated & Verification link sent to your newly registered email address."
                        }
                    } else {
                        status = 200;
                        response = {
                            success: false,
                            message: "Only gmail allowed."
                        }
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

module.exports = generalSettingsController;