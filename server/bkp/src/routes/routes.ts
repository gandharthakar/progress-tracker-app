const express = require("express");
const homeController = require("./../controllers/homeController.js");

const routes = express.Router();

// Home Route
routes.get('/', homeController);

module.exports = routes;