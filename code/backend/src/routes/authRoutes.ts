import { logInUser, requestPasswordReset, signUpNewUser, verifyNewUser, changePassword } from "../clients/authClient"
import { handleAuthError } from "../services/authService";
import * as express from "express";

const router = express.Router();

router.post("/login", logInUser, handleAuthError);

router.post("/register", signUpNewUser, handleAuthError);

router.post("/verifyNewUser", verifyNewUser, handleAuthError);

router.post("/password/request-reset", requestPasswordReset, handleAuthError);

router.post("/password/reset", changePassword, handleAuthError);

export default router;