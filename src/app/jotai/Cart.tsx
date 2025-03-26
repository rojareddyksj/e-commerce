"use client";

import { useAtom } from "jotai";
import { cartAtom, clearCartAtom, removeFromCartAtom, totalPriceAtom } from "@/app/components/cartStore";
import Link from "next/link";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";

const Cart = () => {
    const [cart] = useAtom(cartAtom);
    const [totalPrice] = useAtom(totalPriceAtom);
    const [, removeFromCart] = useAtom(removeFromCartAtom);
    const [, clearCart] = useAtom(clearCartAtom);

    return (
        <div className="p-6">
            <h2 className="text-2xl font-semibold mb-4">Shopping Cart</h2>

            {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty.</p>
            ) : (
                <ul className="space-y-4">
                    {cart.map((item: { id: Key | null | undefined; name: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; price: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; quantity: string | number | readonly string[] | undefined; }) => (
                        <li key={item.id} className="flex justify-between items-center border p-4 rounded shadow-lg">
                            <span className="text-lg">{item.name} - ${item.price}</span>
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) => {
                                    // Update quantity atomically
                                    const updatedQuantity = Math.max(1, +e.target.value);
                                    removeFromCart({ id: item.id, quantity: updatedQuantity });
                                }}
                                min="1"
                                className="w-12 text-center border rounded"
                            />
                            <button
                                className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-700"
                                onClick={() => removeFromCart(item.id)}
                            >
                                Remove
                            </button>
                        </li>
                    ))}
                </ul>
            )}

            <h3 className="mt-4 font-semibold text-xl">Total: ${totalPrice.toFixed(2)}</h3>

            {cart.length > 0 && (
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded mt-4 hover:bg-blue-700 transition"
                    onClick={clearCart}
                >
                    Clear Cart
                </button>
            )}

            <Link href="/checkout">
                <button className="bg-green-500 text-white px-4 py-2 rounded mt-4 hover:bg-green-700 transition">
                    Go to Checkout
                </button>
            </Link>
        </div>
    );
};

export default Cart;
