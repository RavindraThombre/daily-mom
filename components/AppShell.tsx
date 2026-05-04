"use client";

import { useSession } from "next-auth/react";
import Sidebar from "@/components/Sidebar";
import { useSidebar } from "@/lib/context/sidebar-context";
import { cn } from "@/lib/utils";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const { data: session } = useSession();
  const { collapsed } = useSidebar();

  const isAuthenticated = !!session?.user;

  return (
    <div className="flex flex-1 pt-0 pb-16 lg:pt-0 lg:pb-16">
      {isAuthenticated && <Sidebar />}

      <main
        className={cn(
          "flex-1 overflow-y-auto transition-all duration-300 min-w-0",
          isAuthenticated ? (collapsed ? "lg:ml-20" : "lg:ml-72") : "",
        )}
      >
        {children}
      </main>
    </div>
  );
}
