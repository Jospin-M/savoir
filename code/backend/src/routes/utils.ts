function createHTTPRequest(method: string, body: Object) {
    return {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }
}

export async function sendHTTPRequest(endpoint: string, method: string, payload: Object) {
    const DOMAIN = import.meta.env.VITE_DOMAIN;
    const result = await fetch(DOMAIN + "api" + endpoint, createHTTPRequest(method, payload));
    const response = await result.json();

    return response;
}