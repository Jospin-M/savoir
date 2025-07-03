import { logInUser, requestPasswordReset, signUpNewUser, verifyNewUser } from "../clients/authClient"
import { handleError } from "../services/authService";

const express = require("express");
const router = express.Router();

router.post("/login", logInUser, handleError);

router.post("/register", signUpNewUser, handleError);

router.post("/verifyNewUser", verifyNewUser, handleError);

router.post("/password/request-reset", requestPasswordReset, handleError);

router.post("/verifyExistingUser");

export default router;