const express = require("express");

// Controllers
const homeController = require("./../controllers/homeController");
const registerUserController = require("../controllers/auth/registerController");
const loginUserController = require("../controllers/auth/loginController");
const verifyEmailController = require("../controllers/auth/verifyController");
const forgotPasswordController = require("../controllers/auth/forgotPasswordController");
const resetPasswordController = require("../controllers/auth/resetPasswordController");

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

module.exports = routes;