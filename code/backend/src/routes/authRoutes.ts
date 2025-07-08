import { logInUser, requestPasswordReset, signUpNewUser, verifyNewUser, changePassword, getProfile } from "../clients/authClient"
import { handleAuthError } from "../services/authService";

const express = require("express");
const router = express.Router();

router.post("/login", logInUser, handleAuthError);

router.post("/register", signUpNewUser, handleAuthError);

router.post("/verifyNewUser", verifyNewUser, handleAuthError);

router.post("/password/request-reset", requestPasswordReset, handleAuthError);

router.post("/password/reset", changePassword, handleAuthError);

router.get("/profile/:id", getProfile);

export default router;