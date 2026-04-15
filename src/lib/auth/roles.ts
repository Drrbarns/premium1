export type StaffRole = "admin" | "operations" | "documentation" | "customer_service";

const ROLE_PERMISSIONS: Record<StaffRole, string[]> = {
  admin: ["inquiries", "shipments", "documents", "clients", "staff", "settings"],
  operations: ["inquiries", "shipments", "documents", "clients"],
  documentation: ["documents", "shipments:read", "clients:read"],
  customer_service: ["inquiries", "clients"],
};

export function canAccess(role: StaffRole, resource: string): boolean {
  const perms = ROLE_PERMISSIONS[role] || [];
  return perms.includes(resource) || perms.includes(`${resource}:read`);
}

export function canWrite(role: StaffRole, resource: string): boolean {
  const perms = ROLE_PERMISSIONS[role] || [];
  return perms.includes(resource);
}

export function getNavItems(role: StaffRole) {
  const all = [
    { href: "/admin", label: "Dashboard", icon: "LayoutDashboard", resource: "" },
    { href: "/admin/inquiries", label: "Inquiries", icon: "Inbox", resource: "inquiries" },
    { href: "/admin/shipments", label: "Shipments", icon: "Truck", resource: "shipments" },
    { href: "/admin/documents", label: "Documents", icon: "FileText", resource: "documents" },
    { href: "/admin/clients", label: "Clients", icon: "Users", resource: "clients" },
    { href: "/admin/staff", label: "Staff", icon: "Shield", resource: "staff" },
    { href: "/admin/settings", label: "Settings", icon: "Settings", resource: "settings" },
  ];
  return all.filter((n) => !n.resource || canAccess(role, n.resource));
}
