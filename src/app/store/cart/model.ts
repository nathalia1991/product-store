import { Product } from "@/app/model/product";

interface CartItem {
  product: Product,
  quantity: number
}

export interface CartState {
  products: CartItem[]
}

// Define initial state
export const initialState : CartState = {
  products: []
};

