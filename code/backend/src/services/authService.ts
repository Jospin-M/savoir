/**
 * Handles server-side errors that could occur during authentication.
 * 
 * @param req - a request containing information about the error
 * @param res - a response object with the appropriate error message.
 */
export function handleAuthError(req: any, res: any) {
    switch(req.error.code) {
        case "invalid_credentials":
            res.json({ error: "Incorrect email or password." });

            break;

        case "otp_expired":
            res.json({ error: "Invalid code."});

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