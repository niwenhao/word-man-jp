import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body className="antialiased">
        <div className="w-full h-screen text-left">
          <p><Link href={"/help.pdf"} target="help">利用方法</Link></p>
          { children }
        </div>
      </body>
    </html>
  );
}
