"use client"
import { playfair } from "@/data/fonts"
import { ShoppingCart } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export default function Header() {
  return (
    <header className="w-full">
      <nav className="w-full bg-gray-900 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            <div className="flex items-center gap-2">
              <span className={`${playfair.className} text-xl font-normal text-white  leading-tight`}>
                Delicious Recipes
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6 lg:gap-8">
              <Link
                href="/" 
                className="text-white hover:text-orange-600 font-medium transition-colors duration-200"
              >
                Home
              </Link>
              <Link
                href="/cart" 
                className="text-white hover:text-orange-600 font-medium transition-colors duration-200"
              >
                <ShoppingCart className="inline-block mr-1" size={18} />
                <span className="relative text-xl text-red-500 font-semibold right-1 bottom-2">0</span>
                Cart
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


