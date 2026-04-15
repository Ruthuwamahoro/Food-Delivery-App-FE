import api from "@/lib/api";
import { AddToCartItemPayload, ApiResponse, CartItemModel } from "@/types/cart";
export const addItemToCart = async(payload:AddToCartItemPayload):Promise<ApiResponse<CartItemModel>> => {
    const { data  } = await api.post("/api/cart/items", payload);
    return data;
}