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

export async function sendHTTPRequest(endpoint: string, method: string, payload: Object) {
    const DOMAIN = import.meta.env.VITE_DOMAIN;
    
    const result = await fetch(DOMAIN + "api" + endpoint, createHTTPRequest(method, payload));
    const response = await result.json();

    return response;
}

export function setCookie(data: Object) {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();

    document.cookie = `session=${encodeURIComponent(JSON.stringify(data))}; expires=${expires}; path=/`;
}