import { Input } from "@/components/ui/input";

interface FiltersProps {
  setCategory: (value: string) => void;
  setMaxPrice: (value: string) => void;
}
function Filters({ setCategory, setMaxPrice }: FiltersProps) {
  return (
    <div className="w-64 p-4 border-r space-y-4">
      {/* Category */}
      <div>
        <h2 className="font-semibold mb-2">Category</h2>
        <select
          className="w-full border p-2 rounded"
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="">All</option>
          <option value="Mobiles">Mobiles</option>
          <option value="Cars">Cars</option>
          <option value="Bikes">Bikes</option>
        </select>
      </div>

      {/* Price */}
      <div>
        <h2 className="font-semibold mb-2">Max Price</h2>
        <Input
          type="number"
          placeholder="Enter max price"
          onChange={(e) => setMaxPrice(e.target.value)}
        />
      </div>
    </div>
  );
}

export default Filters;
