import { getFoodById } from "@/services/foods/getAllFoodsLists";
import { useQuery } from "@tanstack/react-query";

export const useGetFood = (id: string) =>
  useQuery({
    queryKey: ["food", id],
    queryFn: () => getFoodById(id),
    enabled: !!id, 
  });