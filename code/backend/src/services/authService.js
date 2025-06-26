"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleError = handleError;
function handleError(req, res) {
    switch (req.error.status) {
        case 400:
            res.json({ error: "Incorrect email or password." });
            break;
    }
}
