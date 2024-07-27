export interface OrderItem {
    id: number;
    idOrder: number;
    idProduct: number;
    quantity: number;
    unitPrice: number;
}


export interface Order {
    id: number;
    date: string;
    idUser?: string;
    orderItems: OrderItem[];
    total: number;
}


