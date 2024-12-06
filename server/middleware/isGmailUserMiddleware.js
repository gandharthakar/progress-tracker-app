const allowedDomain = "@gmail.com";

const isGmailUserMiddleware = (req, res, next) => {
    const userEmail = req.body.user_email; // Check for user object and email property

    if (!userEmail || !userEmail.endsWith(allowedDomain)) {
        return res.status(200).json({ message: "Only gmail allowed.", success: false });
    }

    next(); // User is allowed, continue processing the request
};

module.exports = isGmailUserMiddleware;