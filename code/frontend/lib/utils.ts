import { createBrowserClient } from "@supabase/ssr";
import imageCompression from "browser-image-compression";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

/**
 * A browser client for Supabase that manages the user's session.
 */
const supabase = createBrowserClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true
    }
});

export default supabase;

/**
 * Creates an HTTP request object.
 * 
 * @param method - the HTTP method of the request.
 * @param body - the payload sent from the browser.
 */
function createHTTPRequest(method: string, body: object) {
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
 * 
 * @returns the server's response
 */
export async function sendHTTPRequest(endpoint: string, method: string, payload: object) {
    const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
    const result = await fetch(DOMAIN + "api" + endpoint, createHTTPRequest(method, payload));
    const response = await result.json();
    
    return response;
}

/**
 * Create a request to the server that is authenticated by the access token provided with the user's session.
 * 
 * @param method - the HTTP method to use
 * @param body - the payload sent from the browser.
 */
async function createAuthenticatedHTTPRequest(method: string, access_token: string, body?: object) {
    if(method === "GET") {
        return {
            method: method,
            headers: { 
                "Content-Type": "application/json",
                "Authorization": `Bearer ${access_token}`
            }
        };
    }

    return {
        method: method,
        headers: { 
            "Content-Type": "application/json",
            "Authorization": `Bearer ${access_token}`
        },
        body: JSON.stringify(body)
    };
}

/**
 * Sends an authenticated request to the server and receives the response.
 * 
 * @param endpoint - the location of the requested resource.
 * @param method - the HTTP method to be used.
 * @param payload - the data to be sent
 * 
 * @returns the server's response
 */
export async function sendAuthenticatedHTTPRequest(endpoint: string, method: string, payload?: object, access_token?: string) {
    if(!access_token) { // for client-side requests, we use the access token in the browser session
        const { data: { session } } = await supabase.auth.getSession();
        access_token = session?.access_token!;
    } // otherwise, the token is provided as a parameter since the request is made from the server 

    const DOMAIN = process.env.NEXT_PUBLIC_DOMAIN;
    const result = await fetch(DOMAIN + "api" + endpoint, await createAuthenticatedHTTPRequest(method, access_token, payload));
    const response = await result.json();
    
    return response;
}

type UploadData = {
    bucket: string,
    folders: string[],
    id: string
}

/**
 * Uploads multiple files to Supabase Storage using presigned URLs.
 *
 * @param fileData - metadata used by the server to generate presigned upload URLs.
 * @param files - an array of File objects that will be uploaded.
 * @param bucket - the target Supabase Storage bucket where the files will be stored.
 * @param compressionOptions - the compression options to use for the files
 *
 * @returns A promise that resolves to an array of file paths corresponding to the uploaded files.
 */
export async function uploadFiles(fileData: UploadData, files: File[], bucket: string, compressionOptions: Record<string, object>) {
    // obtain signed urls for the files
    const { folderInformation } = await sendAuthenticatedHTTPRequest("/files/presign", "POST", fileData!);
    
    // transform the server response into a list so we can simutaneously traverse both the url and the file lists 
    const folderEntries: [string,
        { signedUrl: string, path: string, token: string }
    ][] = Object.entries(folderInformation);
    
    // upload the files to the database
    const filePaths: string[] = [];

    for(let i = 0; i < folderEntries.length; i++) {
        const file = files![i];
        const folderName = folderEntries[i][0];
        const compressedFile = await imageCompression(file, compressionOptions[folderName]);

        const { path, token } = folderEntries[i][1];
        filePaths.push(path);

        await supabase
            .storage
            .from(bucket)
            .uploadToSignedUrl(path, token, compressedFile);
    }

    console.log(filePaths)
    return filePaths;
}