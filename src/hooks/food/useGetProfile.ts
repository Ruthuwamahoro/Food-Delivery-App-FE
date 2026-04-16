import { getUserInfo } from "@/services/users/profile"
import { useQuery } from "@tanstack/react-query"

export const useGetUserInfo = () => {
    const { data, isPending, error} = useQuery({
        queryKey: ["users"],
        queryFn: getUserInfo
    })

    return {
        data,isPending,error
    }
}