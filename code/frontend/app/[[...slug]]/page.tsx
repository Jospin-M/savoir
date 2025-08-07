import { ClientOnly } from "./client";

export function generateStaticParams() {
    return [
        // Root path (empty slugh array)
        { slug: [] },
        // DevTools path
        { slug: [".well-known", "appspecific", "com.chrome.devtools.json"] },

        // Auth routes
        { slug: ["auth", "login"] },
        { slug: ["auth", "signup"] }
    ]
}

export default function Page() {
    return <ClientOnly />
}