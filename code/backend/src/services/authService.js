"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = handleError;
function handleError(req, res) {
    console.log(req.error.status);
    switch (req.error.status) {
        case 400:
            res.json({ error: "Incorrect email or password." });
            break;
        case 422:
            res.json({ error: "Email address already in use." });
            break;
    }
}
