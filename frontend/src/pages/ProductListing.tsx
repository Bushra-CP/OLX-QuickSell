import Filters from "@/components/uiComponents/Filters";
import ProductCard from "@/components/uiComponents/ProductCard";
import {
  fetchProductListing,
  setPage,
} from "@/redux/feactures/productListingSlice";
import type { AppDispatch, RootState } from "@/redux/store/store";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

function ProductListing() {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading, error, page, totalPages } = useSelector(
    (state: RootState) => state.productsListing,
  );

  const [searchParams, setSearchParams] = useSearchParams();
  const [categoryList, setCategoryList] = useState<string[]>([]);

  const search = searchParams.get("search") || "";

  // 🔥 Filters
  const [category, setCategory] = useState<string[]>(
    searchParams.get("category")
      ? searchParams.get("category")!.split(",")
      : [],
  );
  const [minPrice, setMinPrice] = useState(searchParams.get("minPrice") || "");
  const [maxPrice, setMaxPrice] = useState(searchParams.get("maxPrice") || "");

  // Merge URL params
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());

    if (category.length > 0) params.category = category.join(",");
    else delete params.category;

    if (minPrice) params.minPrice = minPrice;
    else delete params.minPrice;

    if (maxPrice) params.maxPrice = maxPrice;
    else delete params.maxPrice;

    setSearchParams(params, { replace: true });
  }, [category, minPrice, maxPrice, setSearchParams, searchParams]);

  //Reset page when filters change
  useEffect(() => {
    dispatch(setPage(1));
  }, [search, category, minPrice, maxPrice, dispatch]);

  // ✅ Fetch categories
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await axios.get<string[]>(
          "http://localhost:3000/quickSell/categories",
        );
        setCategoryList(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchCategories();
  }, []);

  // ✅ Fetch products when filters change
  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(
        fetchProductListing({
          ...(search && { search }),
          ...(category.length > 0 && {
            category: category.join(","),
          }),
          ...(minPrice && { minPrice }),
          ...(maxPrice && { maxPrice }),
          page,
        }),
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [search, category, minPrice, maxPrice, page, dispatch]);

  if (loading) return <p className="p-6">Loading products...</p>;
  if (error) return <p className="p-6">{error}</p>;
  if (!products.length) return <p className="p-6">No products found</p>;

  return (
    <div className="flex">
      {/* Filters Sidebar */}
      <Filters
        category={category}
        setCategory={setCategory}
        minPrice={minPrice}
        setMinPrice={setMinPrice}
        maxPrice={maxPrice}
        setMaxPrice={setMaxPrice}
        categoryList={categoryList}
      />

      {/* Right Section (Grid + Pagination) */}
      <div className="flex flex-col w-full">
        {/* Product Grid */}
        <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id!} product={product} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 pb-6">
          <button
            disabled={page === 1}
            onClick={() => dispatch(setPage(page - 1))}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
          >
            Prev
          </button>

          <span className="font-medium text-sm">
            Page {page} of {totalPages}
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => dispatch(setPage(page + 1))}
            className="px-4 py-2 bg-gray-200 rounded disabled:opacity-50 hover:bg-gray-300 transition"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductListing;
