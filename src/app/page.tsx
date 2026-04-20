"use client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaginationDemo } from "@/components/Pagination";
import Testimonials from "@/components/Testimonials";
import { playfair } from "@/data/fonts";
import { Search, Clock, ShoppingCart, ChevronRight, Check, Trash2} from "lucide-react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import { useGetAllFoods } from "@/hooks/foods/useGetAllFoods";
import FoodCardSkeleton from "@/components/FoodSkeleton";
import { Badge } from "@/components/ui/badge";
import { useAddItemToCart, useGetAllCartItems } from "@/hooks/cart/useCart";
import { CartItemModel } from "@/types/cart";

interface Food {
  id: string;
  name: string;
  description: string;
  images: string[] | string;
  price: number;
  deliveryTime: string;
  createdAt: string;
  updatedAt: string;
}

const getFirstImage = (images: string[] | string): string => {
  if (Array.isArray(images)) return images[0] ?? "/placeholder.png";
  return images ?? "/placeholder.png";
};

function FoodCard({ food }: { food: Food }) {
  const router = useRouter();

  const { mutate: addToCart, isPending } = useAddItemToCart();
  // const { mutate: removeFromCart, isPending: isRemoving } = useRemoveCartItem(); // add if you have this hook
  const { data: cartData } = useGetAllCartItems();

  // Check if this food is already in cart
  const cartItems = (cartData?.data?.items as CartItemModel[]) ?? [];
  console.log("+++++++++++++++++zzzzzzzzzzz" + cartItems)
  const isInCart = cartItems.some((item) => item.foodId === food.id);

  const handleAddToCart = () => {
    addToCart(
      { foodId: food.id, quantity: 1, price: food.price },
      {
        onSuccess: () => console.log("added to cart"),
        onError: (err) => console.error("failed to add to cart", err),
      }
    );
  };

  return (
    <div className="bg-card flex flex-col border-b border-border group">
      {/* Image */}
      <div className="relative w-full h-52 bg-muted overflow-hidden">
        <Image
          src={getFirstImage(food.images)}
          alt={food.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
        <Badge className="absolute bottom-3 left-3 text-[13px] font-semibold text-black tracking-wide bg-amber-100">
          RWF {food.price.toLocaleString()}
        </Badge>
        <span className="absolute bottom-3 right-3 flex items-center gap-1 text-[11px] font-medium text-white/90">
          <Clock className="w-3 h-3" />
          {food.deliveryTime} min
        </span>
      </div>

      {/* Body */}
      <div className="p-5 flex-1 flex flex-col gap-2">
        <h2 className={`${playfair.className} text-lg font-normal text-foreground leading-snug`}>
          {food.name}
        </h2>
        <p className="text-[13px] text-muted-foreground font-light leading-relaxed line-clamp-2 flex-1">
          {food.description}
        </p>
      </div>

      {/* Footer */}
      <div className="px-5 py-4 border-t border-border flex items-center justify-between gap-3">
        <button
          onClick={() => router.push(`/recipe/${food.id}`)}
          className="flex items-center gap-1 text-[12px] text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
        >
          View recipe
          <ChevronRight className="w-3.5 h-3.5" />
        </button>

        {isInCart ? (
          <button
            className="
              group/cart flex items-center gap-1.5 text-xs font-medium shrink-0
              px-3 py-1.5 rounded-md border transition-all duration-200
              border-green-600 bg-green-50 text-green-700
              hover:border-red-400 hover:bg-red-50 hover:text-red-600
            "
            onClick={() => {
              // call removeFromCart(food.id) if you have the hook
              console.log("remove from cart", food.id);
            }}
          >
            {/* Default: checkmark */}
            <Check className="w-3.5 h-3.5 group-hover/cart:hidden" />
            {/* Hover: trash */}
            <Trash2 className="w-3.5 h-3.5 hidden group-hover/cart:block" />
            <span className="group-hover/cart:hidden">In cart</span>
            <span className="hidden group-hover/cart:inline">Remove</span>
          </button>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="text-xs font-medium cursor-pointer shrink-0 gap-1.5"
            onClick={handleAddToCart}
            disabled={isPending}
          >
            <ShoppingCart className="w-3.5 h-3.5" />
            {isPending ? "Adding..." : "Add to cart"}
          </Button>
        )}
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="text-center py-20 flex flex-col items-center gap-3">
      <p className="text-4xl">🍽️</p>
      <p className="text-[15px] font-medium text-foreground">No recipes found</p>
      <p className="text-[13px] text-muted-foreground">Try searching for something else.</p>
    </div>
  );
}

function ErrorState() {
  return (
    <div className="text-center py-20 flex flex-col items-center gap-3">
      <p className="text-4xl">⚠️</p>
      <p className="text-[15px] font-medium text-foreground">Something went wrong</p>
      <p className="text-[13px] text-muted-foreground">Failed to load recipes. Please try again.</p>
    </div>
  );
}

export default function Home() {
  const { data, isLoading, error } = useGetAllFoods();
  const foods: Food[] = data?.data ?? [];

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <Header />

      {/* Hero text */}
      <div className="pt-7 mb-8">
        <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground mb-2">
          Discover
        </p>
        <h1 className={`${playfair.className} text-4xl md:text-5xl font-normal text-foreground leading-tight mb-3`}>
          Explore <em>recipes</em>
        </h1>
        <p className="text-[15px] text-muted-foreground font-light leading-relaxed max-w-lg">
          Fresh ideas for every meal. Browse our curated collection of chef-tested recipes.
        </p>
      </div>

      {/* Search */}
      <div className="flex gap-2 mb-10 max-w-lg">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            type="search"
            placeholder="Search recipes, ingredients…"
            className="pl-9 h-11 text-sm"
          />
        </div>
        <Button className="h-11 px-6 text-sm font-medium">Search</Button>
      </div>

      {/* Section label */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted-foreground">
          All recipes
        </p>
        {!isLoading && !error && foods.length > 0 && (
          <p className="text-[11px] text-muted-foreground">
            {foods.length} items
          </p>
        )}
      </div>

      {/* States */}
      {isLoading && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 divide-x divide-y border border-border rounded-xl overflow-hidden mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <FoodCardSkeleton key={i} />
          ))}
        </div>
      )}

      {!isLoading && error && <ErrorState />}

      {!isLoading && !error && foods.length === 0 && <EmptyState />}

      {!isLoading && !error && foods.length > 0 && (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 divide-x divide-y border border-border rounded-xl overflow-hidden mb-8">
          {foods.map((food) => (
            <FoodCard key={food.id} food={food} />
          ))}
        </div>
      )}

      <div className="flex justify-center mb-12">
        <PaginationDemo />
      </div>

      <div className="border-t border-border mb-12" />

      <Testimonials />
    </main>
  );
}