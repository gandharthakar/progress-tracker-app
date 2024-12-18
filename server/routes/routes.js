const express = require("express");

// Home Controllers.
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

// Users Controllers.
const userInfoController = require("../controllers/user-area/userInfoController");
const generalSettingsController = require("../controllers/user-area/generalSettingsController");
const passwordSettingController = require("../controllers/user-area/passwordSettingController");

// Workspaces Controllers.
const createWorkspacesController = require("../controllers/workspaces/createWorkspacesController");
const deleteWorkspacesController = require("../controllers/workspaces/deleteWorkspacesController");
const updateWorkspacesController = require("../controllers/workspaces/updateWorkspacesController");
const readSingleWorkspaceController = require("../controllers/workspaces/readSingleWorkspaceController");
const readAllWorkspacesController = require("../controllers/workspaces/readAllWorkspaceController");

// Sections Controllers.
const createSectionsController = require("../controllers/sections/createSectionsController");
const readSingleSectionController = require("../controllers/sections/readSingleSectionController");
const readAllSectionsController = require("../controllers/sections/readAllSectionsController");
const updateSectionsController = require("../controllers/sections/updateSectionsController");
const deleteSectionsController = require("../controllers/sections/deleteSectionsController");

// Tasks Controllers.
const createTasksController = require("../controllers/tasks/createTasksController");
const readSingleTaskController = require("../controllers/tasks/readSingleTaskController");
const readAllTasksController = require("../controllers/tasks/readAllTasksController");
const readAllTasksBySectionIdController = require("../controllers/tasks/readAllTasksBySectionIdController");
const updateTasksController = require("../controllers/tasks/updateTasksController");
const deleteTasksController = require("../controllers/tasks/deleteTasksController");

// Labels Controllers.
const createLabelsController = require("../controllers/labels/createLabelsController");
const readSingleLabelController = require("../controllers/labels/readSingleLabelController");
const readAllLabelsController = require("../controllers/labels/readAllLabelsController");
const updateLabelsController = require("../controllers/labels/updateLabelsController");
const deleteLabelsController = require("../controllers/labels/deleteLabelsController");
const saveLabelOrderController = require("../controllers/labels/saveLabelOrderController");

// Master Controllers.
const readMasterWorkspaceController = require("../controllers/master/readMasterWorkspace");
const updateMasterWorkspaceController = require("../controllers/master/updateMasterWorkspaceController");

// Middlewares.
const isGmailUserMiddleware = require("../middleware/isGmailUserMiddleware");
const jwtUserIDBodyMiddleware = require("../middleware/jwtUserIDBodyMiddleware");
const jwtTokenBodyMiddleware = require("../middleware/jwtTokenBodyMiddleware");
const jwtTokenQueryMiddleware = require("../middleware/jwtTokenQueryMiddleware");

// Router Instance.
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

// Users Routes.
routes.post('/api/users/user-info', jwtTokenBodyMiddleware, userInfoController);
routes.post("/api/users/settings/general", jwtTokenBodyMiddleware, generalSettingsController);
routes.post("/api/users/settings/password", jwtTokenBodyMiddleware, passwordSettingController);

// Workspaces Routes.
routes.post("/api/workspaces/create", jwtUserIDBodyMiddleware, createWorkspacesController);
routes.get("/api/workspaces/read", jwtTokenQueryMiddleware, readSingleWorkspaceController);
routes.get("/api/workspaces/read-all", jwtTokenQueryMiddleware, readAllWorkspacesController);
routes.put("/api/workspaces/update", jwtUserIDBodyMiddleware, updateWorkspacesController);
routes.delete("/api/workspaces/delete", jwtUserIDBodyMiddleware, deleteWorkspacesController);

// Sections Routes.
routes.post("/api/sections/create", jwtUserIDBodyMiddleware, createSectionsController);
routes.put("/api/sections/update", jwtUserIDBodyMiddleware, updateSectionsController);
routes.get("/api/sections/read", jwtTokenQueryMiddleware, readSingleSectionController);
routes.get("/api/sections/read-all", jwtTokenQueryMiddleware, readAllSectionsController);
routes.delete("/api/sections/delete", jwtUserIDBodyMiddleware, deleteSectionsController);

// Tasks Routes.
routes.post("/api/tasks/create", jwtUserIDBodyMiddleware, createTasksController);
routes.get("/api/tasks/read", jwtTokenQueryMiddleware, readSingleTaskController);
routes.get("/api/tasks/read-all", jwtTokenQueryMiddleware, readAllTasksController);
routes.get("/api/tasks/read-all-by-section-id", jwtTokenQueryMiddleware, readAllTasksBySectionIdController);
routes.put("/api/tasks/update", jwtUserIDBodyMiddleware, updateTasksController);
routes.delete("/api/tasks/delete", jwtUserIDBodyMiddleware, deleteTasksController);

// Labels Routes.
routes.post("/api/labels/create", jwtUserIDBodyMiddleware, createLabelsController);
routes.get("/api/labels/read", jwtTokenQueryMiddleware, readSingleLabelController);
routes.get("/api/labels/read-all", jwtTokenQueryMiddleware, readAllLabelsController);
routes.put("/api/labels/update", jwtUserIDBodyMiddleware, updateLabelsController);
routes.delete("/api/labels/delete", jwtUserIDBodyMiddleware, deleteLabelsController);
routes.put("/api/labels/save-order", jwtUserIDBodyMiddleware, saveLabelOrderController);

// Master Routes.
routes.get("/api/master/workspace/read", jwtTokenQueryMiddleware, readMasterWorkspaceController);
routes.put("/api/master/workspace/update", jwtUserIDBodyMiddleware, updateMasterWorkspaceController);

module.exports = routes;