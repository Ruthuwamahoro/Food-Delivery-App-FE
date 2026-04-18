export interface OrderItem {
    id: string;
    name: string;
    images: string;
    price: number;
    quantity: number;
    totalPrice: number;
  }
  
  export interface Order {
    id: string;
    cartId: string;
    userId: string;
    items: OrderItem[];
    totalAmount: number;
    status: "PENDING" | "CONFIRMED" | "DELIVERED" | "CANCELLED";
    createdAt: string;
    updatedAt: string;
  }