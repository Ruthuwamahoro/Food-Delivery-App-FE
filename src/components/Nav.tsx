import { playfair } from "@/data/fonts";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { Button } from "./ui/button";

export default function Navigation(){
    return(
        <Button variant="ghost" className="text-white hover:text-orange-600 font-medium transition-colors duration-200 bg-gray-700 w-20 h-10 rounded-lg flex items-center gap-2 ml-24 mt-10">
            Back
        </Button>
    )
}