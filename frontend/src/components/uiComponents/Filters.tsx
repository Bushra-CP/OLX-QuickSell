import { Input } from "@/components/ui/input";

interface FiltersProps {
  category: string[];
  setCategory: (value: string[]) => void;
  minPrice: string;
  setMinPrice: (value: string) => void;
  maxPrice: string;
  setMaxPrice: (value: string) => void;
  categoryList: string[];
}

function Filters({
  category,
  setCategory,
  minPrice,
  setMinPrice,
  maxPrice,
  setMaxPrice,
  categoryList,
}: FiltersProps) {
  const handleCategoryChange = (cat: string) => {
    if (category.includes(cat)) {
      // remove
      setCategory(category.filter((c) => c !== cat));
    } else {
      // add
      setCategory([...category, cat]);
    }
  };

  return (
    <div className="w-64 p-4 border-r space-y-6">
      {/* Category */}
      <div>
        <h2 className="font-semibold mb-3">Category</h2>

        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
          {categoryList.map((cat) => (
            <label key={cat} className="flex items-center gap-2 text-sm">
              <input
                type="checkbox"
                checked={category.includes(cat)}
                onChange={() => handleCategoryChange(cat)}
                className="accent-black"
              />
              {cat}
            </label>
          ))}
        </div>
      </div>

      {/* Price Range */}
      <div>
        <h2 className="font-semibold mb-2">Price Range</h2>

        <div className="flex gap-2">
          <Input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
}

export default Filters;
