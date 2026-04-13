// app/admin/page.tsx  — Dashboard
"use client";

import { playfair } from "@/data/fonts";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  ShoppingBag, UtensilsCrossed, Users, TrendingUp,
  Clock, CheckCircle2, Bike, XCircle,
} from "lucide-react";

const STATS = [
  { label: "Total orders",   value: "248",    sub: "+12 today",       icon: ShoppingBag,      accent: "" },
  { label: "Total recipes",  value: "6",      sub: "In catalogue",    icon: UtensilsCrossed,  accent: "" },
  { label: "Customers",      value: "134",    sub: "+3 this week",    icon: Users,             accent: "" },
  { label: "Revenue",        value: "$4,821", sub: "This month",      icon: TrendingUp,        accent: "text-emerald-600" },
];

const RECENT_ORDERS = [
  { id: "ORD-001", customer: "Jane Smith",   item: "Spaghetti Carbonara", total: "$12.99", status: "on_the_way" },
  { id: "ORD-002", customer: "John Doe",     item: "Chicken Tikka ×2",   total: "$29.98", status: "preparing"  },
  { id: "ORD-003", customer: "Emily R.",     item: "Caesar Salad",        total: "$10.99", status: "delivered"  },
  { id: "ORD-004", customer: "Mark T.",      item: "Korean Beef Tacos",   total: "$13.99", status: "pending"    },
  { id: "ORD-005", customer: "Aline U.",     item: "Choc Chip Cookies",   total: "$8.99",  status: "cancelled"  },
];

const STATUS_MAP: Record<string, { label: string; icon: React.ElementType; class: string }> = {
  pending:    { label: "Pending",     icon: Clock,        class: "bg-[#FAEEDA] text-[#633806] border-[#EF9F27]/30" },
  preparing:  { label: "Preparing",  icon: Clock,        class: "bg-[#EEEDFE] text-[#3C3489] border-[#534AB7]/30" },
  on_the_way: { label: "On the way", icon: Bike,         class: "bg-[#E6F1FB] text-[#0C447C] border-[#378ADD]/30" },
  delivered:  { label: "Delivered",  icon: CheckCircle2, class: "bg-[#E1F5EE] text-[#085041] border-[#1D9E75]/30" },
  cancelled:  { label: "Cancelled",  icon: XCircle,      class: "bg-[#FCEBEB] text-[#791F1F] border-[#E24B4A]/30" },
};

export default function AdminDashboard() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground mb-1">
          Overview
        </p>
        <h1 className={`${playfair.className} text-4xl font-normal leading-tight`}>
          Good morning, <em>Admin</em>
        </h1>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {STATS.map(({ label, value, sub, icon: Icon, accent }) => (
          <Card key={label} className="border border-border rounded-2xl p-0">
            <CardContent className="p-5 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted-foreground">
                  {label}
                </p>
                <div className="w-8 h-8 rounded-lg bg-muted border border-border flex items-center justify-center">
                  <Icon className="w-4 h-4 text-muted-foreground" />
                </div>
              </div>
              <div>
                <p className={`${playfair.className} text-3xl font-normal ${accent}`}>{value}</p>
                <p className="text-[12px] text-muted-foreground font-light mt-0.5">{sub}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Recent orders */}
      <Card className="border border-border rounded-2xl p-0 overflow-hidden">
        <CardHeader className="px-6 pt-6 pb-4">
          <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-muted-foreground">
            Recent orders
          </p>
          <h2 className={`${playfair.className} text-xl font-normal`}>Latest activity</h2>
        </CardHeader>
        <Separator />
        <CardContent className="p-0">
          <div className="divide-y divide-border">
            {RECENT_ORDERS.map((order) => {
              const s = STATUS_MAP[order.status];
              const Icon = s.icon;
              return (
                <div key={order.id} className="flex items-center gap-4 px-6 py-4 hover:bg-muted/50 transition-colors">
                  <p className="text-[12px] font-mono text-muted-foreground w-20 shrink-0">{order.id}</p>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-foreground truncate">{order.customer}</p>
                    <p className="text-[11px] text-muted-foreground truncate">{order.item}</p>
                  </div>
                  <p className="text-[13px] font-medium text-foreground shrink-0">{order.total}</p>
                  <Badge variant="outline" className={`text-[10px] gap-1 border shrink-0 ${s.class}`}>
                    <Icon className="w-3 h-3" />
                    {s.label}
                  </Badge>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}