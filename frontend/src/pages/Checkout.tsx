import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
// import { CartItem } from "@/types/cart"

function Checkout() {
    interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  image?: string
}
  const [cartItems] = useState<CartItem[]>([
    { id: 1, title: "iPhone 11", price: 15000, quantity: 1 },
    { id: 2, title: "Bike", price: 60000, quantity: 1 },
  ])

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  const handleOrder = () => {
    alert("Order placed successfully (Cash on Delivery)")
  }

  return (
    <div className="p-6 grid md:grid-cols-2 gap-6">

      {/* Shipping Form */}
      <Card>
        <CardHeader>
          <CardTitle>Shipping Details</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          <div>
            <Label>Full Name</Label>
            <Input placeholder="Enter your name" />
          </div>

          <div>
            <Label>Phone</Label>
            <Input placeholder="Enter phone number" />
          </div>

          <div>
            <Label>Address</Label>
            <Input placeholder="Enter address" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>City</Label>
              <Input placeholder="City" />
            </div>

            <div>
              <Label>Pincode</Label>
              <Input placeholder="Pincode" />
            </div>
          </div>

          <div>
            <Label>Payment Method</Label>
            <Input value="Cash on Delivery" disabled />
          </div>

        </CardContent>
      </Card>

      {/* Order Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Order Summary</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">

          {cartItems.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>{item.title}</span>
              <span>₹{item.price}</span>
            </div>
          ))}

          <hr />

          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total}</span>
          </div>

          <Button
            className="w-full mt-4 bg-green-500 hover:bg-green-600"
            onClick={handleOrder}
          >
            Place Order (COD)
          </Button>

        </CardContent>
      </Card>

    </div>
  )
}

export default Checkout