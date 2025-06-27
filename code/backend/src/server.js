"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app = express();
var cors = require("cors");
var authRoutes_1 = require("./routes/authRoutes");
var PORT = 3000;
app.use(cors());
app.use(express.json());
app.use("/api/auth/", authRoutes_1.default);
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
