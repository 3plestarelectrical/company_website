// The stylesheet is provided by the Next.js app at build time.
// @ts-expect-error TypeScript may not have CSS module declarations available.
import "./globals.css";
import type { Metadata } from "next";
import AmbientBackground from "@/components/AmbientBackground";

const SITE_NAME = "3ple Star Electrical Technology";
const SITE_DESCRIPTION =
  "Solar installations, house wiring, tools sales, and training in Nigeria.";
const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL || "https://3plestarelectricaltechnology.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — Solar & Electrical Experts`,
    template: `%s — ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  openGraph: {
    siteName: SITE_NAME,
    description: SITE_DESCRIPTION,
    type: "website",
    locale: "en_NG",
  },
  twitter: {
    card: "summary_large_image",
    description: SITE_DESCRIPTION,
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AmbientBackground />
        {children}
      </body>
    </html>
  );
}