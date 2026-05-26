import type { Metadata } from "next";
import { IBM_Plex_Sans_Thai, JetBrains_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { FeedbackButton } from "@/components/FeedbackButton";

const sans = IBM_Plex_Sans_Thai({
  variable: "--font-sans",
  subsets: ["latin", "thai"],
  weight: ["300", "400", "500", "600", "700"],
});

const mono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Convex Course — เรียนรู้ Backend Web Development",
  description:
    "คอร์สสำหรับผู้เริ่มต้น สอนแนวคิด backend และ real-time database ผ่านการสร้าง Quiz App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${sans.variable} ${mono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-slate-50 text-slate-900">
        <ConvexClientProvider>
          <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto max-w-4xl px-6 py-4 flex items-center justify-between">
              <Link
                href="/"
                className="font-semibold text-lg tracking-tight hover:text-indigo-600 transition"
              >
                🎓 Convex Course
              </Link>
              <nav className="text-sm text-slate-600">
                <a
                  href="https://docs.convex.dev"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-indigo-600"
                >
                  Convex Docs ↗
                </a>
              </nav>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t border-slate-200 bg-white">
            <div className="mx-auto max-w-4xl px-6 py-6 text-sm text-slate-500">
              สร้างด้วย Next.js + Tailwind • คอร์ส Convex สำหรับผู้เริ่มต้น
            </div>
          </footer>
          <FeedbackButton />
        </ConvexClientProvider>
      </body>
    </html>
  );
}
