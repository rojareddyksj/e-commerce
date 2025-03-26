"use client";  // ✅ Ensure this is at the top!

import Link from "next/link";
import { useAppSelector } from "@/app/store";  // ✅ Ensure you are using Redux's selector
import { useEffect, useState } from "react";

const Navbar = () => {
    const cartItems = useAppSelector((state) => state.cart.items);
    const [cartCount, setCartCount] = useState<number | null>(null); // ✅ Avoid hydration mismatch

    useEffect(() => {
        setCartCount(cartItems.length); // ✅ Update count after mount
    }, [cartItems]);

    return (
        <nav className="flex justify-between items-center p-4 bg-blue-600 text-white shadow-lg">
            <Link href="/" className="text-xl font-bold">
                Shopping Cart
            </Link>
            <div className="flex space-x-6">
                <Link href="/" className="hover:underline">Products</Link>
                <Link href="/cart" className="hover:underline">
                    Cart ({cartCount !== null ? cartCount : "?"}) {/* ✅ Prevents hydration error */}
                </Link>
            </div>
        </nav>
    );
};

export default Navbar;
