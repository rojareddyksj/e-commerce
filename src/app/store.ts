"use client";

import { configureStore, createSlice, PayloadAction } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux";

// Cart Item Type
type CartItem = {
    id: number;
    name: string;
    price: number;
    quantity: number;
};

// Cart Slice
const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [] as CartItem[],
    },
    reducers: {
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const existingItem = state.items.find((item) => item.id === action.payload.id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.items.push({ ...action.payload, quantity: 1 });
            }
        },
        removeFromCart: (state, action: PayloadAction<number>) => {
            state.items = state.items.filter((item) => item.id !== action.payload);
        },
        updateQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const item = state.items.find((item) => item.id === action.payload.id);
            if (item) {
                item.quantity = action.payload.quantity;
            }
        },
        clearCart: (state) => {
            state.items = [];
        },
    },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart } = cartSlice.actions;

// Persist Configuration
const persistConfig = {
    key: "cart",
    storage,
};

const persistedReducer = persistReducer(persistConfig, cartSlice.reducer);

// Configure Store
export const store = configureStore({
    reducer: {
        cart: persistedReducer,
    },
});

// Persistor
export const persistor = persistStore(store);

// Define Redux Hooks
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
