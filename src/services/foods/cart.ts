import api from "@/lib/api";
import { AddToCartItemPayload, ApiResponse, CartItemModel } from "@/types/cart";
export const addItemToCart = async(payload:AddToCartItemPayload):Promise<ApiResponse<CartItemModel>> => {
    const { data  } = await api.post("/api/carts/items", payload);
    console.log("dataaa=================================" + data);
    return data;
}

export const getCartItems = async() => {
    const {data} = await api.get("/api/carts");
    console.log(data);
    return data;
}

export const updateCartItemQuantity = async (
    itemId: string,
    quantity: number
  ): Promise<ApiResponse<CartItemModel>> => {
    const { data } = await api.patch(`/api/carts/items/${itemId}`, { quantity });
    return data;
};

export const removeCartItem = async (itemId: string): Promise<void> => {
    await api.delete(`/api/carts/items/${itemId}`);
  };