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

export function setCookie(data: Object) {
    const expires = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toUTCString();

    document.cookie = `session=${encodeURIComponent(JSON.stringify(data))}; expires=${expires}; path=/`;
}

function getCookieValue(name: string) {
    const cookies = document.cookie.split(";");
    
    for(let cookie of cookies) {
        const [key, value] = cookie.split("=");
        
        if(key.trim() === name) {
            return decodeURIComponent(value);
        }
    }

    return null;
}

export function getAccessToken() {
    const session = JSON.parse(getCookieValue("session")!);
    console.log(session);
    isTokenExpired();
    //return session!.access_token;
}

export function isTokenExpired() {
    const { access_token, refresh_token, expires_at } = JSON.parse(getCookieValue("session")!);
    const currentTime = Date.now() / 1000;
    const fiveMinutes = 5 * 60;

    console.log(expires_at - fiveMinutes > currentTime);
    console.log("Access Token:", access_token);
    console.log("Refresh Token:", refresh_token);
}