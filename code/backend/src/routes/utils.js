"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createHTTPRequest = createHTTPRequest;
exports.sendHTTPResponse = sendHTTPResponse;
function createHTTPRequest(method, body) {
    return {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    };
}
function sendHTTPResponse(res, code, data) {
    res.status(code);
    res.set("Content-Type", "application/json");
    res.json({ data: data });
}
