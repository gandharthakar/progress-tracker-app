const express = require("express");

// Controllers
const homeController = require("./../controllers/homeController");
const registerUserController = require("../controllers/auth/registerController");
const loginUserController = require("../controllers/auth/loginController");
const verifyEmailController = require("../controllers/auth/verifyController");
const forgotPasswordController = require("../controllers/auth/forgotPasswordController");
const resetPasswordController = require("../controllers/auth/resetPasswordController");
const authCheckerController = require("../controllers/auth/authCheckerController");
const userInfoController = require("../controllers/user-area/userInfoController");
const generalSettingsController = require("../controllers/user-area/generalSettingsController");
const reBerifyEmailController = require("../controllers/auth/reVerifyController");
const verifyTokenController = require("../controllers/auth/verifyTokenController");
const passwordSettingController = require("../controllers/user-area/passwordSettingController");

// Middlewares.
const isGmailUserMiddleware = require("../middleware/isGmailUserMiddleware");

const routes = express.Router();

// Home Route.
routes.get('/', homeController);

// Auth Routes.
routes.post('/api/auth/register', isGmailUserMiddleware, registerUserController);
routes.post('/api/auth/verify-email', verifyEmailController);
routes.post('/api/auth/login', isGmailUserMiddleware, loginUserController);
routes.post('/api/auth/forgot-password', isGmailUserMiddleware, forgotPasswordController);
routes.post('/api/auth/reset-password', resetPasswordController);
routes.post('/api/auth/checker', authCheckerController);
routes.post('/api/auth/re-verify-email', reBerifyEmailController);
routes.post('/api/auth/check-token-validity', verifyTokenController);
// routes.post("/api/auth/via-token-email-verification", generalSettingsController);
// routes.post("/api/auth/via-optional-email-verification", generalSettingsController);

// User Routes.
routes.post('/api/get-user-info', userInfoController);
routes.post("/api/users/settings/general", generalSettingsController);
routes.post("/api/users/settings/password", passwordSettingController);

module.exports = routes;