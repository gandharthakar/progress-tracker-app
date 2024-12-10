const jwt = require('jsonwebtoken');
require('dotenv').config();
const UsersModel = require("../../mongodb/models/userModel");
const { generateOTP } = require("../../libs/helperFunctions");
const emailTransporter = require('../../nodemailer/emailConfig');
const emailVerificationWithOTP = require('../../nodemailer/template/otpEmailTemplate');

const otp = generateOTP(6);

const viaOptionalEmailVerificationController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {
        const { token, user_email } = req.body;

        if (token && user_email) {
            const verTok = await jwt.verify(token, process.env.JWT_SECRET || "undefined");
            // Check user already exist.
            const userAlreadyExist = await UsersModel.findOne({ _id: verTok.user_id });
            if (userAlreadyExist !== null) {
                if (user_email !== userAlreadyExist.user_email) {
                    await UsersModel.findByIdAndUpdate({ _id: verTok.user_id }, { user_email, isEmailVerified: false });
                    const verifyData = {
                        user_id: userAlreadyExist._id,
                        user_email,
                        otp
                    };
                    const newToken = jwt.sign({ user: verifyData }, process.env.JWT_SECRET || "undefined", { expiresIn: "5m" });
                    const frontEndLink = `${process.env.FRONTEND_CLIENT_URI}/auth/re-verify-email/${newToken}`;
                    await emailTransporter.sendMail({
                        from: process.env.EMAIL_FROM,
                        to: user_email, // list of receivers
                        subject: "Email Verification Link & OTP - PT.APP", // Subject line
                        html: emailVerificationWithOTP(otp, frontEndLink)
                    });
                    status = 200;
                    response = {
                        success: true,
                        message: "Email verification link has been sent."
                    }
                } else {
                    status = 200;
                    response = {
                        success: false,
                        message: "You entered same email address. Please use different."
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
};

module.exports = viaOptionalEmailVerificationController;