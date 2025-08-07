import type { Metadata } from "next";

export const metadata: Metadata = {
    other: {
        "link:stylesheet": "https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css",
    }
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
        <body>
            <div id="root"> {children} </div>
        </body>
    </html>
  );
}