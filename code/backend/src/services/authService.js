export function handleError(req, res) {
    switch(req.error.status) {
        case 400:
            res.json({ error: "Incorrect email or password." });

            break;
    }
}