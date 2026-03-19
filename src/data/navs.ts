import { LayoutDashboard, Settings, ShoppingBag, Users, UtensilsCrossed } from "lucide-react";

export const NAV = [
    {
      label: "Overview",
      items: [
        { href: "/admin",          icon: LayoutDashboard,  label: "Dashboard",  badge: null  },
        { href: "/admin/orders",   icon: ShoppingBag,      label: "Orders",     badge: "12"  },
      ],
    },
    {
      label: "Catalogue",
      items: [
        { href: "/admin/recipes",  icon: UtensilsCrossed,  label: "Recipes",    badge: null  },
      ],
    },
    {
      label: "Manage",
      items: [
        { href: "/admin/customers",icon: Users,            label: "Customers",  badge: null  },
        { href: "/admin/settings", icon: Settings,         label: "Settings",   badge: null  },
      ],
    },
  ];