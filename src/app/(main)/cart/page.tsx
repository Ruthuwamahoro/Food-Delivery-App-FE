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
import {useRouter} from "next/navigation"
import {
  Plus,
  Minus,
  Trash2,
  ShoppingCart,
  ArrowLeft,
  Clock,
  ChefHat,
  Tag,
  CreditCard,
  CheckCircle2,
  Receipt,
  MapPin,
} from "lucide-react";
import { cn } from "@/lib/utils";

const DELIVERY_FEE = 2.99;
const TAX_RATE = 0.08;

const categoryColors: Record<string, string> = {
  Pasta:         "bg-[#FAEEDA] text-[#633806]",
  Curry:         "bg-[#E1F5EE] text-[#085041]",
  Baking:        "bg-[#FAECE7] text-[#712B13]",
  Salad:         "bg-[#EAF3DE] text-[#27500A]",
  "Street Food": "bg-[#EEEDFE] text-[#3C3489]",
  Vegetarian:    "bg-[#E1F5EE] text-[#085041]",
};

interface CartItem {
  id: number;
  title: string;
  image: string;
  category: string;
  time: string;
  difficulty: string;
  price: number;
  quantity: number;
}

const INITIAL_ITEMS: CartItem[] = [
  {
    id: 1,
    title: "Spaghetti Carbonara",
    image: "/images/image1.jpg",
    category: "Pasta",
    time: "25 min",
    difficulty: "Medium",
    price: 12.99,
    quantity: 1,
  },
  {
    id: 2,
    title: "Chicken Tikka Masala",
    image: "/images/image2.jpg",
    category: "Curry",
    time: "50 min",
    difficulty: "Medium",
    price: 14.99,
    quantity: 2,
  },
  {
    id: 3,
    title: "Brown Butter Chocolate Chip Cookies",
    image: "/images/image3.jpg",
    category: "Baking",
    time: "35 min",
    difficulty: "Easy",
    price: 8.99,
    quantity: 1,
  },
];

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>(INITIAL_ITEMS);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [name, setName]       = useState("");
  const [email, setEmail]     = useState("");
  const [address, setAddress] = useState("");
  const [coupon, setCoupon]   = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const router = useRouter();

  const subtotal = items.reduce((s, i) => s + i.price * i.quantity, 0);
  const discount = couponApplied ? subtotal * 0.1 : 0;
  const tax      = (subtotal - discount) * TAX_RATE;
  const total    = subtotal - discount + tax + (items.length ? DELIVERY_FEE : 0);

  function increaseQty(id: number) {
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );
  }

  function decreaseQty(id: number) {
    setItems((prev) =>
      prev
        .map((i) => (i.id === id ? { ...i, quantity: i.quantity - 1 } : i))
        .filter((i) => i.quantity > 0)
    );
  }

  function removeItem(id: number) {
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function clearCart() {
    setItems([]);
  }

  function applyCoupon() {
    if (coupon.trim().toLowerCase() === "save10") setCouponApplied(true);
  }

  function handleOrder() {
    if (!name || !email || !address) return;
    setOrderPlaced(true);
    clearCart();
    router.push("/checkout");
  }

  /* ── Empty state ── */
  if (!items.length && !orderPlaced) {
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
            <Link href="/">
              <ArrowLeft className="w-4 h-4" />
              Browse Recipes
            </Link>
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

        <div className="grid lg:grid-cols-[1fr_360px] gap-6  items-center">

          {/* ── Left: items ── */}
          <div className="flex flex-col gap-px bg-gray-900 border border-border overflow-hidden px-7 py-9">
            {items.map((item, idx) => (
              <div
                key={item.id}
                className={cn(
                  "bg-card flex",
                  idx === 0 && "rounded-t-2xl",
                  idx === items.length - 1
                )}
              >
                {/* Image */}
                <div className="relative w-[110px] h-[100px] shrink-0 bg-muted overflow-hidden mx-6 my-5">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded-2xl"
                  />
                </div>

                {/* Body */}
                <div className="flex-1 px-4 py-3 flex flex-col justify-between min-w-0">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <Badge
                        variant="secondary"
                        className={cn(
                          "text-[10px] uppercase tracking-wide mb-1.5 border-0",
                          categoryColors[item.category] ?? "bg-muted text-muted-foreground"
                        )}
                      >
                        {item.category}
                      </Badge>
                      <h3
                        className={`${playfair.className} text-[1rem] font-normal leading-snug truncate`}
                      >
                        {item.title}
                      </h3>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <Clock className="w-3 h-3" />
                          {item.time}
                        </span>
                        <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <ChefHat className="w-3 h-3" />
                          {item.difficulty}
                        </span>
                      </div>
                    </div>

                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 rounded-full text-muted-foreground hover:text-destructive shrink-0"
                      onClick={() => removeItem(item.id)}
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </Button>
                  </div>

                  {/* Price + stepper */}
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-[15px] font-medium text-foreground">
                      ${(item.price * item.quantity).toFixed(2)}
                      <span className="text-[11px] text-muted-foreground font-light ml-1">
                        × {item.quantity}
                      </span>
                    </p>

                    <div className="flex items-center border border-border rounded-xl overflow-hidden">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-none border-0 text-muted-foreground"
                        onClick={() => decreaseQty(item.id)}
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-7 text-center text-[13px] font-medium select-none">
                        {item.quantity}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-7 w-7 rounded-none border-0 text-muted-foreground"
                        onClick={() => increaseQty(item.id)}
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {/* Clear cart footer */}
            <div className="bg-card px-4 py-3 flex justify-end border-t border-border">
              <Button
                variant="ghost"
                size="sm"
                className="text-[12px] text-muted-foreground gap-1.5 h-7"
                onClick={clearCart}
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
                {items.map((item) => (
                  <div key={item.id} className="flex justify-between items-center">
                    <span className="text-[13px] text-muted-foreground truncate max-w-[190px]">
                      {item.title}
                      <span className="text-muted-foreground/50 ml-1">
                        ×{item.quantity}
                      </span>
                    </span>
                    <span className="text-[13px] font-medium text-foreground shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                ))}

                <Separator className="my-1" />

                <div className="flex justify-between items-baseline">
                  <span className={`${playfair.className} text-[16px] font-normal`}>
                    Total
                  </span>
                  <span className={`${playfair.className} text-[22px] font-normal`}>
                    ${total.toFixed(2)}
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
                  <Label className="text-[12px] text-muted-foreground">
                    Full name
                  </Label>
                  <Input
                    placeholder="Jane Smith"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-9 text-[13px] rounded-[9px]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-[12px] text-muted-foreground">
                    Email
                  </Label>
                  <Input
                    type="email"
                    placeholder="jane@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-9 text-[13px] rounded-[9px]"
                  />
                </div>
                <div className="flex flex-col gap-1.5">
                  <Label className="text-[12px] text-muted-foreground">
                    Address
                  </Label>
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
                  Place Order · ${total.toFixed(2)}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </main>
  );
}