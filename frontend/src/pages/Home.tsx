import ProductCard from "@/components/uiComponents/ProductCard";

function Home() {
  return (
    <>
      {/* Product Grid */}
      <div className="p-6 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, index) => (
          <ProductCard key={index} />
        ))}
      </div>
    </>
  );
}

export default Home;
