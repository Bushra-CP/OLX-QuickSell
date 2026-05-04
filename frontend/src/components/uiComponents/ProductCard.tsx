import { Card, CardContent } from "@/components/ui/card";
import { addToCart, addToCartAPI } from "@/redux/feactures/cartSlice";
import { updateQuantity } from "@/redux/feactures/productsSlice";
import type { AppDispatch } from "@/redux/store/store";
import type { ProductInterface } from "@/types/productInterface";
import { ShoppingCart } from "lucide-react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

type Props = {
  product: ProductInterface;
};

function ProductCard({ product }: Props) {
  const dispatch = useDispatch<AppDispatch>();


  const productDetails = {
    productId: product._id,
    title: product.title,
    price: product.price,
    category: product.category,
    quantity: 1,
    image: product.image,
  };

  //add to cart
  const handleAddToCart = async (productId: string) => {
    try {
      const res = await addToCartAPI({ productId, quantity: 1 });

      dispatch(addToCart(productDetails));

      dispatch(updateQuantity({ productId, quantity: -1 }));

      toast.success(res.message);
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  return (
    <Card className="hover:shadow-lg transition flex flex-col h-full">
      {/* Clickable Area */}
      <Link to={`/product/${product._id}`} className="flex flex-col flex-1">
        {/* Image */}
        <img
          src={product.image || "https://via.placeholder.com/300"}
          className="w-full h-40 object-cover rounded-t"
        />

        {/* Content */}
        <CardContent className="flex flex-col flex-1 p-4">
          <div>
            <h2 className="font-semibold text-lg mb-1">₹{product.price}</h2>
            <p className="text-sm text-gray-600 line-clamp-2">
              {product.title}
            </p>
          </div>
        </CardContent>
      </Link>

      {/* Button (separate for alignment) */}
      <div className="p-4 pt-0">
        <button
          disabled={product.quantity <= 0}
          onClick={() => handleAddToCart(product._id!)}
          className={`w-full flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition active:scale-95 
  ${
    product.quantity > 0
      ? "bg-black text-white hover:bg-gray-800"
      : "bg-gray-300 text-gray-500 cursor-not-allowed"
  }`}
        >
          <ShoppingCart size={16} />
          {product.quantity > 0 ? "Add to Cart" : "Out of Stock"}
        </button>
      </div>
    </Card>
  );
}

export default ProductCard;
