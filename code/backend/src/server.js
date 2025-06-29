"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var helmet_1 = require("helmet");
var authRoutes_1 = require("./routes/authRoutes");
var cors = require("cors");
var morgan = require("morgan");
var express = require("express");
var app = express();
app.use(cors());
app.use((0, helmet_1.default)());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/api/auth/", authRoutes_1.default);
var PORT = 3000;
app.listen(PORT, function () {
    console.log("Server is running on http://localhost:".concat(PORT));
});
