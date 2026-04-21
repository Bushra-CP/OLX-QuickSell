import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ProductInterface } from "@/types/productInterface";
import axios from "axios";

function ProductDetails() {
  const { id } = useParams();

  const [product, setProduct] = useState<ProductInterface | null>(null);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await axios.get(
          `http://localhost:3000/quickSell/product/${id}`,
        );
        setProduct(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProduct();
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6 m-10">
      {/* Main Layout */}
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* 🖼 Image Section */}
        <div className="w-full">
          <img
            src={product.image || "https://via.placeholder.com/500"}
            className="w-full h-[400px] object-cover rounded-xl shadow-md"
          />
        </div>

        {/* 📦 Details Section */}
        <div className="flex flex-col justify-between h-full">
          {/* Top Content */}
          <div className="space-y-4">
            {/* Title */}
            <h1 className="text-2xl md:text-3xl font-bold leading-tight">
              {product.title}
            </h1>

            {/* Category */}
            <p className="text-sm text-gray-500 uppercase tracking-wide">
              {product.category}
            </p>

            {/* Price */}
            <h2 className="text-3xl font-semibold text-green-600">
              ₹{product.price}
            </h2>

            {/* Divider */}
            <hr />

            {/* Description */}
            <p className="text-gray-700 leading-relaxed">
              {product.description}
            </p>
          </div>

          {/* Bottom CTA */}
          <div className="mt-6">
            <button className="w-full bg-white text-black border-3 py-3 rounded-lg text-lg font-medium hover:bg-gray-400 transition active:scale-95">
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
