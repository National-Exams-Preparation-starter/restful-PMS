import type { NavItem } from "@/types/common";

export type UserRole = "ADMIN" | "CLIENT";

const ROLE_SPECIFIC_NAV_ITEMS: Partial<Record<UserRole, NavItem[]>> = {
  ADMIN: [
    {
      name: "Dashboard",
      icon: "cuida:document-texts-outline",
      href: "/admin/dashboard",
    },
    {
      name: "Parking Slots",
      icon: "gg:search-found",
      href: "/admin/parking-slots",
    },
    {
      name: "Reservations",
      href: "/admin/reservations",
      icon: "cuida:folder-outline",
    },
    {
      name: "Payments",
      href: "/admin/payments",
      icon: "cuida:folder-outline",
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: "cuida:folder-outline",
    },
  ],
  CLIENT: [
    {
      name: "Overview",
      icon: "mingcute:announcement-line",
      href: "/dashboard",
    },
    {
      name: "My Vehicles",
      href: "/vehicles",
      icon: "solar:documents-outline",
    },
    {
      name: "My reservations",
      href: "/reservations",
      icon: "ic:round-supervisor-account",
    },
    {
      name: "My Payments",
      href: "/payments",
      icon: "ic:round-supervisor-account",
    },
  ],
};

export function getNavItems(role: UserRole): NavItem[] {
  return [...(ROLE_SPECIFIC_NAV_ITEMS[role] || [])];
}
