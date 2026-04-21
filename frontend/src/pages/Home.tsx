import ProductCard from "@/components/uiComponents/ProductCard";
import { productFetch } from "@/redux/feactures/productsSlice";
import type { AppDispatch, RootState } from "@/redux/store/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Home() {
  const dispatch = useDispatch<AppDispatch>();

  const { products, loading, error } = useSelector(
    (state: RootState) => state.products,
  );

  useEffect(() => {
    dispatch(productFetch());
  }, [dispatch]);

  return (
    <>
      {/* Header */}
      <div className="flex justify-between items-center px-6 pt-6">
        <h1 className="text-xl font-semibold">Latest Products</h1>

        <Link
          to="/products"
          className="text-blue-600 hover:underline text-sm font-medium"
        >
          View All →
        </Link>
      </div>

      {/* Product Grid */}
      <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {loading && <p>Loading products...</p>}

        {!loading && products.length === 0 && <p>No products found</p>}

        {error && <p>failed to fetch products</p>}

        {products.map((product) => (
          <ProductCard key={product._id!} product={product} />
        ))}
      </div>
    </>
  );
}

export default Home;
