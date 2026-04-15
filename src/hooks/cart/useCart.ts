import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addItemToCart } from "@/services/foods/cart";
import { AddToCartItemPayload } from "@/types/cart";


export const CART_KEYS  = {
    all: ["cart"] as const,
    details: () => [...CART_KEYS.all,"details"] as const

}
export const useAddItemToCart = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (payload:AddToCartItemPayload) => addItemToCart(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: CART_KEYS.all})
        }
    })
}