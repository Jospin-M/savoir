import Providers from "./providers";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
        <head>
          <link
            href="https://cdn.jsdelivr.net/npm/remixicon@3.5.0/fonts/remixicon.css"
            rel="stylesheet"
          />
        </head>

        <body>
            <div id="root"> 
                <Providers>
                  {children}
                </Providers>
            </div>
        </body>
    </html>
  );
}