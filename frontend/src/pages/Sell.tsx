import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"

function Sell() {
  const [image, setImage] = useState<File | null>(null)

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl text-center">
            Post Your Ad
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          {/* Title */}
          <div>
            <Label>Title</Label>
            <Input placeholder="Enter product title" />
          </div>

          {/* Description */}
          <div>
            <Label>Description</Label>
            <Textarea placeholder="Describe your product" />
          </div>

          {/* Price */}
          <div>
            <Label>Price</Label>
            <Input type="number" placeholder="Enter price" />
          </div>

          {/* Category */}
          <div>
            <Label>Category</Label>
            <select className="w-full border rounded-md p-2">
              <option>Cars</option>
              <option>Mobiles</option>
              <option>Bikes</option>
              <option>Electronics</option>
            </select>
          </div>

          {/* Image Upload */}
          <div>
            <Label>Upload Image</Label>
            <Input
              type="file"
              onChange={(e) => {
                if (e.target.files) {
                  setImage(e.target.files[0])
                }
              }}
            />

            {/* Preview */}
            {image && (
              <img
                src={URL.createObjectURL(image)}
                className="mt-3 w-full h-40 object-cover rounded"
              />
            )}
          </div>

          {/* Submit */}
          <Button className="w-full bg-green-500 hover:bg-green-600">
            Post Ad
          </Button>

        </CardContent>
      </Card>
    </div>
  )
}

export default Sell