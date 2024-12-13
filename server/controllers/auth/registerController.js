const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
const { generateOTP } = require("../../libs/helperFunctions");
const UsersModel = require("../../mongodb/models/usersModel");
const emailTransporter = require('../../nodemailer/emailConfig');
const emailVerificationWithOTP = require('../../nodemailer/template/otpEmailTemplate');

const otp = generateOTP(6);

const registerUserController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {
        const { user_full_name, user_email, user_password, confirm_user_password } = req.body;
        if (user_full_name && user_email && user_password && confirm_user_password) {
            // Check password validity.
            if (user_password === confirm_user_password) {
                // Check user already exist.
                const userAlreadyExist = await UsersModel.findOne({ user_email });
                if (userAlreadyExist == null) {
                    const hashPassword = await bcrypt.hash(user_password, Number(process.env.BCRYPT_ROUNDS) || 10);
                    const verifyData = {
                        user_full_name,
                        user_email,
                        user_password: hashPassword,
                        otp
                    }
                    const token = jwt.sign({ user: verifyData }, process.env.JWT_SECRET || "undefined", { expiresIn: "5m" });
                    const frontEndLink = `${process.env.FRONTEND_CLIENT_URI}/auth/verify-email/${token}`;
                    await emailTransporter.sendMail({
                        from: process.env.EMAIL_FROM,
                        to: user_email, // list of receivers
                        subject: "Email Verification Link & OTP - PT.APP", // Subject line
                        html: emailVerificationWithOTP(otp, frontEndLink)
                    });
                    status = 200;
                    response = {
                        success: true,
                        message: "Verification email has been sent to your email address.",
                        token
                    }
                } else {
                    status = 200;
                    response = {
                        success: false,
                        message: "User already registered with this email."
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

module.exports = registerUserController;