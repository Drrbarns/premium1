"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Command } from "cmdk";
import {
  ClipboardCheck,
  DollarSign,
  FileText,
  Inbox,
  LayoutDashboard,
  Search,
  Settings,
  Shield,
  Truck,
  Users,
  X,
} from "lucide-react";

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin", icon: LayoutDashboard, keywords: "home overview command center" },
  { label: "Inquiries", href: "/admin/inquiries", icon: Inbox, keywords: "quotes leads pipeline" },
  { label: "Shipments", href: "/admin/shipments", icon: Truck, keywords: "cargo freight tracking" },
  { label: "Customs", href: "/admin/customs", icon: ClipboardCheck, keywords: "declarations clearance duties" },
  { label: "Documents", href: "/admin/documents", icon: FileText, keywords: "files uploads vault" },
  { label: "Clients", href: "/admin/clients", icon: Users, keywords: "crm contacts companies" },
  { label: "Finance", href: "/admin/finance", icon: DollarSign, keywords: "invoices billing payments revenue" },
  { label: "Staff", href: "/admin/staff", icon: Shield, keywords: "team users roles" },
  { label: "Settings", href: "/admin/settings", icon: Settings, keywords: "config preferences" },
];

const QUICK_ACTIONS = [
  { label: "New Shipment", href: "/admin/shipments/new", keywords: "create shipment" },
  { label: "New Client", href: "/admin/clients/new", keywords: "create client" },
  { label: "New Invoice", href: "/admin/finance/new", keywords: "create invoice" },
  { label: "New Declaration", href: "/admin/customs/new", keywords: "create customs" },
];

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const go = useCallback(
    (href: string) => {
      setOpen(false);
      router.push(href);
    },
    [router]
  );

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[60]">
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setOpen(false)} />
      <div className="fixed top-[20%] left-1/2 -translate-x-1/2 w-full max-w-lg">
        <Command className="bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          <div className="flex items-center gap-2 px-4 border-b border-slate-100">
            <Search size={16} className="text-slate-400" />
            <Command.Input
              placeholder="Search or jump to…"
              className="flex-1 py-4 text-sm bg-transparent focus:outline-none placeholder:text-slate-400"
              autoFocus
            />
            <button onClick={() => setOpen(false)} className="p-1 rounded-lg hover:bg-slate-100">
              <X size={14} className="text-slate-400" />
            </button>
          </div>
          <Command.List className="max-h-[360px] overflow-y-auto p-2">
            <Command.Empty className="py-8 text-center text-sm text-slate-400">
              No results found.
            </Command.Empty>

            <Command.Group heading="Navigation" className="mb-2">
              {NAV_ITEMS.map((item) => {
                const Icon = item.icon;
                return (
                  <Command.Item
                    key={item.href}
                    value={`${item.label} ${item.keywords}`}
                    onSelect={() => go(item.href)}
                    className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm cursor-pointer data-[selected=true]:bg-[var(--accent)]/10 data-[selected=true]:text-[var(--accent)]"
                  >
                    <Icon size={16} className="shrink-0" />
                    <span className="font-medium">{item.label}</span>
                  </Command.Item>
                );
              })}
            </Command.Group>

            <Command.Group heading="Quick Actions" className="mb-2">
              {QUICK_ACTIONS.map((item) => (
                <Command.Item
                  key={item.href}
                  value={`${item.label} ${item.keywords}`}
                  onSelect={() => go(item.href)}
                  className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm cursor-pointer data-[selected=true]:bg-[var(--accent)]/10 data-[selected=true]:text-[var(--accent)]"
                >
                  <span className="w-4 h-4 rounded bg-[var(--accent)]/20 flex items-center justify-center text-[10px] text-[var(--accent)] font-bold">+</span>
                  <span className="font-medium">{item.label}</span>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
          <div className="px-4 py-2 border-t border-slate-100 flex items-center gap-4 text-[10px] text-slate-400 font-medium">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>ESC Close</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
