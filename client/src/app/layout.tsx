import type { Metadata } from "next";
import localFont from "next/font/local";
import { Roboto } from "next/font/google";
import "./globals.css";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import SignInBtn from "../components/SignInBtn";
import TopBar from "../components/TopBar";
import { SpidermanProvider } from "@/context/Spiderman";
import SpidermanButton from "../components/SpidermanButton";

const geistSans = localFont({
  src: "/assets/fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "/assets/fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});
const roboto = Roboto({
  variable: "--font-roboto",
  weight: "400",
  preload: true,
  subsets: ["latin-ext"],
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <SpidermanProvider>
        <html lang="en">
          <body
            className={`${geistSans.variable} ${geistMono.variable} ${roboto.variable} antialiased grid min-h-[100dvh] grid-rows-[auto_1fr_auto] relative`}
          >
            <SignedOut>
              <div />
              <div className="flex justify-center items-center">
                <SignInBtn />
              </div>
            </SignedOut>
            <SignedIn>
              <TopBar />
              {children}
              <SpidermanButton />
            </SignedIn>
          </body>
        </html>
      </SpidermanProvider>
    </ClerkProvider>
  );
}
