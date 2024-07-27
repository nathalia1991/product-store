"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./model";

export const tokenSlice = createSlice({
    name: 'token',
    initialState,
    reducers: {
      setToken(state, action: PayloadAction<any>) {
        return {...state, token: action.payload.token}
      },
      cleanToken(state, action: PayloadAction<any>) {
        return initialState
      }
    },
  })

export const { setToken, cleanToken} = tokenSlice.actions