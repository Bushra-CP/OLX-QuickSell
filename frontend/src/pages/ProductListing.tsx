import Filters from "@/components/uiComponents/Filters";
import ProductCard from "@/components/uiComponents/ProductCard";
import { useState } from "react";

const dummyProducts = [
  { id: 1, title: "iPhone 11", price: 15000, category: "Mobiles" },
  { id: 2, title: "Car", price: 500000, category: "Cars" },
  { id: 3, title: "Bike", price: 60000, category: "Bikes" },
  { id: 4, title: "Samsung", price: 12000, category: "Mobiles" },
];

function ProductListing() {
  const [category, setCategory] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredProducts = dummyProducts.filter((product) => {
    return (
      (category === "" || product.category === category) &&
      (maxPrice === "" || product.price <= Number(maxPrice))
    );
  });

  return (
    <div className="flex">
      {/* Filters Sidebar */}
      <Filters setCategory={setCategory} setMaxPrice={setMaxPrice} />

      {/* Product Grid */}
      <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 w-full">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} />
        ))}
      </div>
    </div>
  );
}

export default ProductListing;
