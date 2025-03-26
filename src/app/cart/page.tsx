"use client";

import { useAppSelector, useAppDispatch, removeFromCart, updateQuantity } from "@/app/store";
import Link from "next/link";
import { useEffect, useState } from "react";

const Cart: React.FC = () => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart.items);

    // ✅ Prevent hydration error by ensuring client-side rendering
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []); // ✅ Only runs on client

    // ✅ Calculate total only on client
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    if (!isMounted) return null; // ✅ Hide UI until mounted to prevent mismatch

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

            {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <ul className="space-y-4">
                    {cart.map((item) => (
                        <li key={item.id} className="flex justify-between items-center border p-4 rounded shadow-lg">
                            <span className="text-lg">{item.name} - ${item.price}</span>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => dispatch(updateQuantity({ id: item.id, quantity: +e.target.value }))}
                                min="1"
                                className="w-12 text-center border rounded"
                            />
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                onClick={() => dispatch(removeFromCart(item.id))}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <h3 className="mt-4 font-semibold text-xl">Total: ${total.toFixed(2)}</h3>

            <Link href="/checkout">
                <button className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-700 transition">
                    Go to Checkout
                </button>
            </Link>
        </div>
    );
};

export default Cart;
