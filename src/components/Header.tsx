"use client"
import { playfair } from "@/data/fonts"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import LoginPage from "./Login-page"
import { useGetAllCartItems } from "@/hooks/cart/useCart"

export default function Header() {
  const [isLoggedIn, isDisplayLoggedIn] = useState(false)
  const { data, isPending } = useGetAllCartItems()

  const cartCount: number =
    data?.data?.items?.reduce((sum: number, item: any) => sum + item.quantity, 0) ?? 0

  if (isLoggedIn) {
    return (
      <>
        <LoginPage loginOpen={isLoggedIn} setLoginOpen={isDisplayLoggedIn} />
      </>
    )
  }

  return (
    <header className="w-full">
      <nav className="w-full bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            <div className="flex items-center gap-2">
              <span className={`${playfair.className} text-xl font-normal text-white leading-tight`}>
                Delicious Recipes
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link
                href="/"
                className="text-white hover:text-gray-300 font-medium transition-colors duration-200 hover:underline-offset-4 hover:font-semibold"
              >
                Home
              </Link>
              <span
                className="text-white hover:text-gray-300 font-medium transition-colors duration-200 hover:underline-offset-4 hover:font-semibold cursor-pointer"
                onClick={() => isDisplayLoggedIn(true)}
              >
                Login
              </span>
              <Link
                href="/cart"
                className="relative flex items-center gap-1.5 text-white hover:text-gray-300 font-medium transition-colors duration-200 hover:underline-offset-4 hover:font-semibold"
              >
                <span className="relative">
                  <ShoppingCart size={22} />
                  <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none"></span>
                  {isPending ? 
                                      <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
                                      0
                                    </span>
                   : cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 min-w-[18px] h-[18px] bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-1 leading-none">
                      {cartCount > 99 ? "99+" : cartCount}
                    </span>
                  )}
                </span>
                <span className="text-xl">Cart</span>
              </Link>
            </div>

            <button
              className="md:hidden p-2 text-gray-700 hover:text-orange-600 transition-colors"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      <div className="relative w-full h-56 sm:h-56 md:h-64 lg:h-72 overflow-hidden">
        <Image
          src="/images/header.jpg"
          alt="Delicious Food Banner"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <h1 className={`${playfair.className} text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-3 drop-shadow-2xl leading-tight`}>
            Discover Amazing
            <span className="block text-orange-400 mt-1">Food Recipes</span>
          </h1>
          <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/95 mb-4 max-w-2xl drop-shadow-lg">
            Explore thousands of delicious recipes from around the world
          </p>
        </div>
      </div>
    </header>
  )
}