import { createOrder, getMyOrders } from "@/services/orders/ordersService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

const ORDER_KEYS = {
  all: ["orders"] as const,
  mine: ["orders", "me"] as const,
};

// Create order mutation
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      // Invalidate orders and cart after order is placed
      queryClient.invalidateQueries({ queryKey: ORDER_KEYS.all });
      queryClient.invalidateQueries({ queryKey: ["cart"] });
    },
  });
};

// Get my orders query
export const useGetMyOrders = () => {
  return useQuery({
    queryKey: ORDER_KEYS.mine,
    queryFn: getMyOrders,
  });
};