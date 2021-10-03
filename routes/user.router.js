const express = require("express");
const passport = require("passport");
const controller = require("../controllers/user.controller.js");
const Router = express.Router();


Router.get("/login", controller.loginGET)
Router.post("/login", controller.login);
Router.post("/signup", controller.signup);

module.exports = Router;