import { Card, CardContent } from "@/components/ui/card"

function ProductCard() {
  return (
    <Card className="cursor-pointer hover:shadow-lg transition">
      <img
        src="https://via.placeholder.com/300"
        className="w-full h-40 object-cover rounded-t"
      />

      <CardContent className="p-3">
        <h2 className="font-semibold text-lg">₹15,000</h2>
        <p className="text-sm text-gray-600">
          iPhone 11 - Good condition
        </p>
        <p className="text-xs text-gray-400 mt-2">
          Palakkad, Kerala
        </p>
      </CardContent>
    </Card>
  )
}

export default ProductCard