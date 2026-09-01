import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "3ple Star Electrical Technology — Solar & Electrical Experts",
  description: "Solar installations, house wiring, tools sales, and training in Nigeria.",
};

// Minimal root layout: just html/body + global styles/fonts. The public site's
// Header/Footer live in app/(site)/layout.tsx, and /admin has its own shell —
// this keeps the admin dashboard from inheriting public-site chrome.
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
      <body>{children}</body>
    </html>
  );
}
