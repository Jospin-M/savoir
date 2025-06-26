"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var authRoutes_1 = require("./routes/authRoutes");
var express = require("express");
var cors = require("cors");
var app = express();
var PORT = 3000;
app.use(cors()); // specify later the exact domain once website is deployed
app.use(express.json());
app.use("/api/auth", authRoutes_1.authRouter);
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
