export function handleError(req: any, res: any) {
    // console.log(req.error);
    
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
            res.json({ error: "No users found." });

            break;
    }
}