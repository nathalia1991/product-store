export interface Product {
    id?: number;
    title?: string;
    image?: string;
    price?: number;
    description?: string;
}

export interface ProductListProps {
    products?: Product[];
}
