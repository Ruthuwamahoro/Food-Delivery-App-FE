import api from "@/lib/api";

export const getUserInfo = async() => {
    try {
        const { data } = await api.get("/api/users/profile");
        return data;
    } catch (error) {
        return error;
    }
}