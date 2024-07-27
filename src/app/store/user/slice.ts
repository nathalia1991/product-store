"use client";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { initialState } from "./model";

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUser(state, action: PayloadAction<any>) {
        return {...state, user: action.payload}
      },
      cleanUser(state, action: PayloadAction<any>) {
        return initialState
      }
    },
  })

export const { setUser, cleanUser} = userSlice.actions