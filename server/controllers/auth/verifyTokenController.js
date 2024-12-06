const jwt = require('jsonwebtoken');
require('dotenv').config();

const verifyTokenController = async (req, res) => {
    let status = 200;
    let response = {
        success: false,
        message: ""
    }
    try {
        const { token } = req.body;
        if (token) {
            await jwt.verify(token, process.env.JWT_SECRET || "undefined");
            status = 200;
            response = {
                success: true,
                message: "Token is valid."
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
};

module.exports = verifyTokenController;