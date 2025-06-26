"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authClient_1 = require("../clients/authClient");
var authService_1 = require("../services/authService");
var express = require("express");
var router = express.Router();
router.post("/login", authClient_1.logInUser, authService_1.handleError);
router.post("/register", authClient_1.signUpNewUser, authService_1.handleError);
exports.default = router;
