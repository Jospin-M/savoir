export function createHTTPRequest(method: string, body: Object) {
    return {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }
}

export function sendHTTPResponse(res: any, code: number, data: Object) {
    res.status(code);
    res.set("Content-Type", "application/json");
    res.json({ data });
}