"use client";
import { use, useState } from "react";
import Image from "next/image";
import { playfair } from "@/data/fonts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import {
  Clock,
  ChefHat,
  ShoppingCart,
  MoveLeftIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Comments from "@/components/Comments";
import { useAddItemToCart, useGetAllCartItems } from "@/hooks/cart/useCart";
import { CartItemModel } from "@/types/cart";
import { useGetFood } from "@/hooks/foods/useGetFood";

interface Props {
  params: Promise<{ id: string }>;
}

interface Food {
  _id: string;
  name: string;
  description: string;
  price: number;
  deliveryTime: string;
  category: string;
  images: string[];
  createdAt: { $date: string } | string;
  updatedAt: { $date: string } | string;
}

/* ── Skeleton ── */
function RecipeSkeleton() {
  return (
    <div className="grid lg:grid-cols-2 gap-10 mb-12 animate-pulse">
      <div className="flex flex-col gap-3">
        <div className="w-full aspect-[4/3] rounded-2xl bg-muted" />
        <div className="flex gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-16 w-16 rounded-lg bg-muted" />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="h-3 w-16 rounded bg-muted" />
        <div className="h-10 w-3/4 rounded bg-muted" />
        <div className="h-4 w-full rounded bg-muted" />
        <div className="h-4 w-5/6 rounded bg-muted" />
        <div className="h-4 w-4/6 rounded bg-muted" />
      </div>
    </div>
  );
}

/* ── Image Gallery ── */
function ImageGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  const prev = () => setActive((i) => (i - 1 + images.length) % images.length);
  const next = () => setActive((i) => (i + 1) % images.length);

  return (
    <div className="flex flex-col gap-3">
      {/* Main image */}
      <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-muted group">
        <Image
          key={active}
          src={images[active]}
          alt={`${name} — photo ${active + 1}`}
          fill
          className="object-cover transition-opacity duration-500"
          priority={active === 0}
          unoptimized
        />

        {/* Bottom gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />

        {/* Prev / Next arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={next}
              className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-black/50 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
              aria-label="Next image"
            >
              <ChevronRight className="w-4 h-4" />
            </button>

            {/* Dot indicators */}
            <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i === active
                      ? "w-5 bg-white"
                      : "w-1.5 bg-white/50 hover:bg-white/75"
                  }`}
                  aria-label={`Go to image ${i + 1}`}
                />
              ))}
            </div>

            {/* Counter pill */}
            <span className="absolute top-3 right-3 text-[11px] font-medium text-white bg-black/50 rounded-full px-2.5 py-0.5 backdrop-blur-sm">
              {active + 1} / {images.length}
            </span>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                i === active
                  ? "border-orange-400 scale-105 shadow-md"
                  : "border-transparent opacity-60 hover:opacity-90 hover:border-border"
              }`}
              aria-label={`View image ${i + 1}`}
            >
              <Image
                src={src}
                alt={`${name} thumbnail ${i + 1}`}
                fill
                className="object-cover"
                unoptimized
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ── Page ── */
export default function RecipePage({ params }: Props) {
  const { id } = use(params);
  const router = useRouter();

  const { data, isLoading, error } = useGetFood(id);
  const food: Food | null = data?.data ?? data ?? null;

  const { mutate: addToCart, isPending: isAdding } = useAddItemToCart();
  const { data: cartData } = useGetAllCartItems();
  const cartItems = (cartData?.data?.items as CartItemModel[]) ?? [];
  const isInCart = cartItems.some((item) => item.foodId === food?._id);

  const handleAddToCart = () => {
    if (!food) return;
    addToCart(
      { foodId: food._id, quantity: 1, price: food.price },
      {
        onSuccess: () => console.log("added to cart"),
        onError: (err) => console.error("failed to add to cart", err),
      }
    );
  };

  const images: string[] =
    food?.images && food.images.length > 0 ? food.images : ["/placeholder.png"];

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

        <Button
          variant="outline"
          className="mb-6 cursor-pointer gap-2"
          onClick={() => router.back()}
        >
          <MoveLeftIcon className="w-4 h-4" />
          Back
        </Button>

        {isLoading && <RecipeSkeleton />}

        {!isLoading && error && (
          <div className="text-center py-20 flex flex-col items-center gap-3">
            <p className="text-4xl">⚠️</p>
            <p className="text-[15px] font-medium text-foreground">Failed to load recipe</p>
            <p className="text-[13px] text-muted-foreground">Please try again later.</p>
          </div>
        )}

        {!isLoading && !error && food && (
          <>
            <div className="grid lg:grid-cols-2 gap-10 mb-12">

              {/* Left — Gallery */}
              <ImageGallery images={images} name={food.name} />

              {/* Right — Info */}
              <div className="flex flex-col justify-between gap-6">
                <div>
                  <div className="flex items-center gap-2 mb-3">
                    <Badge
                      variant="outline"
                      className="text-[11px] font-medium tracking-wide uppercase text-orange-600 border-orange-200 bg-orange-50"
                    >
                      {food.category}
                    </Badge>
                    {images.length > 1 && (
                      <span className="text-[11px] text-muted-foreground">
                        {images.length} photos
                      </span>
                    )}
                  </div>

                  <h1
                    className={`${playfair.className} text-4xl md:text-5xl font-normal text-foreground leading-tight mb-4`}
                  >
                    {food.name}
                  </h1>

                  <p className="text-[15px] text-muted-foreground font-light leading-relaxed mb-6">
                    {food.description}
                  </p>

                  <Separator className="mb-6" />

                  {/* Info card */}
                  <div className="rounded-xl border border-border bg-muted/40 p-4 flex flex-col gap-3 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                        <Clock className="w-4 h-4 shrink-0" />
                        <span>Estimated delivery</span>
                      </div>
                      <span className="text-[13px] font-semibold text-foreground">
                        {food.deliveryTime} min
                      </span>
                    </div>
                    <Separator />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-[13px] text-muted-foreground">
                        <ChefHat className="w-4 h-4 shrink-0" />
                        <span>Category</span>
                      </div>
                      <span className="text-[13px] font-semibold text-foreground capitalize">
                        {food.category}
                      </span>
                    </div>
                  </div>

                  {/* Price */}
                  <div className="flex items-baseline gap-2">
                    <span className="text-[11px] text-muted-foreground uppercase tracking-wide">
                      Price
                    </span>
                    <span
                      className={`${playfair.className} text-3xl font-normal text-foreground`}
                    >
                      RWF {food.price.toLocaleString()}
                    </span>
                  </div>
                </div>

                {/* CTA */}
                <div className="flex gap-3">
                  {isInCart ? (
                    <Button
                      className="flex-1 h-11 gap-2 text-sm font-medium"
                      variant="outline"
                      disabled
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Already in Cart
                    </Button>
                  ) : (
                    <Button
                      className="flex-1 h-11 gap-2 text-sm font-medium"
                      onClick={handleAddToCart}
                      disabled={isAdding}
                    >
                      <ShoppingCart className="w-4 h-4" />
                      {isAdding ? "Adding..." : "Add to Cart"}
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    className="h-11 px-5 text-sm"
                    onClick={() => router.back()}
                  >
                    Back to Menu
                  </Button>
                </div>
              </div>
            </div>

            <Separator className="mb-12" />
            <Comments />
          </>
        )}
      </div>
    </main>
  );
}