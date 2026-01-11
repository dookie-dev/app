"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  ShoppingBag,
  Image as ImageIcon,
  FileText,
  Settings,
  LogOut,
  ClipboardList,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { createClient } from "@/lib/supabase/client";

const menuItems = [
  {
    title: "Dashboard",
    href: "/admin/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ClipboardList,
  },
  {
    title: "Menu",
    href: "/admin/menu",
    icon: ShoppingBag,
  },
  {
    title: "Gallery",
    href: "/admin/gallery",
    icon: ImageIcon,
  },
  {
    title: "Content",
    href: "/admin/content",
    icon: FileText,
  },
  {
    title: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleSignOut = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/"); // Or /login if we have one
    router.refresh();
  };

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen flex flex-col fixed left-0 top-0">
      <div className="p-6 border-b border-gray-100">
        <h1 className="text-2xl font-serif font-bold text-brand-primary">
          Dashboard
        </h1>
        <p className="text-xs text-muted-foreground mt-1">Admin Dashboard</p>
      </div>

      <nav className="flex-1 p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium text-sm",
                isActive
                  ? "bg-brand-primary text-white shadow-soft"
                  : "text-gray-600 hover:bg-gray-50 hover:text-brand-primary",
              )}
            >
              <Icon size={20} />
              {item.title}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 w-full transition-colors text-sm font-medium"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </aside>
  );
}
