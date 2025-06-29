export function handleError(req: any, res: any) {
    console.log(req.error);
    // handle case where email domain doesn't exist
    // instead of handle cases by status number, handle them by the value of the error code 
    // -- this change is response to bug with email address on account registration
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

        case "email_address_invalid":
            res.json({ error: "Invalid email." })
    }
}