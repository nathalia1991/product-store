import { Order } from "@/app/model/order";

export interface OrderHistoryState {
    orders?: Order[]
  }
  
  // Define initial state
  export const initialState : OrderHistoryState = {
    orders: []
  };
  
  