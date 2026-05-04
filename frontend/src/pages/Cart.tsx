import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store/store";
import {
  addToCartAPI,
  getCartAPI,
  setCart,
  updateCartQuantity,
  updateCartQuantityAPI,
} from "@/redux/feactures/cartSlice";
import toast from "react-hot-toast";
import { productFetch, updateQuantity } from "@/redux/feactures/productsSlice";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigte = useNavigate();

  const dispatch = useDispatch<AppDispatch>();
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  // console.log(cartItems)

  useEffect(() => {
    dispatch(productFetch());
  }, [dispatch]);

  const products = useSelector((state: RootState) => state.products.products);

  //fetch cart
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCartAPI();
        dispatch(setCart(data));
      } catch (error) {
        console.log(error);
        toast.error((error as Error).message, { id: "login-required-toast" });
      }
    };
    fetchCart();
  }, [dispatch]);

  //remove from cart
  const handleRemove = async (productId: string, quantity: number) => {
    try {
      await updateCartQuantityAPI(productId, quantity);

      dispatch(updateQuantity({ productId, quantity }));

      dispatch(updateCartQuantity({ productId, quantity: -quantity }));

      toast.success("Item removed");
    } catch (error) {
      console.log(error);

      toast.error("Failed to remove item");
    }
  };

  //increase cart quantity
  const handleIncrease = async (productId: string, qty: number) => {
    try {
      const product = products.find((p) => p._id == productId);

      if (product?.quantity == 0) {
        toast.error(`Only ${qty} items available`);
        return;
      }

      await addToCartAPI({ productId, quantity: 1 });

      dispatch(updateCartQuantity({ productId, quantity: 1 }));

      dispatch(updateQuantity({ productId, quantity: -1 }));
    } catch (error) {
      console.log(error);
      toast.error((error as Error).message);
    }
  };

  //decrease cart quantity
  const handleDecrease = async (productId: string) => {
    try {
      await updateCartQuantityAPI(productId, 1);

      dispatch(updateQuantity({ productId, quantity: 1 }));

      dispatch(updateCartQuantity({ productId, quantity: -1 }));
    } catch (error) {
      console.log(error);
    }
  };

  // Calculate total
  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  //calculate total items
  const totalItems = cartItems.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  return (
    <div className="p-6 grid md:grid-cols-3 gap-6">
      {/* Cart Items */}
      <div className="md:col-span-2 space-y-4">
        <h1 className="text-2xl font-bold">Your Cart</h1>

        {cartItems.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cartItems.map((item) => (
            <Card key={item.productId} className="overflow-hidden">
              <CardContent className="p-4 flex gap-4 items-center">
                {/* ✅ Product Image */}
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    src={item.image} // make sure image exists in your state
                    alt={item.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                {/* ✅ Product Info */}
                <div className="flex-1">
                  <h2 className="font-semibold text-lg">{item.title}</h2>
                  <p className="text-gray-600">₹{item.price}</p>
                </div>

                {/* ✅ Quantity Controls */}
                <div className="flex items-center gap-2 border rounded px-2 py-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDecrease(item.productId)}
                  >
                    -
                  </Button>

                  <span className="w-6 text-center font-semibold">
                    {item.quantity}
                  </span>

                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() =>
                      handleIncrease(item.productId, item.quantity)
                    }
                  >
                    +
                  </Button>
                </div>

                {/* ✅ Remove Button */}
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => handleRemove(item.productId, item.quantity)}
                >
                  Remove
                </Button>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Summary */}
      <div className="border p-6 rounded-lg shadow-md h-fit sticky top-8">
        <h2 className="text-xl font-semibold mb-4">Summary</h2>

        <div className="space-y-2 text-sm">
          <p>Total Items: {totalItems}</p>
          <p className="text-lg font-bold">Total: ₹{total.toFixed(2)}</p>
        </div>

        <Button className="w-full mt-6" onClick={() => navigte("/checkout")}>
          Checkout
        </Button>
      </div>
    </div>
  );
}

export default Cart;
