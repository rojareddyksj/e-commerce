"use client"; // Required in Next.js App Router for Client Components

import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";


type CartItem = { id: number; name: string; price: number; quantity: number };

// Store Cart Items (Persisted in LocalStorage)
export const cartAtom = atomWithStorage<CartItem[]>("cart", []);

// Derived Atom: Compute Total Price
export const totalPriceAtom = atom((get) =>
    get(cartAtom).reduce((total, item) => total + item.price * item.quantity, 0)
);

// Actions: Modify Cart
export const addToCartAtom = atom(null, (get, set, newItem: CartItem) => {
    const cart = get(cartAtom);
    const existingItem = cart.find((item) => item.id === newItem.id);

    if (existingItem) {
        set(
            cartAtom,
            cart.map((item) =>
                item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item
            )
        );
    } else {
        set(cartAtom, [...cart, { ...newItem, quantity: 1 }]);
    }
});

export const removeFromCartAtom = atom(null, (get, set, id: number) => {
    set(cartAtom, get(cartAtom).filter((item) => item.id !== id));
});

export const clearCartAtom = atom(null, (get, set) => {
    set(cartAtom, []);
});
