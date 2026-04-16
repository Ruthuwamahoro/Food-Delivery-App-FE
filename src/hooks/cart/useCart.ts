import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addItemToCart, getCartItems, removeCartItem, updateCartItemQuantity } from "@/services/foods/cart";
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

export const useGetAllCartItems = () => {
    const { data, isPending, error} = useQuery({
        queryKey: CART_KEYS.all,
        queryFn: getCartItems,
        
    })

    return {
        data, isPending, error
    }

}

export const useUpdateCartItemQuantity = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: ({ itemId, quantity }: { itemId: string; quantity: number }) =>
        updateCartItemQuantity(itemId, quantity),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: CART_KEYS.all });
      },
    });
  };

  export const useRemoveCartItem = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (itemId: string) => removeCartItem(itemId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: CART_KEYS.all });
      },
    });
  };