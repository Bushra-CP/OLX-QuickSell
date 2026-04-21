import { Card, CardContent } from "@/components/ui/card";
import type { ProductInterface } from "@/types/productInterface";
import { ShoppingCart } from "lucide-react";
import { Link } from "react-router-dom";

type Props = {
  product: ProductInterface;
};

function ProductCard({ product }: Props) {
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
        <button className="w-full flex items-center justify-center gap-2 bg-black text-white py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition active:scale-95">
          <ShoppingCart size={16} />
          Add to Cart
        </button>
      </div>
    </Card>
  );
}

export default ProductCard;
