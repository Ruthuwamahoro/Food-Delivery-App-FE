export interface CartModel {
    id: string;
    userId: string;
    createdAt: Date;
    updatedAt: Date;
}


export interface CartItemModel {
    id: string;
    cartId: string;
    foodId: string;
    quantity: number;
    price: number;
    createdAt: Date;
    updatedAt: Date;
}


export interface CartDTO {
    id: string;
    userId: string;
    items: CartItemModel[];
    createdAt: Date;
    updatedAt: Date;
}

export interface AddToCartItemPayload {
    foodId: string;
    quantity: number;
    price: number;
}

export interface UpdateCartItemPayload {
    quantity: number;
    price: number;
}

export interface DeleteCartItemPayload {
    id: string;
}
export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T | null;
}