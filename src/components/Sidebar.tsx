// app/admin/layout.tsx
"use client";

import { useState } from "react";
import { playfair } from "@/data/fonts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChefHat,
  LayoutDashboard,
  UtensilsCrossed,
  ShoppingBag,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { NAV } from "@/data/navs";



function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={cn(
          "fixed top-0 left-0 h-full w-64 z-40 bg-card border-r border-border",
          "flex flex-col transition-transform duration-300 ease-in-out",
          "lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        {/* Logo */}
        <div className="flex items-center justify-between px-5 py-5 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-foreground flex items-center justify-center shrink-0">
              <ChefHat className="w-4 h-4 text-background" />
            </div>
            <div>
              <p className={`${playfair.className} text-[15px] font-normal text-foreground leading-none`}>
                Delicious
              </p>
              <p className="text-[10px] text-muted-foreground mt-0.5 uppercase tracking-widest">
                Admin
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="lg:hidden w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 overflow-y-auto px-3 py-4 flex flex-col gap-5">
          {NAV.map((group) => (
            <div key={group.label}>
              <p className="text-[10px] font-medium tracking-[0.14em] uppercase text-muted-foreground px-3 mb-2">
                {group.label}
              </p>
              <div className="flex flex-col gap-0.5">
                {group.items.map((item) => {
                  const active = pathname === item.href;
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onClose}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-colors group",
                        active
                          ? "bg-foreground text-background"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      )}
                    >
                      <Icon className="w-4 h-4 shrink-0" />
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge
                          className={cn(
                            "text-[10px] h-5 px-1.5 rounded-full border-0",
                            active
                              ? "bg-background/20 text-background"
                              : "bg-foreground/10 text-foreground"
                          )}
                        >
                          {item.badge}
                        </Badge>
                      )}
                      {active && (
                        <ChevronRight className="w-3 h-3 opacity-60" />
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <Separator />

        {/* User footer */}
        <div className="px-4 py-4 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-muted border border-border flex items-center justify-center shrink-0 text-[12px] font-medium text-foreground">
            A
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[13px] font-medium text-foreground truncate">Admin User</p>
            <p className="text-[11px] text-muted-foreground truncate">admin@delicious.com</p>
          </div>
          <button className="text-muted-foreground hover:text-destructive transition-colors">
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>
    </>
  );
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="lg:pl-64 flex flex-col min-h-screen">

        <header className="sticky top-0 z-20 h-14 bg-background border-b border-border flex items-center gap-4 px-4 sm:px-6">
          <button
            className="lg:hidden w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-4 h-4" />
          </button>

          <div className="flex-1" />

          <button className="relative w-8 h-8 flex items-center justify-center rounded-full hover:bg-muted text-muted-foreground">
            <Bell className="w-4 h-4" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500 border-2 border-background" />
          </button>

          <div className="w-8 h-8 rounded-full bg-foreground flex items-center justify-center text-[12px] font-medium text-background">
            A
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}