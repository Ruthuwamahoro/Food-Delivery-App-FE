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