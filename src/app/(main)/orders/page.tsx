"use client";

import { useState } from "react";
import { playfair } from "@/data/fonts";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  ArrowLeft,
  Search,
  Package,
  ChefHat,
  Bike,
  CheckCircle2,
  XCircle,
  Clock,
  MapPin,
  Phone,
  Star,
  Receipt,
  ChevronDown,
  ChevronUp,
  RotateCcw,
  Truck,
  Filter,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

// ── Types ─────────────────────────────────────────────────
type OrderStatus = "pending" | "preparing" | "on_the_way" | "delivered" | "cancelled";

interface OrderItem {
  title: string;
  qty: number;
  price: number;
  image: string;
  category: string;
}

interface Order {
  id: string;
  date: string;
  time: string;
  status: OrderStatus;
  items: OrderItem[];
  subtotal: number;
  delivery: number;
  discount: number;
  tax: number;
  total: number;
  address: string;
  paymentMethod: string;
  estimatedTime?: string;
  deliveredAt?: string;
  rider?: { name: string; phone: string; rating: number };
  cancelReason?: string;
}

// ── Hardcoded orders ──────────────────────────────────────
const ORDERS: Order[] = [
  {
    id: "ORD-20240317-001",
    date: "March 17, 2024",
    time: "10:32 AM",
    status: "on_the_way",
    estimatedTime: "12 min",
    items: [
      { title: "Spaghetti Carbonara",   qty: 1, price: 12.99, image: "/images/image1.jpg", category: "Pasta"  },
      { title: "Chicken Tikka Masala",  qty: 2, price: 14.99, image: "/images/image2.jpg", category: "Curry"  },
    ],
    subtotal: 42.97,
    delivery: 2.99,
    discount: 4.30,
    tax: 3.33,
    total: 44.99,
    address: "KG 123 St, Kigali, Rwanda",
    paymentMethod: "Visa •••• 4242",
    rider: { name: "Jean Pierre", phone: "+250 788 000 001", rating: 4.8 },
  },
  {
    id: "ORD-20240316-002",
    date: "March 16, 2024",
    time: "07:15 PM",
    status: "delivered",
    deliveredAt: "07:48 PM",
    items: [
      { title: "Classic Caesar Salad",          qty: 1, price: 10.99, image: "/images/image4.jpg", category: "Salad"  },
      { title: "Brown Butter Choc Cookies",     qty: 2, price: 8.99,  image: "/images/image3.jpg", category: "Baking" },
      { title: "Miso Sesame Vegetable Stir-Fry",qty: 1, price: 11.99, image: "/images/image6.jpg", category: "Vegetarian" },
    ],
    subtotal: 40.96,
    delivery: 2.99,
    discount: 5.20,
    tax: 3.02,
    total: 41.77,
    address: "KG 123 St, Kigali, Rwanda",
    paymentMethod: "MTN MoMo •••• 0001",
    rider: { name: "Aline Uwase", phone: "+250 788 000 002", rating: 4.9 },
  },
  {
    id: "ORD-20240315-003",
    date: "March 15, 2024",
    time: "01:00 PM",
    status: "preparing",
    estimatedTime: "25 min",
    items: [
      { title: "Korean Beef Tacos", qty: 3, price: 13.99, image: "/images/image10.jpeg", category: "Street Food" },
    ],
    subtotal: 41.97,
    delivery: 2.99,
    discount: 0,
    tax: 3.36,
    total: 48.32,
    address: "KG 456 Ave, Kigali, Rwanda",
    paymentMethod: "Visa •••• 4242",
  },
  {
    id: "ORD-20240314-004",
    date: "March 14, 2024",
    time: "08:45 PM",
    status: "pending",
    estimatedTime: "45 min",
    items: [
      { title: "Spaghetti Carbonara",  qty: 1, price: 12.99, image: "/images/image1.jpg", category: "Pasta"  },
      { title: "Classic Caesar Salad", qty: 1, price: 10.99, image: "/images/image4.jpg", category: "Salad"  },
    ],
    subtotal: 23.98,
    delivery: 2.99,
    discount: 0,
    tax: 1.92,
    total: 28.89,
    address: "KN 5 Rd, Kigali, Rwanda",
    paymentMethod: "MTN MoMo •••• 0001",
  },
  {
    id: "ORD-20240313-005",
    date: "March 13, 2024",
    time: "12:30 PM",
    status: "cancelled",
    cancelReason: "Restaurant temporarily unavailable",
    items: [
      { title: "Chicken Tikka Masala", qty: 2, price: 14.99, image: "/images/image2.jpg", category: "Curry" },
    ],
    subtotal: 29.98,
    delivery: 2.99,
    discount: 0,
    tax: 2.40,
    total: 35.37,
    address: "KG 789 Blvd, Kigali, Rwanda",
    paymentMethod: "Visa •••• 4242",
  },
  {
    id: "ORD-20240310-006",
    date: "March 10, 2024",
    time: "06:20 PM",
    status: "delivered",
    deliveredAt: "06:55 PM",
    items: [
      { title: "Miso Sesame Vegetable Stir-Fry", qty: 1, price: 11.99, image: "/images/image6.jpg", category: "Vegetarian" },
      { title: "Korean Beef Tacos",              qty: 2, price: 13.99, image: "/images/image10.jpeg", category: "Street Food" },
    ],
    subtotal: 39.97,
    delivery: 2.99,
    discount: 3.99,
    tax: 2.92,
    total: 41.89,
    address: "KG 123 St, Kigali, Rwanda",
    paymentMethod: "MTN MoMo •••• 0001",
    rider: { name: "Eric Nshuti", phone: "+250 788 000 003", rating: 4.7 },
  },
];

// ── Status config ─────────────────────────────────────────
const STATUS_CONFIG: Record<OrderStatus, {
  label: string;
  icon: React.ElementType;
  badgeClass: string;
  dotClass: string;
  step: number;
}> = {
  pending:    { label: "Pending",     icon: Clock,        badgeClass: "bg-[#FAEEDA] text-[#633806] border-[#EF9F27]/30", dotClass: "bg-[#EF9F27]", step: 0 },
  preparing:  { label: "Preparing",  icon: ChefHat,      badgeClass: "bg-[#EEEDFE] text-[#3C3489] border-[#534AB7]/30", dotClass: "bg-[#534AB7]", step: 1 },
  on_the_way: { label: "On the way", icon: Bike,         badgeClass: "bg-[#E6F1FB] text-[#0C447C] border-[#378ADD]/30", dotClass: "bg-[#378ADD]", step: 2 },
  delivered:  { label: "Delivered",  icon: CheckCircle2, badgeClass: "bg-[#E1F5EE] text-[#085041] border-[#1D9E75]/30", dotClass: "bg-[#1D9E75]", step: 3 },
  cancelled:  { label: "Cancelled",  icon: XCircle,      badgeClass: "bg-[#FCEBEB] text-[#791F1F] border-[#E24B4A]/30", dotClass: "bg-[#E24B4A]", step: -1 },
};

const STEPS = [
  { key: "pending",    label: "Order placed",   icon: Receipt  },
  { key: "preparing",  label: "Preparing",      icon: ChefHat  },
  { key: "on_the_way", label: "On the way",     icon: Bike     },
  { key: "delivered",  label: "Delivered",      icon: CheckCircle2 },
];

const categoryColors: Record<string, string> = {
  Pasta:         "bg-[#FAEEDA] text-[#633806]",
  Curry:         "bg-[#E1F5EE] text-[#085041]",
  Baking:        "bg-[#FAECE7] text-[#712B13]",
  Salad:         "bg-[#EAF3DE] text-[#27500A]",
  "Street Food": "bg-[#EEEDFE] text-[#3C3489]",
  Vegetarian:    "bg-[#E1F5EE] text-[#085041]",
};

// ── Stat card ─────────────────────────────────────────────
function StatCard({ label, value, sub, accent }: {
  label: string; value: string | number; sub?: string; accent?: string;
}) {
  return (
    <div className="bg-muted rounded-2xl border border-border p-5 flex flex-col gap-1">
      <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted-foreground">
        {label}
      </p>
      <p className={cn("text-[26px] font-normal leading-none", playfair.className, accent)}>
        {value}
      </p>
      {sub && <p className="text-[12px] text-muted-foreground font-light">{sub}</p>}
    </div>
  );
}

// ── Order card ────────────────────────────────────────────
function OrderCard({ order }: { order: Order }) {
  const [expanded, setExpanded] = useState(false);
  const [reorderDone, setReorderDone] = useState(false);
  const cfg = STATUS_CONFIG[order.status];
  const StatusIcon = cfg.icon;
  const activeStep = cfg.step;

  return (
    <Card className="border border-border rounded-2xl overflow-hidden p-0">

      {/* ── Card header row ── */}
      <CardHeader className="px-5 pt-5 pb-4 space-y-0">
        <div className="flex items-start justify-between gap-3 flex-wrap">

          {/* Left: ID + date */}
          <div>
            <div className="flex items-center gap-2 mb-1">
              <p className="text-[13px] font-medium text-foreground font-mono">
                {order.id}
              </p>
              <Badge
                variant="outline"
                className={cn("text-[10px] font-medium gap-1 border px-2 py-0.5", cfg.badgeClass)}
              >
                <span className={cn("w-1.5 h-1.5 rounded-full inline-block", cfg.dotClass)} />
                {cfg.label}
              </Badge>
            </div>
            <p className="text-[12px] text-muted-foreground">
              {order.date} · {order.time}
            </p>
          </div>

          {/* Right: total + expand */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className={`${playfair.className} text-[20px] font-normal text-foreground`}>
                ${order.total.toFixed(2)}
              </p>
              <p className="text-[11px] text-muted-foreground">
                {order.items.reduce((s, i) => s + i.qty, 0)} items
              </p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full text-muted-foreground"
              onClick={() => setExpanded((v) => !v)}
            >
              {expanded
                ? <ChevronUp className="w-4 h-4" />
                : <ChevronDown className="w-4 h-4" />}
            </Button>
          </div>
        </div>

        {/* Items preview */}
        <div className="flex items-center gap-2 mt-3 flex-wrap">
          {order.items.map((item) => (
            <Badge
              key={item.title}
              variant="secondary"
              className={cn("text-[10px] uppercase tracking-wide border-0", categoryColors[item.category] ?? "bg-muted text-muted-foreground")}
            >
              {item.title} ×{item.qty}
            </Badge>
          ))}
        </div>
      </CardHeader>

      {/* ── Progress tracker (non-cancelled) ── */}
      {order.status !== "cancelled" && (
        <div className="px-5 pb-4">
          <div className="flex items-center gap-0">
            {STEPS.map((step, i) => {
              const done    = activeStep > i;
              const current = activeStep === i;
              const Icon    = step.icon;
              return (
                <div key={step.key} className="flex items-center flex-1 last:flex-none">
                  <div className="flex flex-col items-center gap-1.5">
                    <div
                      className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center border transition-all",
                        done    && "bg-foreground border-foreground text-background",
                        current && "bg-foreground border-foreground text-background ring-4 ring-foreground/10",
                        !done && !current && "bg-muted border-border text-muted-foreground"
                      )}
                    >
                      <Icon className="w-3.5 h-3.5" />
                    </div>
                    <p className={cn(
                      "text-[10px] whitespace-nowrap",
                      (done || current) ? "text-foreground font-medium" : "text-muted-foreground"
                    )}>
                      {step.label}
                    </p>
                  </div>
                  {i < STEPS.length - 1 && (
                    <div className={cn(
                      "flex-1 h-[2px] mb-5 mx-1 rounded-full transition-all",
                      done ? "bg-foreground" : "bg-border"
                    )} />
                  )}
                </div>
              );
            })}
          </div>

          {/* ETA or delivered time */}
          {order.estimatedTime && order.status !== "delivered" && (
            <div className="flex items-center gap-1.5 mt-3">
              <Clock className="w-3.5 h-3.5 text-muted-foreground" />
              <p className="text-[12px] text-muted-foreground">
                Estimated arrival: <span className="font-medium text-foreground">{order.estimatedTime}</span>
              </p>
            </div>
          )}
          {order.deliveredAt && (
            <div className="flex items-center gap-1.5 mt-3">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
              <p className="text-[12px] text-muted-foreground">
                Delivered at <span className="font-medium text-foreground">{order.deliveredAt}</span>
              </p>
            </div>
          )}
        </div>
      )}

      {/* ── Cancelled reason ── */}
      {order.status === "cancelled" && order.cancelReason && (
        <div className="mx-5 mb-4 px-4 py-3 bg-[#FCEBEB] border border-[#E24B4A]/20 rounded-xl flex items-start gap-2">
          <XCircle className="w-4 h-4 text-[#E24B4A] shrink-0 mt-0.5" />
          <p className="text-[12px] text-[#791F1F] leading-relaxed">
            {order.cancelReason}
          </p>
        </div>
      )}

      {/* ── Expanded details ── */}
      {expanded && (
        <>
          <Separator />
          <CardContent className="px-5 py-5 flex flex-col gap-5">

            {/* Items list */}
            <div>
              <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted-foreground mb-3">
                Items ordered
              </p>
              <div className="flex flex-col gap-2">
                {order.items.map((item) => (
                  <div key={item.title} className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-muted border border-border shrink-0 overflow-hidden relative">
                        <div className={cn("w-full h-full", categoryColors[item.category] ?? "bg-muted")} />
                      </div>
                      <div>
                        <p className="text-[13px] font-medium text-foreground">{item.title}</p>
                        <p className="text-[11px] text-muted-foreground">
                          ${item.price.toFixed(2)} × {item.qty}
                        </p>
                      </div>
                    </div>
                    <p className="text-[14px] font-medium text-foreground">
                      ${(item.price * item.qty).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            {/* Price breakdown */}
            <div className="flex flex-col gap-2.5">
              <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted-foreground mb-1">
                Price breakdown
              </p>
              <div className="flex justify-between text-[13px]">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${order.subtotal.toFixed(2)}</span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-[13px]">
                  <span className="text-emerald-600">Discount</span>
                  <span className="text-emerald-600 font-medium">−${order.discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-[13px]">
                <span className="text-muted-foreground">Tax</span>
                <span className="font-medium">${order.tax.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[13px]">
                <span className="text-muted-foreground flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5" />Delivery
                </span>
                <span className="font-medium">${order.delivery.toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between items-baseline">
                <span className={`${playfair.className} text-[16px] font-normal`}>Total</span>
                <span className={`${playfair.className} text-[22px] font-normal`}>
                  ${order.total.toFixed(2)}
                </span>
              </div>
            </div>

            <Separator />

            {/* Delivery + payment info */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted-foreground">
                  Delivery address
                </p>
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-muted-foreground shrink-0 mt-0.5" />
                  <p className="text-[13px] text-foreground leading-relaxed">{order.address}</p>
                </div>
              </div>
              <div className="flex flex-col gap-1.5">
                <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted-foreground">
                  Payment method
                </p>
                <div className="flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-muted-foreground shrink-0" />
                  <p className="text-[13px] text-foreground">{order.paymentMethod}</p>
                </div>
              </div>
            </div>

            {/* Rider info */}
            {order.rider && (
              <>
                <Separator />
                <div className="flex flex-col gap-3">
                  <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted-foreground">
                    {order.status === "delivered" ? "Delivered by" : "Your rider"}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-muted border border-border flex items-center justify-center shrink-0">
                        <Bike className="w-5 h-5 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-[14px] font-medium text-foreground">
                          {order.rider.name}
                        </p>
                        <div className="flex items-center gap-1 mt-0.5">
                          <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                          <span className="text-[12px] text-muted-foreground">
                            {order.rider.rating}
                          </span>
                        </div>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="gap-2 text-[12px] h-9 rounded-xl">
                      <Phone className="w-3.5 h-3.5" />
                      {order.rider.phone}
                    </Button>
                  </div>
                </div>
              </>
            )}

            {/* Actions */}
            <div className="flex gap-3 pt-1">
              {order.status === "delivered" && (
                <>
                  <Button
                    size="sm"
                    className="gap-2 text-[12px] h-9 rounded-xl"
                    onClick={() => setReorderDone(true)}
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Reorder
                  </Button>
                  <Button variant="outline" size="sm" className="gap-2 text-[12px] h-9 rounded-xl">
                    <Star className="w-3.5 h-3.5" />
                    Rate order
                  </Button>
                </>
              )}
              {(order.status === "pending" || order.status === "preparing") && (
                <Button
                  variant="outline"
                  size="sm"
                  className="gap-2 text-[12px] h-9 rounded-xl text-destructive border-destructive/30 hover:bg-destructive/5"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  Cancel order
                </Button>
              )}
              {order.status === "cancelled" && (
                <Button
                  size="sm"
                  className="gap-2 text-[12px] h-9 rounded-xl"
                  onClick={() => setReorderDone(true)}
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  Reorder
                </Button>
              )}
              <Button
                variant="ghost"
                size="sm"
                className="gap-2 text-[12px] h-9 rounded-xl ml-auto text-muted-foreground"
              >
                <Receipt className="w-3.5 h-3.5" />
                Receipt
              </Button>
            </div>
          </CardContent>
        </>
      )}

      {/* Reorder toast */}
      <AlertDialog open={reorderDone} onOpenChange={setReorderDone}>
        <AlertDialogContent className="rounded-2xl max-w-sm">
          <AlertDialogHeader className="items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <AlertDialogTitle className={`${playfair.className} text-2xl font-normal`}>
              Added to <em>cart!</em>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[13px] text-muted-foreground font-light text-center leading-relaxed">
              Items from this order have been added to your cart. Head to checkout when ready.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="justify-center gap-3">
            <AlertDialogAction asChild>
              <Button variant="outline" className="rounded-xl px-6" onClick={() => setReorderDone(false)}>
                Keep browsing
              </Button>
            </AlertDialogAction>
            <AlertDialogAction asChild>
              <Button className="rounded-xl px-6 gap-2" asChild>
                <Link href="/cart">Go to cart</Link>
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </Card>
  );
}

// ── Main page ─────────────────────────────────────────────
export default function OrdersPage() {
  const [search, setSearch]   = useState("");
  const [filter, setFilter]   = useState("all");

  const filtered = ORDERS.filter((o) => {
    const matchStatus = filter === "all" || o.status === filter;
    const matchSearch =
      o.id.toLowerCase().includes(search.toLowerCase()) ||
      o.items.some((i) => i.title.toLowerCase().includes(search.toLowerCase()));
    return matchStatus && matchSearch;
  });

  const stats = {
    total:     ORDERS.length,
    delivered: ORDERS.filter((o) => o.status === "delivered").length,
    active:    ORDERS.filter((o) => ["pending","preparing","on_the_way"].includes(o.status)).length,
    spent:     ORDERS.reduce((s, o) => s + o.total, 0),
  };

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        {/* ── Header ── */}
        <div className="flex items-center gap-4 mb-12">
          <Button variant="ghost" size="icon" className="rounded-full h-10 w-10 shrink-0" asChild>
            <Link href="/"><ArrowLeft className="w-4 h-4" /></Link>
          </Button>
          <div>
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground mb-1">
              Account
            </p>
            <h1 className={`${playfair.className} text-5xl font-normal leading-tight`}>
              My <em>orders</em>
            </h1>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <StatCard label="Total orders"  value={stats.total}                                   sub="Since you joined"          />
          <StatCard label="Delivered"     value={stats.delivered}                               sub="Successfully completed"    />
          <StatCard label="Active"        value={stats.active}   accent="text-[#378ADD]"        sub="In progress right now"     />
          <StatCard label="Total spent"   value={`$${stats.spent.toFixed(2)}`}                  sub="Across all orders"         />
        </div>

        {/* ── Filters ── */}
        <div className="flex flex-col sm:flex-row gap-3 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by order ID or dish name…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-10 h-11 text-[13px] rounded-xl"
            />
          </div>
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-full sm:w-[200px] h-11 rounded-xl text-[13px] gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent className="rounded-xl">
              <SelectItem value="all">All orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="preparing">Preparing</SelectItem>
              <SelectItem value="on_the_way">On the way</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* ── Status legend ── */}
        <div className="flex flex-wrap gap-2 mb-8">
          {(Object.entries(STATUS_CONFIG) as [OrderStatus, typeof STATUS_CONFIG[OrderStatus]][]).map(
            ([key, cfg]) => {
              const count = ORDERS.filter((o) => o.status === key).length;
              return (
                <button
                  key={key}
                  onClick={() => setFilter(filter === key ? "all" : key)}
                  className={cn(
                    "flex items-center gap-2 px-3 py-1.5 rounded-xl border text-[12px] font-medium transition-all",
                    filter === key
                      ? cn(cfg.badgeClass, "border-current")
                      : "bg-muted border-border text-muted-foreground hover:border-border-secondary"
                  )}
                >
                  <span className={cn("w-2 h-2 rounded-full", cfg.dotClass)} />
                  {cfg.label}
                  <span className="opacity-60">{count}</span>
                </button>
              );
            }
          )}
        </div>

        {/* ── Orders list ── */}
        {filtered.length > 0 ? (
          <div className="flex flex-col gap-5">
            {filtered.map((order) => (
              <OrderCard key={order.id} order={order} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="w-16 h-16 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-5">
              <Package className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className={`${playfair.className} text-2xl font-normal mb-2`}>
              No orders <em>found</em>
            </h3>
            <p className="text-[14px] text-muted-foreground font-light">
              Try a different search or filter.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}