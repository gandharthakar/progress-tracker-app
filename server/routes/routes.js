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
const viaTokenEmailVerificationController = require("../controllers/auth/viaTokenEmailVerificationController");
const viaOptionalEmailVerificationController = require("../controllers/auth/viaOptionalEmailVerificationController");
const createWorkspaceController = require("../controllers/workspace/createWorkspaceController");
const deleteWorkspaceController = require("../controllers/workspace/deleteWorkspaceController");
const updateWorkspaceController = require("../controllers/workspace/updateWorkspaceController");
const readWorkspaceController = require("../controllers/workspace/readWorkspaceController");
const readAllWorkspacesController = require("../controllers/workspace/readAllWorkspaceController");

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
routes.post("/api/auth/via-token-email-verification", viaTokenEmailVerificationController);
routes.post("/api/auth/via-optional-email-verification", isGmailUserMiddleware, viaOptionalEmailVerificationController);

// User Routes.
routes.post('/api/users/user-info', userInfoController);
routes.post("/api/users/settings/general", generalSettingsController);
routes.post("/api/users/settings/password", passwordSettingController);

// Workspace Routes.
routes.post("/api/workspaces/create", createWorkspaceController);
routes.get("/api/workspaces/read", readWorkspaceController);
routes.get("/api/workspaces/read-all", readAllWorkspacesController);
routes.put("/api/workspaces/update", updateWorkspaceController);
routes.delete("/api/workspaces/delete", deleteWorkspaceController);

module.exports = routes;