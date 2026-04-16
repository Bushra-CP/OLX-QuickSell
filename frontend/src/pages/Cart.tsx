import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
// import { CartItem } from "@/types/cart"

function Cart() {
  interface CartItem {
  id: number
  title: string
  price: number
  quantity: number
  image?: string
}
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      title: "iPhone 11",
      price: 15000,
      quantity: 1,
    },
    {
      id: 2,
      title: "Bike",
      price: 60000,
      quantity: 1,
    },
  ])

  // Remove item
  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id))
  }

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  )

  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">

      {/* Cart Items */}
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <Card key={item.id}>
              <CardContent className="flex justify-between items-center p-4">
                
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p>₹{item.price}</p>
                </div>

                <Button
                  variant="destructive"
                  onClick={() => removeItem(item.id)}
                >
                  Remove
                </Button>

              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="border p-4 rounded h-fit">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>

        <p>Total Items: {cartItems.length}</p>
        <p className="text-lg font-bold mt-2">Total: ₹{total}</p>

        <Button className="w-full mt-4">
          Checkout
        </Button>
      </div>

    </div>
  )
}

export default Cart