import { logInUser, requestPasswordReset, signUpNewUser, verifyUser } from "../clients/authClient"
import { handleError } from "../services/authService";

const express = require("express");
const router = express.Router();

router.post("/login", logInUser, handleError);

router.post("/register", signUpNewUser, handleError);

router.post("/verify", verifyUser, handleError);

router.post("/password/request-password-reset", requestPasswordReset, handleError);

export default router;