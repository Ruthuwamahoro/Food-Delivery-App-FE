"use client"
import { playfair } from "@/data/fonts"
import { ShoppingCart, LogOut, User, ChevronDown, X, Menu } from "lucide-react"
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

//{scrolled ? "max-w-full shadow-[0_8px_6px_-6px_rgba(0,0,0,0.3)]": "shadow-none"}


// A tiny warm blur placeholder so the hero image area is never blank.
// Generated from a 1×1 orange-tinted pixel — replace with your own base64 if you prefer.
const HERO_BLUR =
  "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFAABAAAAAAAAAAAAAAAAAAAACf/EABQQAQAAAAAAAAAAAAAAAAAAAAD/xAAUAQEAAAAAAAAAAAAAAAAAAAAA/8QAFBEBAAAAAAAAAAAAAAAAAAAAAP/aAAwDAQACEQMRAD8AJQAB/9k="

export default function Header() {
  const [loginOpen, setLoginOpen] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const { data, isPending } = useGetAllCartItems()
  const { data: profile, isPending: isProfileLoading } = useGetUserInfo()

  const user: ProfileModel | null = profile?.data ?? null
  const cartCount: number =
    data?.data?.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) ?? 0

  // Add a subtle shadow when the user scrolls down
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Close the mobile drawer when the viewport widens to desktop
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const handler = (e: MediaQueryListEvent) => { if (e.matches) setMobileOpen(false) }
    mq.addEventListener("change", handler)
    return () => mq.removeEventListener("change", handler)
  }, [])

  if (loginOpen) {
    return <LoginPage loginOpen={loginOpen} setLoginOpen={setLoginOpen} />
  }

  /* ── Shared auth block (used in both desktop & mobile) ── */
  const AuthBlock = ({ mobile = false }: { mobile?: boolean }) => {
    if (isProfileLoading) {
      return <div className="w-8 h-8 rounded-full bg-white animate-pulse" />
    }
    if (user) {
      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 text-white hover:text-gray-300 transition-colors focus:outline-none">
              {user.picture ? (
                <Image
                  src={user.picture}
                  alt={user.fullName}
                  width={32}
                  height={32}
                  className="rounded-full object-cover border border-gray-600"
                  unoptimized
                />
              ) : (
                <div className="w-8 h-8 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-semibold">
                  {user.fullName?.charAt(0).toUpperCase()}
                </div>
              )}
              {mobile && (
                <span className="text-sm font-medium text-white">{user.fullName}</span>
              )}
              {!mobile && (
                <>
                  <span className="text-sm font-medium hidden lg:block">{user.fullName}</span>
                  <ChevronDown className="w-4 h-4 opacity-60" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>

          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel className="pb-2">
              <div className="flex items-center gap-3">
                {user.picture ? (
                  <Image
                    src={user.picture}
                    alt={user.fullName}
                    width={36}
                    height={36}
                    className="rounded-full object-cover border border-border"
                    unoptimized
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-orange-500 flex items-center justify-center text-white text-sm font-semibold shrink-0">
                    {user.fullName?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div className="flex flex-col min-w-0">
                  <span className="text-sm font-medium text-foreground truncate">{user.fullName}</span>
                  <span className="text-xs text-muted-foreground truncate">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>

            <DropdownMenuSeparator />

            <DropdownMenuItem className="gap-2 text-sm cursor-pointer">
              <User className="w-4 h-4 text-muted-foreground" />
              Profile
            </DropdownMenuItem>

            <DropdownMenuSeparator />

            <DropdownMenuItem
              className="gap-2 text-sm text-red-500 focus:text-red-500 focus:bg-red-50 cursor-pointer"
              onClick={() => console.log("logout")}
            >
              <LogOut className="w-4 h-4" />
              Logout
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      )
    }

    return (
      <span
        className="text-gray-900 font-medium transition-colors duration-200 cursor-pointer"
        onClick={() => { setLoginOpen(true); setMobileOpen(false) }}
      >
        Login
      </span>
    )
  }

  return (
    <>
      {/* ── Sticky wrapper ── */}
      <header className="sticky top-0 z-50 w-full">


        <nav
          className={`w-full bg-white transition-shadow duration-300 
            `}
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">

              {/* Logo */}
              <Link href="/" className="flex items-center gap-2 shrink-0">
                <span className={`${playfair.className} text-xl font-normal text-gray-900 leading-tight`}>
                  Delicious Recipes
                </span>
              </Link>

              {/* Desktop nav */}
              <div className="hidden md:flex items-center gap-6 lg:gap-8">
                <Link
                  href="/"
                  className="text-gray-900 hover:text-gray-300 font-medium transition-colors duration-200"
                >
                  Home
                </Link>

                {/* Cart */}
                <Link
                  href="/cart"
                  className="relative flex items-center gap-1.5 text-gray-900 hover:text-gray-300 font-medium transition-colors duration-200"
                >
                  <span className="relative">
                    <ShoppingCart size={22} />
                    {!isPending && cartCount > 0 && (
                      <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
                        {cartCount > 99 ? "99+" : cartCount}
                      </span>
                    )}
                  </span>
                  <span className="text-base">Cart</span>
                </Link>

                <AuthBlock />
              </div>

              {/* Mobile right cluster: cart icon + hamburger */}
              <div className="flex md:hidden items-center gap-3">
                <Link
                  href="/cart"
                  className="relative text-gray-900 hover:text-gray-300 transition-colors"
                  aria-label="Cart"
                >
                  <ShoppingCart size={22} />
                  {!isPending && cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-red-500 text-gray-900 text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </Link>

                <button
                  className="p-2 text-gray-900 hover:text-orange-400 transition-colors"
                  aria-label={mobileOpen ? "Close menu" : "Open menu"}
                  onClick={() => setMobileOpen((v) => !v)}
                >
                  {mobileOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
              </div>
            </div>
          </div>

          {/* ── Mobile drawer ── */}
          <div
            className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
              mobileOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
            }`}
          >
            <div className="bg-gray-800 border-t border-gray-700 px-4 py-4 flex flex-col gap-4">
              <Link
                href="/"
                className="text-white hover:text-orange-400 font-medium transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                Home
              </Link>

              {/* <Link
                href="/cart"
                className="flex items-center gap-2 text-white hover:text-orange-400 font-medium transition-colors py-1"
                onClick={() => setMobileOpen(false)}
              >
                <ShoppingCart size={18} />
                Cart
                {!isPending && cartCount > 0 && (
                  <span className="ml-1 min-w-[20px] h-5 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1">
                    {cartCount > 99 ? "99+" : cartCount}
                  </span>
                )}
              </Link> */}

              <div className="border-t border-gray-700 pt-3">
                <AuthBlock mobile />
              </div>
            </div>
          </div>
        </nav>
      </header>

      <div className="relative w-full h-56 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
        <Image
          src="/images/header.jpg"
          alt="Delicious Food Banner"
          fill
          sizes="100vw"
          className="object-cover brightness-75"
          priority           
          placeholder="blur"
          blurDataURL={HERO_BLUR}
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1
            className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-2xl leading-tight`}
          >
            Discover Amazing
            <span className="block text-orange-400 mt-1">Food Recipes</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 mb-4 max-w-2xl drop-shadow-lg">
            Explore thousands of delicious recipes from around the world
          </p>
        </div>
      </div>
    </>
  )
}