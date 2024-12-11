const jwt = require('jsonwebtoken');

const jwtUserIDBodyMiddleware = async (req, res, next) => {
    try {
        const { user_id } = req.body;
        const decoded = await jwt.verify(user_id, process.env.JWT_SECRET || "undefined");
        req.user = decoded;
        next();
    } catch (error) {
        let sts = 200;
        if (error.message == "jwt expired") {
            response = {
                success: false,
                message: "Your session is expired, Please login again."
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
        } else if (error.message == "jwt must be provided") {
            sts = 400;
            response = {
                success: false,
                message: "Missing required fields."
            }
        } else {
            response = {
                success: false,
                message: error.message
            }
        }
        res.status(sts).json(response);
    }
};

module.exports = jwtUserIDBodyMiddleware;