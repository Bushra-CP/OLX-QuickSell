import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store/store";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { checkoutAPI } from "@/redux/feactures/checkout";
import { clearCart } from "@/redux/feactures/cartSlice";
import { useNavigate } from "react-router-dom";

function Checkout() {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();

  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  // ✅ Submit handler
  const onSubmit = async () => {
    const checkoutDetails = {
      name: getValues("name"),
      phone: getValues("phone"),
      address: getValues("address"),
      city: getValues("city"),
      pincode: getValues("pincode"),
    };

    try {
      await checkoutAPI({
        ...checkoutDetails,
        items: cartItems,
        total,
      });

      dispatch(clearCart());

      toast.success("Order placed successfully");

      navigate("/");
    } catch (error) {
      console.log(error);
      toast.error("Failed to place order");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="p-6 grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
        {/* 🧾 Shipping Form */}
        <Card className="shadow-md">
          <CardHeader>
            <CardTitle className="text-xl">Shipping Details</CardTitle>
          </CardHeader>

          <CardContent className="space-y-5">
            <div>
              <Label>Name</Label>
              <Input
                placeholder="Enter your name"
                {...register("name", { required: "Enter name" })}
              />
              <p className="text-red-500 text-sm">
                {errors.name?.message?.toString()}
              </p>
            </div>

            <div>
              <Label>Phone</Label>
              <Input
                placeholder="Enter phone number"
                {...register("phone", { required: "Enter phone number" })}
              />
              <p className="text-red-500 text-sm">
                {errors.phone?.message?.toString()}
              </p>
            </div>

            <div>
              <Label>Address</Label>
              <Input
                placeholder="Enter address"
                {...register("address", { required: "Enter address" })}
              />
              <p className="text-red-500 text-sm">
                {errors.address?.message?.toString()}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>City</Label>
                <Input
                  placeholder="City"
                  {...register("city", { required: "Enter city" })}
                />
                <p className="text-red-500 text-sm">
                  {errors.city?.message?.toString()}
                </p>
              </div>

              <div>
                <Label>Pincode</Label>
                <Input
                  placeholder="Pincode"
                  {...register("pincode", { required: "Enter pincode" })}
                />
                <p className="text-red-500 text-sm">
                  {errors.pincode?.message?.toString()}
                </p>
              </div>
            </div>

            <div>
              <Label>Payment Method</Label>
              <Input value="Cash on Delivery" disabled />
            </div>
          </CardContent>
        </Card>

        {/* 🛒 Order Summary */}
        <Card className="shadow-md h-fit sticky top-6">
          <CardHeader>
            <CardTitle className="text-xl">Order Summary</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Items */}
            {cartItems.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between gap-4 border-b pb-3"
              >
                {/* Image */}
                <div className="w-16 h-16 flex-shrink-0">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <p className="text-sm font-medium line-clamp-1">
                    {item.title}
                  </p>
                  <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                </div>

                {/* Price */}
                <div className="text-sm font-semibold">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}

            {/* Total */}
            <div className="flex justify-between font-bold text-lg pt-2">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={cartItems.length === 0}
              className="w-full mt-4 bg-green-500 hover:bg-green-600 text-white"
            >
              Place Order (COD)
            </Button>
          </CardContent>
        </Card>
      </div>
    </form>
  );
}

export default Checkout;
