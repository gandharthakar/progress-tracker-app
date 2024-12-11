const express = require("express");

// Home Controllers
const homeController = require("./../controllers/homeController");

// Auth Controllers.
const registerUserController = require("../controllers/auth/registerController");
const loginUserController = require("../controllers/auth/loginController");
const verifyEmailController = require("../controllers/auth/verifyController");
const forgotPasswordController = require("../controllers/auth/forgotPasswordController");
const resetPasswordController = require("../controllers/auth/resetPasswordController");
const authCheckerController = require("../controllers/auth/authCheckerController");
const reBerifyEmailController = require("../controllers/auth/reVerifyController");
const verifyTokenController = require("../controllers/auth/verifyTokenController");
const viaTokenEmailVerificationController = require("../controllers/auth/viaTokenEmailVerificationController");
const viaOptionalEmailVerificationController = require("../controllers/auth/viaOptionalEmailVerificationController");

// User Controllers.
const userInfoController = require("../controllers/user-area/userInfoController");
const generalSettingsController = require("../controllers/user-area/generalSettingsController");
const passwordSettingController = require("../controllers/user-area/passwordSettingController");

// Workspace Controllers.
const createWorkspaceController = require("../controllers/workspace/createWorkspaceController");
const deleteWorkspaceController = require("../controllers/workspace/deleteWorkspaceController");
const updateWorkspaceController = require("../controllers/workspace/updateWorkspaceController");
const readWorkspaceController = require("../controllers/workspace/readWorkspaceController");
const readAllWorkspacesController = require("../controllers/workspace/readAllWorkspaceController");

// Label Controllers.
const createLabelsController = require("../controllers/labels/createLabelsController");
const updateLabelsController = require("../controllers/labels/updateLabelsController");
const deleteLabelsController = require("../controllers/labels/deleteLabelsController");
const readSingleLabelController = require("../controllers/labels/readSingleLabelController");
const readAllLabelsController = require("../controllers/labels/readAllLabelsController");

// Middlewares.
const isGmailUserMiddleware = require("../middleware/isGmailUserMiddleware");
const jwtUserIDBodyMiddleware = require("../middleware/jwtUserIDBodyMiddleware");
const jwtTokenBodyMiddleware = require("../middleware/jwtTokenBodyMiddleware");
const jwtTokenQueryMiddleware = require("../middleware/jwtTokenQueryMiddleware");

const routes = express.Router();

// Home Route.
routes.get('/', homeController);

// Auth Routes.
routes.post('/api/auth/register', isGmailUserMiddleware, registerUserController);
routes.post('/api/auth/verify-email', verifyEmailController);
routes.post('/api/auth/login', isGmailUserMiddleware, loginUserController);
routes.post('/api/auth/forgot-password', isGmailUserMiddleware, forgotPasswordController);
routes.post('/api/auth/reset-password', resetPasswordController);
routes.post('/api/auth/checker', jwtTokenBodyMiddleware, authCheckerController);
routes.post('/api/auth/re-verify-email', reBerifyEmailController);
routes.post('/api/auth/check-token-validity', verifyTokenController);
routes.post("/api/auth/via-token-email-verification", jwtTokenBodyMiddleware, viaTokenEmailVerificationController);
routes.post("/api/auth/via-optional-email-verification", jwtTokenBodyMiddleware, isGmailUserMiddleware, viaOptionalEmailVerificationController);

// User Routes.
routes.post('/api/users/user-info', jwtTokenBodyMiddleware, userInfoController);
routes.post("/api/users/settings/general", jwtTokenBodyMiddleware, generalSettingsController);
routes.post("/api/users/settings/password", jwtTokenBodyMiddleware, passwordSettingController);

// Workspace Routes.
routes.post("/api/workspaces/create", jwtUserIDBodyMiddleware, createWorkspaceController);
routes.get("/api/workspaces/read", jwtTokenQueryMiddleware, readWorkspaceController);
routes.get("/api/workspaces/read-all", jwtTokenQueryMiddleware, readAllWorkspacesController);
routes.put("/api/workspaces/update", jwtUserIDBodyMiddleware, updateWorkspaceController);
routes.delete("/api/workspaces/delete", jwtUserIDBodyMiddleware, deleteWorkspaceController);

// Label Routes.
routes.post("/api/labels/create", jwtUserIDBodyMiddleware, createLabelsController);
routes.get("/api/labels/read", jwtTokenQueryMiddleware, readSingleLabelController);
routes.get("/api/labels/read-all", jwtTokenQueryMiddleware, readAllLabelsController);
routes.put("/api/labels/update", jwtUserIDBodyMiddleware, updateLabelsController);
routes.delete("/api/labels/delete", jwtUserIDBodyMiddleware, deleteLabelsController);

module.exports = routes;