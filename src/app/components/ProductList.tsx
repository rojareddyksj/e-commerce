"use client";

import { useAppDispatch } from "@/app/store";
import { addToCart } from "@/app/store";
import Image from "next/image";

const products = [
    { id: 1, name: "Laptop", price: 999, image: "/images/img.png" },
    { id: 2, name: "Phone", price: 699, image: "/images/img_1.png" },
    { id: 3, name: "Phone", price: 799, image: "/images/img_2.png" },
    { id: 4, name: "Phone", price: 799, image: "/images/img_3.png" },
    { id: 5, name: "Laptop", price: 799, image: "/images/img_4.png" },
    { id: 6, name: "Laptop", price: 799, image: "/images/img_5.png" },
];

const ProductList: React.FC = () => {
    const dispatch = useAppDispatch();

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-6 text-center">Products</h2>

            {/* Row-wise Layout */}
            <div className="flex flex-wrap justify-center gap-6">
                {products.map((product) => (
                    <div
                        key={product.id}
                        className="border-2 border-blue-600 rounded-xl shadow-lg bg-white overflow-hidden
                                   transform transition-all duration-300 hover:scale-105 hover:shadow-xl p-4
                                   flex flex-col items-center w-[300px]"
                    >
                        {/* Image Section (200x200) */}
                        <div className="w-[200px] h-[200px] flex items-center justify-center">
                            <Image
                                src={product.image}
                                alt={product.name}
                                width={200}
                                height={200}
                                className="object-contain"
                            />
                        </div>

                        {/* Product Info */}
                        <div className="text-center mt-4">
                            <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                            <p className="text-blue-600 font-semibold text-lg">${product.price}</p>
                        </div>

                        {/* Add to Cart Button */}
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded mt-4 transition-all duration-300
                                       hover:bg-blue-700 w-full"
                            onClick={() => dispatch(addToCart(product))}
                        >
                            Add to Cart
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductList;
