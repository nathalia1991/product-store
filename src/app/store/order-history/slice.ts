"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./model";

export const orderHistorySlice = createSlice({
    name: 'orderHistory',
    initialState,
    reducers: {
      setOrders(state, action: PayloadAction<any>) {
        return {...state, orders: action.payload}
      },
      cleanOrders(state, action: PayloadAction<any>) {
        return initialState
      }
    },
  })

export const { setOrders, cleanOrders} = orderHistorySlice.actions