import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TopNav from "@/components/navbars/TopNav";
import { Sidebar } from "@/components/navbars/SideNav";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Wind Tempo",
  description: "Rhythm-based piano practice",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-zinc-50 text-zinc-900 transition-colors dark:bg-[#030303] dark:text-zinc-100`}
      >
        <ThemeProvider>
          <TopNav />
          <div className="flex min-h-[calc(100vh-3rem)]">
            <Sidebar />
            <main className="flex-1 bg-zinc-50 dark:bg-[#030303] transition-colors">
              <div className="mx-auto w-full max-w-7xl px-6 py-6">
                {children}
              </div>
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
