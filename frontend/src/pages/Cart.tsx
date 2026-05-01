import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store/store";
import {
  getCartAPI,
  removeFromCart,
  removeFromCartAPI,
  setCart,
  updateCartAPI,
  updateQuantity,
} from "@/redux/feactures/cartSlice";
// import { CartItem } from "@/types/cart"

function Cart() {
  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);

  //fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCartAPI();
        dispatch(setCart(data));
      } catch (error) {
        console.log(error);
      }
    };
    fetchCart();
  }, [dispatch]);



  //remove from cart
  const handleRemove = async (productId: string) => {
    dispatch(removeFromCart(productId));

    try {
      await removeFromCartAPI(productId);
    } catch (error) {
      console.log(error);
    }
  };

  //handle quantity increase
  const handleIncrease = async (productId: string) => {
    dispatch(updateQuantity({ productId, quantity: 1 }));

    try {
      await updateCartAPI(productId, 1);
    } catch (error) {
      console.log(error);
    }
  };

  //handle quantity decrease
  const handleDecrease = async (productId: string, quantity: number) => {
    dispatch(updateQuantity({ productId, quantity: -1 }));

    try {
      if (quantity - 1 <= 0) {
        await removeFromCartAPI(productId);
      } else {
        await updateCartAPI(productId, -1);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">
      {/* Cart Items */}
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <Card key={item.productId}>
              <CardContent className="flex justify-between items-center p-4">
                <div>
                  <h2 className="font-semibold">{item.title}</h2>
                  <p>₹{item.price}</p>
                </div>

                {/* 🔥 Quantity Controls */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    onClick={() =>
                      handleDecrease(item.productId, item.quantity)
                    }
                  >
                    -
                  </Button>

                  <span className="font-semibold">{item.quantity}</span>

                  <Button
                    variant="outline"
                    onClick={() => handleIncrease(item.productId)}
                  >
                    +
                  </Button>
                </div>

                {/* Remove Button */}
                <Button
                  variant="destructive"
                  onClick={() => handleRemove(item.productId)}
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

        <Button className="w-full mt-4">Checkout</Button>
      </div>
    </div>
  );
}

export default Cart;
