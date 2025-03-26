"use client";

import { useAppSelector, useAppDispatch, clearCart } from "@/app/store";
import { useState } from "react";
import Link from "next/link";

const Checkout: React.FC = () => {
    const dispatch = useAppDispatch();
    const cart = useAppSelector((state) => state.cart.items);
    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const [name, setName] = useState("");
    const [address, setAddress] = useState("");
    const [payment, setPayment] = useState("");
    const [orderPlaced, setOrderPlaced] = useState(false);

    const handleCheckout = () => {
        if (!name || !address || !payment) {
            alert("Please fill in all details.");
            return;
        }

        // Simulate order placement
        setOrderPlaced(true);
        dispatch(clearCart());
    };

    if (orderPlaced) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-2xl font-semibold text-green-600">Order Placed Successfully! 🎉</h2>
                <p className="text-gray-600 mt-2">Thank you for your purchase, {name}!</p>
                <Link href="/">
                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
                        Continue Shopping
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="p-6 max-w-lg mx-auto">
            <h2 className="text-2xl font-semibold mb-4">Checkout</h2>

            {cart.length === 0 ? (
                <p className="text-gray-500">Your cart is empty. <Link href="/" className="text-blue-600 underline">Go back</Link></p>
            ) : (
                <>
                    <ul className="space-y-2 mb-4">
                        {cart.map((item) => (
                            <li key={item.id} className="border p-2 rounded flex justify-between">
                                <span>{item.name} (x{item.quantity})</span>
                                <span>${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        ))}
                    </ul>

                    <h3 className="text-lg font-semibold mb-2">Total: ${total.toFixed(2)}</h3>

                    <div className="space-y-3">
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        <input
                            type="text"
                            placeholder="Shipping Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            className="w-full border p-2 rounded"
                        />
                        <select
                            value={payment}
                            onChange={(e) => setPayment(e.target.value)}
                            className="w-full border p-2 rounded"
                        >
                            <option value="">Select Payment Method</option>
                            <option value="credit_card">Credit Card</option>
                            <option value="paypal">PayPal</option>
                            <option value="cod">Cash on Delivery</option>
                        </select>

                        <button
                            className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 transition"
                            onClick={handleCheckout}
                        >
                            Place Order
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Checkout;
