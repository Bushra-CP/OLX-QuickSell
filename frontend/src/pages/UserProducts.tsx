import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import {
  deleteProductAPI,
  getUserProductsAPI,
} from "@/redux/feactures/productsSlice";

type Product = {
  _id: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

function MyProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getProducts() {
      try {
        const data = await getUserProductsAPI();
        setProducts(data.products || []);
      } catch (error) {
        console.log(error);
      }
    }

    getProducts();
  }, []);

  // 🗑️ Delete product
  const handleDelete = async (productId: string) => {
    try {
      await deleteProductAPI(productId);

      setProducts((prev) => prev.filter((p) => p._id !== productId));

      toast.success("Product deleted");
    } catch (error) {
      console.log(error);
    }
  };

  if (products.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No products added yet 📦
      </p>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">My Products</h1>

      {products.map((product) => (
        <Card key={product._id} className="shadow-md">
          <CardContent className="flex items-center justify-between gap-4 p-4">
            {/* Image */}
            <div className="w-20 h-20">
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover rounded-md"
              />
            </div>

            {/* Details */}
            <div className="flex-1">
              <h2 className="font-semibold text-lg">{product.title}</h2>
              <p className="text-gray-600">₹{product.price}</p>
              <p className="text-sm text-gray-500">Stock: {product.quantity}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2">
              <Button
                variant="outline"
                onClick={() => navigate(`/editProduct/${product._id}`)}
              >
                Edit
              </Button>

              <Button
                variant="destructive"
                onClick={() => handleDelete(product._id)}
              >
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default MyProducts;
