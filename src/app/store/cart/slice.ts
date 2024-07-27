"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./model";

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
      addToCart(state, action: PayloadAction<any>) {
        const existingItemIndex = state.products.findIndex(item => item.product.id === action.payload.product.id);
          if (existingItemIndex !== -1) {
              // If exists, update quantity
              const updatedCart = [...state.products];
              updatedCart[existingItemIndex] = {
                  ...updatedCart[existingItemIndex],
                  quantity: updatedCart[existingItemIndex].quantity + action.payload.quantity
              };
              return { ...state, products: updatedCart };
          } else {
              // If not exists, add new item
              return { ...state, products: [...state.products, { product: action.payload.product, quantity: action.payload.quantity }] };
          }
      },
      removeFromCart(state, action: PayloadAction<any>) {
        const updatedCart = state.products.filter(item => item.product.id !== action.payload.id);
        return { ...state, products: updatedCart };
      },
      updateCartProduct(state, action: PayloadAction<any>) {
        const { product, quantity } = action.payload;
          const updatedCartQuantity = state.products.map(item =>
              item.product.id === product.id ? { ...item, quantity: quantity } : item
          );
          return { ...state, products: updatedCartQuantity };
      },
      cleanCart(state, action) {
        return initialState
      }
    },
  })

export const { addToCart, removeFromCart, updateCartProduct, cleanCart } = cartSlice.actions