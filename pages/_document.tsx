import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                {/* ICONS (shared by every page) */}
                <link rel="icon" href="/assets/favicon.ico" sizes="any" />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="32x32"
                    href="/assets/favicon-32x32.png"
                />
                <link
                    rel="icon"
                    type="image/png"
                    sizes="16x16"
                    href="/assets/favicon-16x16.png"
                />
                <link
                    rel="apple-touch-icon"
                    sizes="180x180"
                    href="/assets/apple-touch-icon.png"
                />
                <link rel="manifest" href="/assets/site.webmanifest" />
            </Head>
            <body>
                <Main />
                <NextScript />
            </body>
        </Html>
    )
}
