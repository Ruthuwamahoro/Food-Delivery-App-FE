"use client";
import { use } from "react";
import Image from "next/image";
import { notFound } from "next/navigation";
import { recipe } from "@/data/recipe";
import { playfair } from "@/data/fonts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import {
  Clock,
  Users,
  ChefHat,
  ShoppingCart,
  Star,
  CheckCircle2,
  BookOpen,
  MoveLeft,
  MoveLeftIcon,
} from "lucide-react";
import Comments from "@/components/Comments";
import { mockComments } from "@/data/testimonials";

interface Props {
  params: Promise<{ id: string }>;
}

const difficultyColor: Record<string, string> = {
  Easy: "bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300",
  Medium: "bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950 dark:text-amber-300",
  Hard: "bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300",
};


export default function RecipePage({ params }: Props) {
  const { id } = use(params);
  const recipeId = parseInt(id, 10);
  const recipeDetail = recipe.find((r) => r.id === recipeId);
  const router = useRouter();

  if (!recipeDetail) return notFound();

  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Button variant="outline" className="mb-6 cursor-pointer" onClick={() => router.back()}>
          <MoveLeftIcon className="w-4 h-4" />
          Back</Button>

        <div className="grid lg:grid-cols-2 gap-10 mb-12">

          <div className="flex flex-col gap-4">
            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-border bg-muted">
              <Image
                src={recipeDetail.image}
                alt={recipeDetail.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute top-4 left-4">
                <Badge
                  variant="secondary"
                  className="bg-background/90 text-foreground backdrop-blur-sm border-0 text-[11px] font-medium tracking-wide uppercase"
                >
                  {recipeDetail.category}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-wrap">
              <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                <Clock className="w-4 h-4" />
                {recipeDetail.time}
              </div>
              <Separator orientation="vertical" className="h-4" />
              <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground">
                <Users className="w-4 h-4" />
                {recipeDetail.servings} servings
              </div>
              <Separator orientation="vertical" className="h-4" />
              <Badge
                variant="outline"
                className={`text-[11px] font-medium gap-1 ${difficultyColor[recipeDetail.difficulty]}`}
              >
                <ChefHat className="w-3 h-3" />
                {recipeDetail.difficulty}
              </Badge>
            </div>
          </div>

          {/* Right — Info */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <p className="text-[11px] font-medium tracking-[0.18em] uppercase text-muted-foreground mb-2">
                Recipe
              </p>
              <h1
                className={`${playfair.className} text-4xl md:text-5xl font-normal text-foreground leading-tight mb-4`}
              >
                {recipeDetail.title}
              </h1>
              <p className="text-[15px] text-muted-foreground font-light leading-relaxed mb-6">
                {recipeDetail.description}
              </p>

              <div className="flex items-center gap-2 mb-6">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4 fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="text-[13px] text-muted-foreground">
                  {mockComments.length} reviews
                </span>
              </div>

              <Separator className="mb-6" />

              <div className="mb-6">
                <div className="flex items-center gap-2 mb-3">
                  <BookOpen className="w-4 h-4 text-muted-foreground" />
                  <span className="text-[11px] font-medium tracking-[0.14em] uppercase text-muted-foreground">
                    Ingredients
                  </span>
                </div>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                  {recipeDetail.ingredients.map((ing, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-2 text-[13px] text-muted-foreground"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mt-0.5 shrink-0" />
                      {ing}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Add to cart CTA */}
            <div className="flex gap-3">
              <Button className="flex-1 h-11 gap-2 text-sm font-medium">
                <ShoppingCart className="w-4 h-4" />
                Add to Cart
              </Button>
              <Button variant="outline" className="h-11 px-5 text-sm">
                Save Recipe
              </Button>
            </div>
          </div>
        </div>

        <Separator className="mb-12" />
        <Comments />

      </div>

    </main>
  );
}