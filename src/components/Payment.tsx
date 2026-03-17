"use client";

import { useState } from "react";
import { playfair } from "@/data/fonts";
import { Card, CardContent, CardHeader, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  CreditCard,
  Smartphone,
  Lock,
  CheckCircle2,
  ShieldCheck,
  Eye,
  EyeOff,
  ArrowLeft,
} from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

// ── Hardcoded order summary ──────────────────────────────
const ORDER = {
  items: [
    { title: "Spaghetti Carbonara", qty: 1, price: 12.99 },
    { title: "Chicken Tikka Masala", qty: 2, price: 14.99 },
    { title: "Brown Butter Cookies", qty: 1, price: 8.99 },
  ],
  delivery: 2.99,
  tax: 4.24,
  discount: 5.2,
  total: 53.49,
};

// ── Hardcoded saved card (prefilled) ─────────────────────
const SAVED_CARD = {
  number: "4242 4242 4242 4242",
  name: "Jane Smith",
  expiry: "12/26",
  cvv: "123",
};

// ── Hardcoded MoMo number ────────────────────────────────
const SAVED_MOMO = {
  phone: "078 000 0000",
  name: "Jane Smith",
};

export default function Payment() {
  const [tab, setTab] = useState("card");
  const [showCvv, setShowCvv] = useState(false);
  const [success, setSuccess] = useState(false);

  // Card fields
  const [cardNumber, setCardNumber] = useState(SAVED_CARD.number);
  const [cardName, setCardName]     = useState(SAVED_CARD.name);
  const [expiry, setExpiry]         = useState(SAVED_CARD.expiry);
  const [cvv, setCvv]               = useState(SAVED_CARD.cvv);

  // MoMo fields
  const [momoPhone, setMomoPhone] = useState(SAVED_MOMO.phone);
  const [momoName, setMomoName]   = useState(SAVED_MOMO.name);
  const [momoPin, setMomoPin]     = useState("");

  function formatCard(val: string) {
    return val
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  function formatExpiry(val: string) {
    const digits = val.replace(/\D/g, "").slice(0, 4);
    if (digits.length >= 3) return digits.slice(0, 2) + "/" + digits.slice(2);
    return digits;
  }

  const cardValid  = cardNumber.length === 19 && cardName && expiry.length === 5 && cvv.length === 3;
  const momoValid  = momoPhone.length >= 9 && momoName && momoPin.length === 5;
  const canSubmit  = tab === "card" ? cardValid : momoValid;

  return (
    <section className="max-w-7xl mx-auto px-4 py-10">


      <div className="flex items-center gap-3 mb-8">
        <Button variant="ghost" size="icon" className="rounded-full shrink-0 mb-8" asChild>
            <Link href="/cart"><ArrowLeft className="w-4 h-4" /></Link>
        </Button>
        <div>
          <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground mb-1">
            Checkout
          </p>
          <h1 className={`${playfair.className} text-4xl font-normal leading-tight mb-8`}>
            Secure <em>payment</em>
          </h1>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_280px] gap-6 items-start">

        {/* ── Left: payment form ── */}
        <div className="flex flex-col gap-4">

          {/* Trust badges */}
          <div className="flex items-center gap-2 px-4 py-2.5 bg-muted rounded-xl border border-border">
            <ShieldCheck className="w-4 h-4 text-emerald-500 shrink-0" />
            <span className="text-[12px] text-muted-foreground">
              256-bit SSL encrypted · Your payment is secure
            </span>
            <Lock className="w-3.5 h-3.5 text-muted-foreground ml-auto shrink-0" />
          </div>

          {/* Tabs */}
          <Tabs value={tab} onValueChange={setTab}>
            <TabsList className="w-full h-11 p-1 rounded-xl bg-gray-900">
              <TabsTrigger
                value="card"
                className="flex-1 gap-2 text-[13px] rounded-lg data-[state=active]:shadow-sm"
              >
                <CreditCard className="w-4 h-4" />
                Credit Card
              </TabsTrigger>
              <TabsTrigger
                value="momo"
                className="flex-1 gap-2 text-[13px] rounded-lg data-[state=active]:shadow-sm"
              >
                <Smartphone className="w-4 h-4" />
                MTN MoMo
              </TabsTrigger>
            </TabsList>

            {/* ── Card tab ── */}
            <TabsContent value="card" className="mt-4">
              <Card className="border border-border rounded-2xl p-0 overflow-hidden">

                {/* Mini card visual */}
                <div className="mx-5 mt-5 rounded-xl bg-foreground text-background p-5 mb-4 relative overflow-hidden">
                  <div
                    className="absolute inset-0 opacity-5"
                    style={{
                      backgroundImage:
                        "radial-gradient(circle at 80% 20%, white 0%, transparent 60%)",
                    }}
                  />
                  <div className="flex justify-between items-start mb-6">
                    <span className={`${playfair.className} text-[15px] font-normal opacity-80`}>
                      Visa
                    </span>
                    <div className="flex gap-1">
                      <div className="w-7 h-7 rounded-full bg-background/20" />
                      <div className="w-7 h-7 rounded-full bg-background/10 -ml-3" />
                    </div>
                  </div>
                  <p className="text-[15px] font-mono tracking-[0.2em] mb-4 opacity-90">
                    {cardNumber || "•••• •••• •••• ••••"}
                  </p>
                  <div className="flex justify-between items-end">
                    <div>
                      <p className="text-[9px] uppercase opacity-50 mb-0.5">Card holder</p>
                      <p className="text-[13px] font-medium uppercase tracking-wide">
                        {cardName || "FULL NAME"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-[9px] uppercase opacity-50 mb-0.5">Expires</p>
                      <p className="text-[13px] font-mono">{expiry || "MM/YY"}</p>
                    </div>
                  </div>
                </div>

                <CardContent className="px-5 pb-5 flex flex-col gap-4">
                  {/* Card number */}
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[12px] text-muted-foreground">Card number</Label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="1234 5678 9012 3456"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCard(e.target.value))}
                        className="pl-9 h-10 text-[13px] rounded-[10px] font-mono tracking-widest"
                        maxLength={19}
                      />
                    </div>
                  </div>

                  {/* Cardholder name */}
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[12px] text-muted-foreground">Cardholder name</Label>
                    <Input
                      placeholder="Jane Smith"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                      className="h-10 text-[13px] rounded-[10px]"
                    />
                  </div>

                  {/* Expiry + CVV */}
                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-[12px] text-muted-foreground">Expiry date</Label>
                      <Input
                        placeholder="MM/YY"
                        value={expiry}
                        onChange={(e) => setExpiry(formatExpiry(e.target.value))}
                        className="h-10 text-[13px] rounded-[10px] font-mono"
                        maxLength={5}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <Label className="text-[12px] text-muted-foreground">CVV</Label>
                      <div className="relative">
                        <Input
                          placeholder="•••"
                          type={showCvv ? "text" : "password"}
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                          className="h-10 text-[13px] rounded-[10px] font-mono pr-9"
                          maxLength={3}
                        />
                        <button
                          type="button"
                          onClick={() => setShowCvv((v) => !v)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        >
                          {showCvv
                            ? <EyeOff className="w-3.5 h-3.5" />
                            : <Eye className="w-3.5 h-3.5" />}
                        </button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* ── MTN MoMo tab ── */}
            <TabsContent value="momo" className="mt-4">
              <Card className="border border-border rounded-2xl p-0 overflow-hidden">

                {/* MoMo header banner */}
                <div className="mx-5 mt-5 rounded-xl bg-[#FAEEDA] border border-[#EF9F27]/30 p-5 mb-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[#EF9F27] flex items-center justify-center shrink-0">
                    <Smartphone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-[13px] font-medium text-[#412402]">MTN Mobile Money</p>
                    <p className="text-[11px] text-[#633806] mt-0.5 leading-relaxed">
                      You'll receive a prompt on your phone to confirm the payment.
                    </p>
                  </div>
                  <Badge className="ml-auto shrink-0 bg-[#EF9F27]/20 text-[#633806] border-0 text-[10px]">
                    Rwanda
                  </Badge>
                </div>

                <CardContent className="px-5 pb-5 flex flex-col gap-4">
                  {/* Phone number */}
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[12px] text-muted-foreground">
                      MTN phone number
                    </Label>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1.5 h-10 px-3 border border-border rounded-[10px] bg-muted shrink-0">
                        <span className="text-[13px]">🇷🇼</span>
                        <span className="text-[13px] text-muted-foreground font-medium">+250</span>
                      </div>
                      <Input
                        placeholder="078 000 0000"
                        value={momoPhone}
                        onChange={(e) => setMomoPhone(e.target.value)}
                        className="flex-1 h-10 text-[13px] rounded-[10px] font-mono"
                      />
                    </div>
                  </div>

                  {/* Account name */}
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[12px] text-muted-foreground">Account name</Label>
                    <Input
                      placeholder="Jane Smith"
                      value={momoName}
                      onChange={(e) => setMomoName(e.target.value)}
                      className="h-10 text-[13px] rounded-[10px]"
                    />
                  </div>

                  {/* MoMo PIN */}
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-[12px] text-muted-foreground">MoMo PIN</Label>
                    <div className="flex gap-2 justify-between">
                      {[0, 1, 2, 3, 4].map((i) => (
                        <Input
                          key={i}
                          type="password"
                          maxLength={1}
                          value={momoPin[i] ?? ""}
                          onChange={(e) => {
                            const val = e.target.value.replace(/\D/g, "");
                            const arr = momoPin.split("");
                            arr[i] = val;
                            setMomoPin(arr.join("").slice(0, 5));
                            if (val && e.target.nextElementSibling) {
                              (e.target.nextElementSibling as HTMLInputElement).focus();
                            }
                          }}
                          className={cn(
                            "h-12 w-full text-center text-[18px] font-mono rounded-[10px] p-0",
                            momoPin[i] && "border-[#EF9F27] bg-[#FAEEDA]"
                          )}
                        />
                      ))}
                    </div>
                    <p className="text-[11px] text-muted-foreground mt-0.5">
                      Enter your 5-digit MTN MoMo PIN
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Pay button */}
          <Button
            className="w-full h-12 gap-2 text-sm font-medium rounded-xl"
            disabled={!canSubmit}
            onClick={() => setSuccess(true)}
          >
            <Lock className="w-4 h-4" />
            {tab === "card" ? "Pay with Card" : "Pay with MTN MoMo"} ·
            ${ORDER.total.toFixed(2)}
          </Button>

          <p className="text-center text-[11px] text-muted-foreground">
            By completing your purchase you agree to our{" "}
            <span className="underline cursor-pointer">Terms of Service</span>
          </p>
        </div>

      </div>

      {/* ── Success dialog ── */}
      <AlertDialog open={success} onOpenChange={setSuccess}>
        <AlertDialogContent className="rounded-2xl max-w-sm">
          <AlertDialogHeader className="items-center text-center">
            <div className="w-16 h-16 rounded-2xl bg-emerald-50 dark:bg-emerald-950 flex items-center justify-center mx-auto mb-2">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <AlertDialogTitle className={`${playfair.className} text-2xl font-normal`}>
              Payment <em>successful!</em>
            </AlertDialogTitle>
            <AlertDialogDescription className="text-[13px] text-muted-foreground font-light leading-relaxed text-center">
              {tab === "card"
                ? `Your card ending in ${cardNumber.slice(-4)} was charged $${ORDER.total.toFixed(2)}.`
                : `MTN MoMo prompt sent to +250 ${momoPhone}. Amount: $${ORDER.total.toFixed(2)}.`}
              {" "}A receipt has been sent to your email.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="justify-center">
            <AlertDialogAction asChild>
              <Button className="gap-2 px-8" onClick={() => setSuccess(false)}>
                <CheckCircle2 className="w-4 h-4" />
                Done
              </Button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </section>
  );
}