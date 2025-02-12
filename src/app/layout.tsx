import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { PrismaClient } from "@prisma/client";
import Home from "./page";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const prisma = new PrismaClient();

async function getChapters() {
  return await prisma.chapter.findMany({
    include: {
      questions: true,
    },
  });
}

export default async function RootLayout() {
  return (
    <html lang="ja">
      <body className="antialiased">
        <p><Link href={"/help.pdf"} target="help">利用方法</Link></p>
        <div>
          <Home chapters={await getChapters()}/>
        </div>
      </body>
    </html>
  );
}
