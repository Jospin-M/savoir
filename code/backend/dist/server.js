"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const helmet_1 = __importDefault(require("helmet"));
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const cors = require("cors");
const morgan = require("morgan");
const express = require("express");
const app = express();
app.use(cors());
app.use((0, helmet_1.default)());
app.use(morgan("tiny"));
app.use(express.json());
app.use("/api/auth/", authRoutes_1.default);
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
