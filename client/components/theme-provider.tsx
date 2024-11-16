"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider } from "next-themes";

const queryClient = new QueryClient();
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <QueryClientProvider client={queryClient}>
      <NextThemesProvider {...props}>{children}</NextThemesProvider>
    </QueryClientProvider>
  );
}
