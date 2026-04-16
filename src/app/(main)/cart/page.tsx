"use client";

import { playfair } from "@/data/fonts";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { useRouter } from "next/navigation";
import {
  Plus, Minus, Trash2, ShoppingCart, ArrowLeft,
  CreditCard, Receipt, MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useGetAllCartItems, useUpdateCartItemQuantity, useRemoveCartItem } from "@/hooks/cart/useCart";

interface CartItem {
  id: string;
  foodId: string;
  title: string;
  image: string;
  price: number;
  quantity: number;
  totalPrice: number;
}

export default function CartPage() {
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [address, setAddress] = useState("");
  const router = useRouter();

  const { data, isPending, error } = useGetAllCartItems();
  const { mutate: updateQuantity, isPending: isUpdating } = useUpdateCartItemQuantity();
  const { mutate: removeItem, isPending: isRemoving } = useRemoveCartItem();

  const items: CartItem[] = (data?.data?.items ?? []).map((item: any) => ({
    
    id:         item.id,
    foodId:     item.foodId,
    title:      item.foodName,
    image:      item.foodPicture,
    price:      item.foodPrice,
    quantity:   item.quantity,
    totalPrice: item.totalPrice,
  }));

  const total: number = data?.data?.totalAmount ?? 0;

  function increaseQty(item: CartItem) {
    updateQuantity({ itemId: item.id, quantity: item.quantity + 1 });
  }

  function decreaseQty(item: CartItem) {
    if (item.quantity === 1) {
      removeItem(item.id);
      return;
    }
    updateQuantity({ itemId: item.id, quantity: item.quantity - 1 });
  }

  function handleOrder() {
    if (!name || !email || !address) return;
    router.push("/checkout");
  }

  /* ── Loading ── */
  if (isPending) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6 animate-pulse">
            <ShoppingCart className="w-9 h-9 text-muted-foreground" />
          </div>
          <p className="text-[14px] text-muted-foreground font-light">Loading your cart…</p>
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
            Failed to load cart. Please try again.
          </p>
          <Button asChild variant="outline">
            <Link href="/"><ArrowLeft className="w-4 h-4 mr-2" />Go Home</Link>
          </Button>
        </div>
      </main>
    );
  }

  /* ── Empty ── */
  if (!items.length) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center px-4">
        <div className="text-center max-w-sm">
          <div className="w-20 h-20 rounded-2xl bg-muted flex items-center justify-center mx-auto mb-6">
            <ShoppingCart className="w-9 h-9 text-muted-foreground" />
          </div>
          <h2 className={`${playfair.className} text-3xl font-normal mb-3`}>
            Your cart is <em>empty</em>
          </h2>
          <p className="text-[14px] text-muted-foreground font-light mb-8 leading-relaxed">
            You haven't added any recipes yet. Head back and find something delicious.
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        {/* ── Page header ── */}
        <div className="flex items-center gap-3 mb-8">
          <Button variant="ghost" size="icon" className="rounded-full shrink-0" asChild>
            <Link href="/"><ArrowLeft className="w-4 h-4" /></Link>
          </Button>
          <div>
            <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground mb-0.5">
              Your order
            </p>
            <h1 className={`${playfair.className} text-4xl font-normal leading-tight`}>
              Shopping <em>cart</em>
            </h1>
          </div>
          <Badge variant="secondary" className="ml-auto text-[12px] px-3 py-1">
            {items.reduce((s, i) => s + i.quantity, 0)} items
          </Badge>
        </div>

        <div className="grid lg:grid-cols-[1fr_360px] gap-6 items-start">

          {/* ── Left: items ── */}
          <div className="flex flex-col bg-gray-900 border border-border overflow-hidden px-7 py-9">

            {/* Keyed list in its own container */}
            <div className="flex flex-col gap-px">
              {items.map((item, idx) => {
                return (
                  <div
                    key={item.id ?? idx}
                    className={cn(
                      "bg-card flex",
                      idx === 0 && "rounded-t-2xl",
                      idx === items.length - 1 && "rounded-b-2xl"
                    )}
                  >
                    {/* Image */}
                    <div className="relative w-[110px] h-[100px] shrink-0 bg-muted overflow-hidden mx-6 my-5">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover rounded-2xl"
                        unoptimized
                      />
                    </div>

                    {/* Body */}
                    <div className="flex-1 px-4 py-3 flex flex-col justify-between min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h3 className={`${playfair.className} text-[1rem] font-normal leading-snug truncate`}>
                          {item.title}
                        </h3>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 rounded-full text-muted-foreground hover:text-destructive shrink-0"
                          onClick={() => removeItem(item.id)}
                          disabled={isRemoving}
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </Button>
                      </div>

                      {/* Price + stepper */}
                      <div className="flex items-center justify-between mt-2">
                        <p className="text-[15px] font-medium text-foreground">
                          {item.totalPrice.toLocaleString()} RWF
                          <span className="text-[11px] text-muted-foreground font-light ml-1">
                            × {item.quantity}
                          </span>
                        </p>

                        <div className="flex items-center border border-border rounded-xl overflow-hidden">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-none border-0 text-muted-foreground"
                            onClick={() => decreaseQty(item)}
                            disabled={isUpdating || isRemoving}
                          >
                            <Minus className="w-3 h-3" />
                          </Button>
                          <span className="w-7 text-center text-[13px] font-medium select-none">
                            {isUpdating ? "…" : item.quantity}
                          </span>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 rounded-none border-0 text-muted-foreground"
                            onClick={() => increaseQty(item)}
                            disabled={isUpdating || isRemoving}
                          >
                            <Plus className="w-3 h-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Clear cart footer — sibling of the list, not inside it */}
            <div className="bg-card px-4 py-3 flex justify-end border-t border-border mt-px">
              <Button
                variant="ghost"
                size="sm"
                className="text-[12px] text-muted-foreground gap-1.5 h-7"
                onClick={() => items.forEach((item) => removeItem(item.id))}
                disabled={isRemoving}
              >
                <Trash2 className="w-3.5 h-3.5" />
                Clear cart
              </Button>
            </div>
          </div>

          {/* ── Right: summary + form ── */}
          <div className="flex flex-col gap-4 lg:sticky lg:top-6">

            {/* Order summary */}
            <Card className="border border-border rounded-2xl p-0 overflow-hidden">
              <CardHeader className="px-5 pt-5 pb-3">
                <div className="flex items-center gap-2">
                  <Receipt className="w-3.5 h-3.5 text-muted-foreground" />
                  <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-muted-foreground">
                    Order summary
                  </p>
                </div>
              </CardHeader>

              <CardContent className="px-5 pb-4 flex flex-col gap-2.5">
                {items.map((item, idx) => (
                  <div key={item.id ?? idx} className="flex justify-between items-center">
                    <span className="text-[13px] text-muted-foreground truncate max-w-[190px]">
                      {item.title}
                      <span className="text-muted-foreground/50 ml-1">×{item.quantity}</span>
                    </span>
                    <span className="text-[13px] font-medium text-foreground shrink-0">
                      {item.totalPrice.toLocaleString()} RWF
                    </span>
                  </div>
                ))}

                <Separator className="my-1" />

                <div className="flex justify-between items-baseline">
                  <span className={`${playfair.className} text-[16px] font-normal`}>Total</span>
                  <span className={`${playfair.className} text-[22px] font-normal`}>
                    {total.toLocaleString()} RWF
                  </span>
                </div>
              </CardContent>
            </Card>

            {/* Delivery form */}
            <Card className="border border-border rounded-2xl p-0 overflow-hidden">
              <CardHeader className="px-5 pt-5 pb-3">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-muted-foreground" />
                  <p className="text-[11px] font-medium tracking-[0.14em] uppercase text-muted-foreground">
                    Delivery details
                  </p>
                </div>
              </CardHeader>

              <CardContent className="px-5 pb-0 flex flex-col gap-3">
                <div className="flex flex-col gap-1.5">
                  <Label className="text-[12px] text-muted-foreground">Full name</Label>
                  <Input
                    placeholder="Jane Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-9 text-[13px] rounded-[9px]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-[12px] text-muted-foreground">Email</Label>
                  <Input
                    type="email"
                    placeholder="jane@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-9 text-[13px] rounded-[9px]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-[12px] text-muted-foreground">Address</Label>
                  <Input
                    placeholder="123 Main St, City"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="h-9 text-[13px] rounded-[9px]"
                  />
                </div>
              </CardContent>

              <CardFooter className="px-5 py-4">
                <Button
                  className="w-full h-11 gap-2 text-sm font-medium"
                  onClick={handleOrder}
                  disabled={!name || !email || !address || !items.length}
                >
                  <CreditCard className="w-4 h-4" />
                  Place Order · {total.toLocaleString()} RWF
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}