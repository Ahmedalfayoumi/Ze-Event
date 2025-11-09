"use client";

import React from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { LayoutDashboard, FileText, Image, Settings } from "lucide-react";

const adminNavItems = [
  { name: "Dashboard", href: "/control-panel/dashboard", icon: LayoutDashboard },
  { name: "Pages", href: "/control-panel/pages", icon: FileText },
  { name: "Media", href: "/control-panel/media", icon: Image },
  { name: "Settings", href: "/control-panel/settings", icon: Settings },
];

const AdminSidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-64 bg-sidebar text-sidebar-foreground p-4 border-r border-sidebar-border">
      <h2 className="text-2xl font-bold mb-6 text-sidebar-primary">Admin Panel</h2>
      <nav className="space-y-2">
        {adminNavItems.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className={cn(
              "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
              location.pathname === item.href
                ? "bg-sidebar-primary text-sidebar-primary-foreground"
                : "text-sidebar-foreground"
            )}
          >
            <item.icon className="h-5 w-5" />
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default AdminSidebar;