import { logInUser } from "../clients/authClient";
import { handleError } from "../services/authService";

const express = require("express");
const authRouter = express.Router();

authRouter.post("/login", logInUser, handleError);

export { authRouter };