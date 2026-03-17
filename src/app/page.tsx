"use client";
import Image from "next/image";
import { recipe } from "@/data/recipe";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaginationDemo } from "@/components/Pagination";
import Testimonials from "@/components/Testimonials";
import { playfair } from "@/data/fonts";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";

interface Recipe {
  id: number;
  title: string;
  description: string;
  image: string;
  category?: string;
  time?: string;
  difficulty?: string;
}

export default function Home() {
  const router = useRouter();
  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">

      <Header />

      <p className="text-[11px] font-medium tracking-[0.15em] uppercase text-muted-foreground mb-1 pt-7">
        Discover
      </p>
      <div>
        <div>
          <h1 className={`${playfair.className} text-4xl md:text-5xl font-normal text-foreground leading-tight mb-3`}>
          Explore <em>recipes</em>
          </h1>
          <p className="text-[15px] text-muted-foreground font-light leading-relaxed mb-8 max-w-lg">
            Fresh ideas for every meal. Browse our curated collection of chef-tested recipes.
          </p>
        </div>
      </div>


      {/* Search bar */}
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

      <p className="text-[11px] font-medium tracking-[0.12em] uppercase text-muted-foreground mb-4">
        All recipes
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 divide-x divide-y md:divide-y-0 border border-border rounded-xl overflow-hidden mb-8">
        {recipe.map((r: Recipe) => (
          <div key={r.id} className="bg-card flex flex-col px-6 pt-3 border-b border-border">
            <div className="relative w-full h-48 bg-muted">
              <Image
                src={r.image}
                alt={r.title}
                fill
                className="object-cover"
              />
              {r.category && (
                <span className="absolute top-3 left-3 text-[10px] font-medium tracking-wide uppercase bg-amber-50 text-amber-800 px-2 py-1 rounded">
                  {r.category}
                </span>
              )}
            </div>

            <div className="p-5 flex-1">
              <h2 className={`${playfair.className} text-lg font-normal text-foreground leading-snug mb-2`}>
                {r.title}
              </h2>
              <p className="text-[13px] text-muted-foreground font-light leading-relaxed">
                {r.description}
              </p>
              <Badge variant="outline" className="text-xs font-medium mt-3 border-none bg-gray-200 cursor-pointer"   onClick={() => router.push(`/recipe/${r.id}`)}>
                View recipe
              </Badge>
            </div>

            <div className="px-5 py-4 border-t border-border flex items-center justify-between">
              {r.time && (
                <span className="text-[11px] text-muted-foreground">
                  {r.time}{r.difficulty ? ` · ${r.difficulty}` : ""}
                </span>
              )}
              <Button
                variant="outline"
                size="sm"
                className="text-xs font-medium ml-auto cursor-pointer"
              >
                Add to cart
              </Button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mb-12">
        <PaginationDemo />
      </div>

      <div className="border-t border-border mb-12" />

      <Testimonials />
    </main>
  );
}
