import { ClientOnly } from "./client";

export function generateStaticParams() {
    return [
        // Root path (empty slug array)
        { slug: [] },
        // DevTools path
        { slug: [".well-known", "appspecific", "com.chrome.devtools.json"] },

        // Auth routes
        { slug: ["auth", "login"] },
        { slug: ["auth", "signup"] },
        { slug: ["auth", "verify"] },
        { slug: ["auth", "password", "sendResetLink"] },
        { slug: ["auth", "password", "reset"] }
    ]
}

export default function Page() {
    return <ClientOnly />
}