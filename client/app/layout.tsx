import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { Toaster } from "@/components/ui/toaster";
import type { Metadata } from "next";

import { AppSidebar } from "@/components/app-sidebar";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import DynamicProvider from "@/lib/providers/dynamic";
import { AnalyticsProvider } from "@/lib/providers/analytics";

export const metadata: Metadata = {
  title: "MatesRaffle",
  description: "The fairest raffle software in the world.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <AnalyticsProvider />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DynamicProvider>
            <SidebarProvider>
              <AppSidebar />

              <div className="flex flex-col w-full">
                <SidebarTrigger />
                <main className="flex-grow">
                  {children}
                  <Toaster />
                </main>
              </div>
            </SidebarProvider>
          </DynamicProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
