"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import {
  LayoutDashboard,
  FileText,
  PlusCircle,
  History,
  Settings,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useSidebar } from "@/lib/context/sidebar-context";

const navItems = [
  {
    label: "Dashboard",
    href: "/daily-mom",
    icon: LayoutDashboard,
  },
  {
    label: "New MOM",
    href: "/new-mom",
    icon: PlusCircle,
  },
  {
    label: "History",
    href: "/history",
    icon: History,
  },
  {
    label: "Drafts",
    href: "/drafts",
    icon: FileText,
  },
  {
    label: "Settings",
    href: "/settings",
    icon: Settings,
  },
];

interface SidebarProps {
  mobileOpen?: boolean;
}

const Sidebar = ({ mobileOpen }: SidebarProps) => {
  const { collapsed, setCollapsed } = useSidebar();

  const pathname = usePathname();

  return (
    <aside
      className={cn(
        "fixed top-16 bottom-10 left-0 z-40 border-r bg-background transition-all duration-300",
        mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        collapsed ? "w-20" : "w-72",
      )}
    >
      <div className="flex h-full flex-col">
        {/* Toggle */}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto space-y-2 mt-3 px-3 pb-4">
          {navItems.map((item) => {
            const Icon = item.icon;

            const active =
              pathname === item.href ||
              (item.href !== "/daily-mom" && pathname.startsWith(item.href));

            return (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "flex items-center rounded-xl py-3 text-sm font-medium transition-all",
                  collapsed ? "justify-center px-2" : "gap-3 px-4",
                  active
                    ? "bg-primary text-primary-foreground"
                    : "hover:bg-muted",
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />

                {!collapsed && <span className="truncate">{item.label}</span>}
              </Link>
            );
          })}
        </nav>

        <div
          className={cn(
            "flex p-4",
            collapsed ? "justify-center" : "justify-end",
          )}
        >
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="rounded-xl p-2 hover:bg-muted transition"
          >
            {collapsed ? (
              <ChevronRight className="h-5 w-5" />
            ) : (
              <ChevronLeft className="h-5 w-5" />
            )}
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
