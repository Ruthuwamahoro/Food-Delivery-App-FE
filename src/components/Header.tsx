"use client"
import { playfair } from "@/data/fonts"
import { ShoppingBag, LogOut, User, ChevronDown, X, Menu, Heart, Receipt, Sparkles } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"
import LoginPage from "./Login-page"
import { useGetAllCartItems } from "@/hooks/cart/useCart"
import { useGetUserInfo } from "@/hooks/food/useGetProfile"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ProfileModel } from "@/types/user"
import { cn } from "@/lib/utils"

/* ─── Font import: add to your globals.css if not already present ───────────
   @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=DM+Sans:wght@300;400;500&display=swap');
   ─────────────────────────────────────────────────────────────────────────── */

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/recipes", label: "Recipes" },
  { href: "/collections", label: "Collections" },
]

export default function Header() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { data, isPending } = useGetAllCartItems()
  const { data: profile, isPending: isProfileLoading } = useGetUserInfo()

  const user: ProfileModel | null = profile?.data ?? null
  const cartCount: number =
    data?.data?.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) ?? 0

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const handler = (e: MediaQueryListEvent) => { if (e.matches) setMobileOpen(false) }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [mobileOpen])

  if (loginOpen) {
    return <LoginPage loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
  }

  /* ── Avatar ── */
  const Avatar = ({ size = 34 }: { size?: number }) => {
    if (isProfileLoading) {
      return (
        <div
          className="rounded-full bg-[#E8D5C0] animate-pulse"
          style={{ width: size, height: size }}
        />
      )
    }
    if (user?.picture) {
      return (
        <Image
          src={user.picture}
          alt={user.fullName}
          width={size}
          height={size}
          className="rounded-full object-cover ring-2 ring-transparent hover:ring-[#B8521A] transition-all"
          unoptimized
        />
      )
    }
    return (
      <div
        className="rounded-full bg-[#B8521A] flex items-center justify-center text-white font-semibold shrink-0 ring-2 ring-transparent hover:ring-[#B8521A] hover:ring-offset-2 transition-all"
        style={{
          width: size,
          height: size,
          fontFamily: "'Cormorant Garamond', serif",
          fontSize: size * 0.47,
        }}
      >
        {user?.fullName?.charAt(0).toUpperCase()}
      </div>
    )
  }

  /* ── Desktop auth block ── */
  const DesktopAuth = () => {
    if (isProfileLoading) {
      return <div className="w-[34px] h-[34px] rounded-full bg-[#E8D5C0] animate-pulse" />
    }

    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 focus:outline-none group cursor-pointer">
              <Avatar size={34} />
              <span
                className="hidden lg:block text-sm font-medium text-[#1C1714] group-hover:text-[#B8521A] transition-colors"
                style={{ fontFamily: "'DM Sans', sans-serif" }}
              >
                {user.fullName}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#6B5C4E] opacity-70 group-hover:opacity-100 transition-all group-data-[state=open]:rotate-180 duration-200" />
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent
            align="end"
            sideOffset={12}
            className="w-60 p-0 overflow-hidden rounded-xl border border-[#E0D6CA] shadow-[0_8px_30px_rgba(28,23,20,0.10)] bg-white"
          >
            {/* User info header */}
            <DropdownMenuLabel className="p-4 border-b border-[#F0E8DC]">
              <div className="flex items-center gap-3">
                <Avatar size={40} />
                <div className="flex flex-col min-w-0">
                  <span
                    className="text-sm font-medium text-[#1C1714] truncate"
                    style={{ fontFamily: "'DM Sans', sans-serif" }}
                  >
                    {user.fullName}
                  </span>
                  <span className="text-xs text-[#6B5C4E] truncate mt-0.5">
                    {user.email}
                  </span>
                </div>
              </div>
            </DropdownMenuLabel>

            <div className="py-1.5">
              <DropdownMenuItem className="mx-1.5 rounded-lg px-3 py-2.5 gap-2.5 text-sm text-[#1C1714] cursor-pointer focus:bg-[#FAF7F2] focus:text-[#1C1714]">
                <User className="w-4 h-4 text-[#6B5C4E]" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem className="mx-1.5 rounded-lg px-3 py-2.5 gap-2.5 text-sm text-[#1C1714] cursor-pointer focus:bg-[#FAF7F2] focus:text-[#1C1714]">
                <Heart className="w-4 h-4 text-[#6B5C4E]" />
                Saved recipes
              </DropdownMenuItem>
              <DropdownMenuItem className="mx-1.5 rounded-lg px-3 py-2.5 gap-2.5 text-sm text-[#1C1714] cursor-pointer focus:bg-[#FAF7F2] focus:text-[#1C1714]">
                <Receipt className="w-4 h-4 text-[#6B5C4E]" />
                Order history
              </DropdownMenuItem>
            </div>

            <DropdownMenuSeparator className="bg-[#F0E8DC]" />

            <div className="py-1.5">
              <DropdownMenuItem
                className="mx-1.5 rounded-lg px-3 py-2.5 gap-2.5 text-sm text-[#B8521A] cursor-pointer focus:bg-[#FAECE7] focus:text-[#B8521A]"
                onClick={() => console.log("logout")}
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </DropdownMenuItem>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return (
      <button
        className="text-sm font-medium text-[#1C1714] border border-[#1C1714] rounded-full px-5 py-2 hover:bg-[#1C1714] hover:text-[#FAF7F2] transition-all duration-200 tracking-wider uppercase"
        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.07em" }}
        onClick={() => setLoginOpen(true)}
      >
        Sign in
      </button>
    )
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full">

        {/* ── Announcement bar ── */}
        <div className="bg-[#1C1714] text-[#E8D5C0] text-center py-3 px-4 flex items-center justify-center gap-2">
          <Sparkles className="w-3 h-3 text-[#C4A882]" />
          <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11.5, letterSpacing: "0.07em" }}>
            Free delivery on orders over $45 · Use code{" "}
            <strong className="text-white mx-1">FRESH10</strong> for 10% off
          </span>
          <Sparkles className="w-3 h-3 text-[#C4A882]" />
        </div>

        {/* ── Main nav ── */}
        <nav
          className={cn(
            "w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E0D6CA] transition-all duration-300",
            scrolled && "shadow-[0_2px_24px_rgba(28,23,20,0.07)]"
          )}
        >
          <div className="max-w-7xl mx-auto px-5 sm:px-8 lg:px-10">
            <div className="flex items-center justify-between h-[68px]">

              {/* Logo */}
              <Link href="/" className="flex flex-col shrink-0 group">
                <div className="flex items-center gap-1.5">
                  <span
                    className="text-[#1C1714] leading-none group-hover:text-[#B8521A] transition-colors duration-200"
                    style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: 26, fontWeight: 600 }}
                  >
                    Delicious
                  </span>
                  <span className="w-[6px] h-[6px] rounded-full bg-[#B8521A] mb-[2px] self-end shrink-0" />
                </div>
                <span
                  className="text-[#6B5C4E] mt-[-2px]"
                  style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 9, letterSpacing: "0.22em", textTransform: "uppercase" }}
                >
                  Recipes &amp; More
                </span>
              </Link>

              {/* Desktop nav links */}
              <div className="hidden md:flex items-center gap-8">
                {NAV_LINKS.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative text-[#6B5C4E] hover:text-[#1C1714] pb-0.5 transition-colors duration-200 group"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: "0.03em" }}
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-px bg-[#B8521A] group-hover:w-full transition-all duration-250 ease-out" />
                  </Link>
                ))}

                {/* Divider */}
                <div className="w-px h-[18px] bg-[#D5C9BC]" />

                {/* Cart */}
                <Link
                  href="/cart"
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-[#D5C9BC] text-[#1C1714] hover:bg-[#1C1714] hover:text-[#FAF7F2] hover:border-[#1C1714] transition-all duration-200 group"
                >
                  <ShoppingBag size={16} />
                  <span
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 12, letterSpacing: "0.04em", fontWeight: 500 }}
                  >
                    Cart
                  </span>
                  {!isPending && cartCount > 0 && (
                    <span className="bg-[#B8521A] text-white group-hover:bg-[#FAF7F2] group-hover:text-[#1C1714] text-[10px] font-medium rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1.5 transition-all duration-200">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>

                <DesktopAuth />
              </div>

              {/* Mobile right cluster */}
              <div className="flex md:hidden items-center gap-3">
                <Link href="/cart" className="relative text-[#1C1714]" aria-label="Cart">
                  <ShoppingBag size={22} />
                  {!isPending && cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-[#B8521A] text-white text-[10px] font-medium rounded-full flex items-center justify-center px-1">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>
                <button
                  className="p-1.5 text-[#1C1714] hover:text-[#B8521A] transition-colors"
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  onClick={() => setMobileOpen((v) => !v)}
                >
                  {mobileOpen ? <X size={22} /> : <Menu size={22} />}
                </button>
              </div>

            </div>
          </div>

          {/* ── Mobile drawer ── */}
          <div
            className={cn(
              "md:hidden overflow-hidden transition-all duration-300 ease-in-out",
              mobileOpen ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
            )}
          >
            <div className="bg-[#1C1714] border-t border-[#2E2520] px-6 py-5 flex flex-col">

              {/* Nav links */}
              <div className="flex flex-col">
                {NAV_LINKS.map((link, i) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileOpen(false)}
                    className={cn(
                      "flex items-center justify-between py-4 text-[#C4A882] hover:text-[#FAF7F2] transition-colors",
                      i < NAV_LINKS.length - 1 && "border-b border-[#C4A882]/10"
                    )}
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 15 }}
                  >
                    {link.label}
                    <ChevronDown className="w-4 h-4 opacity-40 -rotate-90" />
                  </Link>
                ))}
              </div>

              {/* Auth row */}
              <div className="mt-5 pt-5 border-t border-[#C4A882]/20">
                {user ? (
                  <div className="flex items-center gap-3">
                    <Avatar size={38} />
                    <div>
                      <p
                        className="text-[#FAF7F2] font-medium"
                        style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 14 }}
                      >
                        {user.fullName}
                      </p>
                      <p className="text-[#C4A882] mt-0.5" style={{ fontSize: 11 }}>
                        {user.email}
                      </p>
                    </div>
                    <button
                      className="ml-auto text-[#E27D5A] hover:text-[#FAF7F2] transition-colors"
                      style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase" }}
                      onClick={() => console.log("logout")}
                    >
                      Sign out
                    </button>
                  </div>
                ) : (
                  <button
                    className="w-full py-3 rounded-xl border border-[#C4A882]/30 text-[#C4A882] hover:bg-white/5 transition-colors"
                    style={{ fontFamily: "'DM Sans', sans-serif", fontSize: 13, letterSpacing: "0.07em" }}
                    onClick={() => { setLoginOpen(true); setMobileOpen(false) }}
                  >
                    Sign in to your account
                  </button>
                )}
              </div>

            </div>
          </div>
        </nav>
      </header>
    </>
  )
}