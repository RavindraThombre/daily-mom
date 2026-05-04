"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { SidebarProvider } from "@/lib/context/sidebar-context";
import { SessionProvider } from "next-auth/react";
import { Toaster } from "sonner";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider basePath="/mom/api/auth">
      <ThemeProvider>
        <SidebarProvider>
          {children}
          <Toaster position="top-right" richColors closeButton />
        </SidebarProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}
