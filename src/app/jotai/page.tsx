import ProductList from "@/app/components/ProductList";

import Link from "next/link";
import Cart from "@/app/cart/page";

export default function Home() {
    return (
        <main className="flex flex-col items-center justify-center">
            <h1 className="text-2xl mb-4">Shopping Cart App</h1>
            <ProductList />
            <Cart />
            <Link href="/checkout">
                <button>Go to Checkout</button>
            </Link>
        </main>
    );
}
