"use client";
import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from './cart/slice'
import { userSlice } from "./user/slice";
import { tokenSlice } from "./auth/slice";
import { orderHistorySlice } from "./order-history/slice";

export const store = 
	configureStore({
		reducer: {
			cart: cartSlice.reducer,
			user: userSlice.reducer,
			token: tokenSlice.reducer,
			orderHistory: orderHistorySlice.reducer,
		},
	});
