"use client";

import { playfair } from "@/data/fonts";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft, Package, Receipt,
  Clock, CheckCircle, XCircle, Truck,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Order } from "@/types/order";
import { useGetMyOrders } from "@/hooks/orders/allOrders";

function statusConfig(status: Order["status"]) {
  switch (status) {
    case "PENDING":
      return { label: "Pending",   icon: Clock,        className: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20" };
    case "CONFIRMED":
      return { label: "Confirmed", icon: CheckCircle,  className: "bg-blue-500/10 text-blue-500 border-blue-500/20" };
    case "DELIVERED":
      return { label: "Delivered", icon: Truck,        className: "bg-green-500/10 text-green-500 border-green-500/20" };
    case "CANCELLED":
      return { label: "Cancelled", icon: XCircle,      className: "bg-red-500/10 text-red-500 border-red-500/20" };
    default:
      return { label: status,      icon: Clock,        className: "bg-muted text-muted-foreground" };
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString("en-US", {
    year:   "numeric",
    month:  "short",
    day:    "numeric",
    hour:   "2-digit",
    minute: "2-digit",
  });
}

export default function OrdersPage() {
  const { data, isPending, error } = useGetMyOrders();

  const orders: Order[] = data?.data ?? [];

  if (isPending) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6 animate-pulse">
            <Package className="w-9 h-9 text-muted-foreground" />
          </div>
          <p className="text-[14px] text-muted-foreground font-light">Loading your orders…</p>
        </div>
      </main>
    );
  }

  /* ── Error ── */
  if (error) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <p className="text-[14px] text-destructive font-light mb-4">
            Failed to load orders. Please try again.
          </p>
          <Button asChild variant="outline">
            <Link href="/"><ArrowLeft className="w-4 h-4 mr-2" />Go Home</Link>
          </Button>
        </div>
      </main>
    );
  }

  /* ── Empty ── */
  if (!orders.length) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
            <Package className="w-9 h-9 text-muted-foreground" />
          </div>
          <h2 className={`${playfair.className} text-3xl font-normal mb-3`}>
            No orders <em>yet</em>
          </h2>
          <p className="text-[14px] text-muted-foreground font-light mb-8 leading-relaxed">
            You haven't placed any orders yet. Head back and find something delicious.
          </p>
          <Button asChild className="gap-2">
            <Link href="/"><ArrowLeft className="w-4 h-4" />Browse Recipes</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Page header ── */}
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="icon" className="rounded-full shrink-0" asChild>
            <Link href="/"><ArrowLeft className="w-4 h-4" /></Link>
          </Button>
          <div>
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground mb-0.5">
              Your history
            </p>
            <h1 className={`${playfair.className} text-4xl font-normal leading-tight`}>
              My <em>orders</em>
            </h1>
          </div>
          <Badge variant="secondary" className="ml-auto text-[12px] px-3 py-1">
            {orders.length} {orders.length === 1 ? "order" : "orders"}
          </Badge>
        </div>

        {/* ── Orders list ── */}
        <div className="flex flex-col gap-5">
          {orders.map((order) => {
            const { label, icon: StatusIcon, className: statusClass } = statusConfig(order.status);

            return (
              <Card key={order.id} className="border border-border rounded-2xl overflow-hidden p-0">

                {/* ── Order header ── */}
                <CardHeader className="px-5 pt-5 pb-3">
                  <div className="flex items-center justify-between gap-3 flex-wrap">

                    {/* Order ID */}
                    <div className="flex items-center gap-2">
                      <Receipt className="w-3.5 h-3.5 text-muted-foreground" />
                      <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-muted-foreground">
                        Order
                      </p>
                      <p className="text-[11px] font-mono text-muted-foreground/60">
                        #{order.id.slice(0, 8).toUpperCase()}
                      </p>
                    </div>

                    <div className="flex items-center gap-3">
                      {/* Status badge */}
                      <span className={cn(
                        "inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border",
                        statusClass
                      )}>
                        <StatusIcon className="w-3 h-3" />
                        {label}
                      </span>

                      {/* Date */}
                      <span className="text-[11px] text-muted-foreground">
                        {formatDate(order.createdAt)}
                      </span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="px-5 pb-5">
                  <Separator className="mb-4" />

                  {/* ── Items ── */}
                  <div className="flex flex-col gap-4">
                    {order.items.map((item) => (
                      <div key={item.id} className="flex items-center gap-4">

                        {/* Image */}
                        {item.images && (
                          <div className="relative w-14 h-14 shrink-0 rounded-xl overflow-hidden bg-muted">
                            <Image
                              src={item.images}
                              alt={item.name}
                              fill
                              className="object-cover"
                              unoptimized
                            />
                          </div>
                        )}

                        {/* Name + price per unit */}
                        <div className="flex-1 min-w-0">
                          <p className={`${playfair.className} text-[15px] font-normal truncate`}>
                            {item.name}
                          </p>
                          <p className="text-[12px] text-muted-foreground mt-0.5">
                            {item.price.toLocaleString()} RWF
                            <span className="mx-1">×</span>
                            {item.quantity}
                          </p>
                        </div>

                        {/* Item total */}
                        <p className="text-[14px] font-medium text-foreground shrink-0">
                          {item.totalPrice.toLocaleString()} RWF
                        </p>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  {/* ── Order total ── */}
                  <div className="flex items-baseline justify-between">
                    <span className={`${playfair.className} text-[15px] font-normal text-muted-foreground`}>
                      Order total
                    </span>
                    <span className={`${playfair.className} text-[22px] font-normal`}>
                      {order.totalAmount.toLocaleString()} RWF
                    </span>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </main>
  );
}