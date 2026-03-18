"use client";

import { playfair } from "@/data/fonts";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, ChefHat, X } from "lucide-react";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";

export default function LoginPage({ loginOpen, setLoginOpen }: { loginOpen: boolean; setLoginOpen: (open: boolean) => void }) {
  return (

     <Dialog open={loginOpen} onOpenChange={setLoginOpen}>
        <DialogContent className="p-0 border-0 bg-transparent shadow-none max-w-sm [&>button]:hidden">
          <DialogTitle className="sr-only">Sign in</DialogTitle>

          <Card className="w-full border border-border rounded-3xl overflow-hidden">
            <CardContent className="px-8 py-10 flex flex-col items-center gap-6 text-center relative">

              {/* Close */}
              <button
                onClick={() => setLoginOpen(false)}
                className="absolute top-4 right-4 w-7 h-7 rounded-full flex items-center justify-center text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>



              {/* Title */}
              <div>
                <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground mb-2">
                  Welcome back
                </p>
                <h2 className={`${playfair.className} text-3xl font-normal leading-tight`}>
                  Sign in to <em>Delicious</em>
                </h2>
              </div>

              {/* Google button */}
              <Button
                variant="outline"
                className="w-full h-12 rounded-xl gap-3 text-[14px] font-medium"
                onClick={() => {
                  // replace with: signIn("google", { callbackUrl: "/" })
                  setLoginOpen(false);
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
                Continue with Google
              </Button>

              {/* Trust */}
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-gray-500 shrink-0" />
                <p className="text-[12px] text-muted-foreground">
                  We never store your password
                </p>
              </div>

              <p className="text-[11px] text-muted-foreground leading-relaxed">
                By signing in you agree to our{" "}
                <span className="underline underline-offset-2 cursor-pointer hover:text-foreground transition-colors">
                  Terms
                </span>{" "}
                and{" "}
                <span className="underline underline-offset-2 cursor-pointer hover:text-foreground transition-colors">
                  Privacy Policy
                </span>
              </p>
            </CardContent>
          </Card>
        </DialogContent>
      </Dialog>
  );
}