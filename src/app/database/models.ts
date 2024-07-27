export interface UserAuthEntity {
    email: string,
    password: string,
}

export interface UserEntity {
    email: string,
    name: string,
    address: string,
    phone: string
}

export interface OrdersEntity {
    id: number,
    order_date: string,
    id_user: number
}

export interface OrderItemEntity {
    id: number,
    id_order: number,
    id_product: number,
    quantity: number,
    unit_price: number
}