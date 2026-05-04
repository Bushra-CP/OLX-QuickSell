import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import type { ProductInterface } from "@/types/productInterface";
import { addToCart, addToCartAPI } from "@/redux/feactures/cartSlice";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "@/redux/store/store";
import toast from "react-hot-toast";
import { ShoppingCart } from "lucide-react";
import {
  getSingleProductAPI,
  updateQuantity,
} from "@/redux/feactures/productsSlice";

function ProductDetails() {
  const dispatch = useDispatch<AppDispatch>();

  const { id } = useParams();

  const [product, setProduct] = useState<ProductInterface | null>(null);
  const [qty, setQty] = useState(1); //quantity state

  //to fetch product
  const fetchProduct = async () => {
    if (!id) {
      throw new Error("Product ID is missing");
    }
    return await getSingleProductAPI(id);
  };

  useEffect(() => {
    const load = async () => {
      try {
        const data = await fetchProduct();
        setProduct(data);
      } catch (err) {
        console.error(err);
      }
    };

    load();
  }, [id]);

  if (!product) return <p className="p-6">Loading...</p>;

  // 🔥 Quantity Handlers
  const increaseQty = () => {
    if (qty < product.quantity) {
      setQty((prev) => prev + 1);
    }
  };

  const decreaseQty = () => {
    if (qty > 1) {
      setQty((prev) => prev - 1);
    }
  };

  // 🔥 Product details for Redux
  const productDetails = {
    productId: product._id,
    title: product.title,
    price: product.price,
    category: product.category,
    quantity: qty,
    image: product.image,
  };

  // 🔥 Add to cart
  const handleAddToCart = async (productId: string) => {
    try {
      const res = await addToCartAPI({ productId, quantity: qty });

      const updatedProduct = await fetchProduct(); //get fresh data
      setProduct(updatedProduct);

      dispatch(addToCart(productDetails));

      dispatch(updateQuantity({ productId, quantity: -qty }));

      toast.success(res.message);

      // reset quantity after adding
      setQty(1);
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6 m-10">
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* 🖼 Image */}
        <div className="w-full">
          <img
            src={product.image || "https://via.placeholder.com/500"}
            className="w-full h-[400px] object-cover rounded-xl shadow-md"
          />
        </div>

        {/* 📦 Details */}
        <div className="flex flex-col justify-between h-full">
          <div className="space-y-4">
            <h1 className="text-2xl md:text-3xl font-bold">{product.title}</h1>

            <p className="text-sm text-gray-500 uppercase">
              {product.category}
            </p>

            <h2 className="text-3xl font-semibold text-green-600">
              ₹{product.price}
            </h2>

            <hr />

            <p className="text-gray-700">{product.description}</p>

            {/* 🔥 Quantity Selector */}
            <div className="flex items-center gap-4 mt-4">
              <span className="text-sm font-medium">Quantity:</span>

              <div className="flex items-center border rounded-lg overflow-hidden">
                <button
                  onClick={decreaseQty}
                  className="px-3 py-1 text-lg font-bold bg-gray-100 hover:bg-gray-200"
                >
                  −
                </button>

                <span className="px-4 py-1 text-lg">{qty}</span>

                <button
                  onClick={increaseQty}
                  disabled={qty >= product.quantity}
                  className={`px-3 py-1 text-lg font-bold ${
                    qty >= product.quantity
                      ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                      : "bg-gray-100 hover:bg-gray-200"
                  }`}
                >
                  +
                </button>
              </div>
            </div>

            {/* 🔥 Stock Info */}
            <p className="text-sm text-gray-500">
              {product.quantity > 0
                ? `Available: ${product.quantity}`
                : "Out of stock"}
            </p>
          </div>

          {/* 🔥 Add to Cart Button */}
          <div className="mt-6">
            <button
              disabled={product.quantity <= 0}
              onClick={() => handleAddToCart(product._id!)}
              className={`w-full flex items-center justify-center gap-2 py-3 rounded-lg text-lg font-medium transition active:scale-95 border-2
              ${
                product.quantity > 0
                  ? "bg-white text-black border-black hover:bg-gray-200"
                  : "bg-gray-300 text-gray-500 border-gray-300 cursor-not-allowed"
              }`}
            >
              <ShoppingCart size={18} />
              {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetails;
