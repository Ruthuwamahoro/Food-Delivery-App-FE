import api from "@/lib/api";
import { ApiResponse } from "@/types/cart";
import { Order } from "@/types/order";

export const createOrder = async (): Promise<ApiResponse<Order>> => {
    const { data } = await api.post("/api/orders");
    return data;
};

export const getMyOrders = async (): Promise<ApiResponse<Order[]>> => {
  const { data } = await api.get("/api/orders/me");
  return data;
};