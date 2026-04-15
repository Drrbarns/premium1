"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import {
  FileText,
  Inbox,
  LayoutDashboard,
  LogOut,
  Menu,
  Settings,
  Shield,
  Truck,
  Users,
  X,
} from "lucide-react";
import { useState } from "react";

const ICONS: Record<string, React.ElementType> = {
  LayoutDashboard,
  Inbox,
  Truck,
  FileText,
  Users,
  Shield,
  Settings,
};

interface NavItem {
  href: string;
  label: string;
  icon: string;
}

export function AdminShell({
  children,
  navItems,
  userEmail,
}: {
  children: React.ReactNode;
  navItems: NavItem[];
  userEmail: string | null;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    const supabase = createClient();
    if (supabase) await supabase.auth.signOut();
    router.push("/auth/admin");
    router.refresh();
  };

  const isActive = (href: string) =>
    href === "/admin" ? pathname === "/admin" : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 inset-x-0 h-14 bg-slate-900 text-white flex items-center justify-between px-4 z-50">
        <Link href="/admin" className="font-semibold text-sm">
          Premium 1 Admin
        </Link>
        <button onClick={() => setOpen(!open)} className="p-2">
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 w-60 bg-slate-900 text-white z-40 transition-transform duration-200 ${
          open ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0`}
      >
        <div className="flex flex-col h-full">
          <div className="p-5 border-b border-white/10">
            <Link href="/admin" className="font-bold text-lg tracking-tight block">
              Premium 1
            </Link>
            <span className="text-[11px] text-white/40 uppercase tracking-wider">
              Operations
            </span>
          </div>

          <nav className="flex-1 py-4 px-3 space-y-0.5 overflow-y-auto">
            {navItems.map((n) => {
              const Icon = ICONS[n.icon] || LayoutDashboard;
              const active = isActive(n.href);
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    active
                      ? "bg-white/10 text-white font-medium"
                      : "text-white/60 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <Icon size={18} />
                  {n.label}
                </Link>
              );
            })}
          </nav>

          <div className="p-4 border-t border-white/10">
            {userEmail && (
              <p className="text-xs text-white/40 truncate mb-3">{userEmail}</p>
            )}
            <div className="flex gap-2">
              <Link
                href="/"
                className="flex-1 text-center text-xs py-2 rounded-lg bg-white/5 text-white/60 hover:text-white hover:bg-white/10 transition-colors"
              >
                View Site
              </Link>
              <button
                onClick={handleLogout}
                className="flex items-center justify-center gap-1.5 flex-1 text-xs py-2 rounded-lg bg-white/5 text-white/60 hover:text-red-400 hover:bg-white/10 transition-colors"
              >
                <LogOut size={14} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-30 lg:hidden"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Main */}
      <main className="lg:ml-60 pt-14 lg:pt-0 min-h-screen">
        <div className="p-4 md:p-8">{children}</div>
      </main>
    </div>
  );
}
