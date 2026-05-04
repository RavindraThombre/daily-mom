"use client";

import { useSidebar } from "@/lib/context/sidebar-context";

const SidebarSpacer = () => {
  const { collapsed } = useSidebar();

  return (
    <div
      className={`hidden lg:block transition-all duration-300 ${
        collapsed ? "w-20" : "w-72"
      }`}
    />
  );
};

export default SidebarSpacer;
