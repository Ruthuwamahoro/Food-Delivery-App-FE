import api from "@/lib/api";
import axios from "axios";

export const getAllFoodsLists = async() => {
    try {

        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/foods`)
        
        return response.data;
    } catch (error) {
        return error;
    }
}