import type { Metadata } from "next";
import { Suspense } from "react";
import { Arvo } from "next/font/google";
import "./globals.css";
import { AuthCodeRedirect } from "@/components/auth/auth-code-redirect";

const arvo = Arvo({ weight: ["400", "700"], subsets: ["latin"], variable: "--font-arvo" });

export const metadata: Metadata = {
  title: "It's time to seize the day!",
  description: "Time to get to work!",
  icons: {
    icon: "/super.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={arvo.variable}>
      <body className="font-sans antialiased">
        <Suspense fallback={null}>
          <AuthCodeRedirect />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
