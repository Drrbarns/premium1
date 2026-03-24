import Link from "next/link";

const nav = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/inquiries", label: "Inquiries" },
  { href: "/admin/shipments", label: "Shipments" },
  { href: "/admin/documents", label: "Documents" },
  { href: "/admin/clients", label: "Clients" },
  { href: "/admin/staff", label: "Staff" },
  { href: "/admin/settings", label: "Settings" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-100">
      <aside className="fixed left-0 top-0 w-56 h-full bg-slate-900 text-white p-4">
        <Link href="/admin" className="font-semibold text-lg block mb-6">Premium 1 Admin</Link>
        <nav className="space-y-1">
          {nav.map((n) => (
            <Link key={n.href} href={n.href} className="block py-2 px-3 rounded hover:bg-slate-800 text-sm">
              {n.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="ml-56 p-8">{children}</main>
    </div>
  );
}
