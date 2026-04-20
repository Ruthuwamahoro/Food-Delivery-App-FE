import api from "@/lib/api";

export const getAllFoodsLists = async() => {
    try {

        const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/foods`)
        
        return response.data;
    } catch (error) {
        return error;
    }
}



export const getFoodById= async(id: String) => {
    try {

        const response = await api.get(`${process.env.NEXT_PUBLIC_API_URL}/api/foods/${id}`)
        
        return response.data;
    } catch (error) {
        return error;
    }
}