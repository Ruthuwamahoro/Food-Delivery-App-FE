import { useQuery } from "@tanstack/react-query";
import { getAllFoodsLists } from "@/services/foods/getAllFoodsLists";

export const useGetAllFoods = () => {
    const { data, isLoading, error } = useQuery({
        queryKey: ["all-foods-lists"],
        queryFn: getAllFoodsLists,
    });

    return { data, isLoading, error };
}