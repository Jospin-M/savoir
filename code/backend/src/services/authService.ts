export function handleError(req: any, res: any) {
    console.log(req.error);
    
    switch(req.error.status) {
        case 400:
            res.json({ error: "Incorrect email or password." });

            break;

        case 403:
            res.json({ error: "Invalid code."});

            break;

        case 422:
            res.json({ error: "Email address already in use." });

            break;
    }
}