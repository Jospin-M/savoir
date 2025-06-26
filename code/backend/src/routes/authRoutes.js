"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRouter = void 0;
var authClient_1 = require("../clients/authClient");
var authService_1 = require("../services/authService");
var express = require("express");
var authRouter = express.Router();
exports.authRouter = authRouter;
authRouter.post("/login", authClient_1.logInUser, authService_1.handleError);
