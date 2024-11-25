import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import type { Metadata } from "next";

import { AppSidebar } from "@/components/app-sidebar";
import "./globals.css";

import { ThemeProvider } from "@/components/theme-provider";
import DynamicProvider from "@/lib/providers/dynamic";

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
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <DynamicProvider>
            <SidebarProvider>
              <AppSidebar />
              <main>
                <SidebarTrigger />
                {children}
              </main>
            </SidebarProvider>
          </DynamicProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
