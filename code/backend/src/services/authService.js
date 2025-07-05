"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = handleError;
function handleError(req, res) {
    // console.log(req.error);
    switch (req.error.code) {
        case "invalid_credentials":
            res.json({ error: "Incorrect email or password." });
            break;
        case "otp_expired":
            res.json({ error: "Invalid code." });
            break;
        case "email_exists":
            res.json({ error: "Email address already in use." });
            break;
        case "email_invalid":
            res.json({ error: "Email address not found." });
            break;
        case "same_password":
            res.json({ error: "New password should be different from previous one." });
            break;
    }
}
