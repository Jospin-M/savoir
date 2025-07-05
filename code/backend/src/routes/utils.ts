/**
 * Creates an HTTP request object.
 * 
 * @param method - the HTTP method of the request.
 * @param body - the payload sent from the browser.
 * @returns - a properly formatted HTTP request.
 */
function createHTTPRequest(method: string, body: Object) {
    return {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body)
    }
}

/**
 * Sends a request to the server and receives the response.
 * 
 * @param endpoint - the location of the requested resource.
 * @param method - the HTTP method to be used.
 * @param payload - the data to be sent
 * @returns the server's response
 */
export async function sendHTTPRequest(endpoint: string, method: string, payload: Object) {
    const DOMAIN = import.meta.env.VITE_DOMAIN;
    const result = await fetch(DOMAIN + "api" + endpoint, createHTTPRequest(method, payload));
    const response = await result.json();

    return response;
}