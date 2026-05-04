import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getUserOrdersAPI } from "@/redux/feactures/checkout";

type OrderItem = {
  productId: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
};

type Order = {
  _id: string;
  items: OrderItem[];
  total: number;
  status: string;
  createdAt: string;
};

function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const data = await getUserOrdersAPI();
        setOrders(data.orders || []); 
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return <p className="text-center mt-10">Loading orders...</p>;
  }

  if (orders.length === 0) {
    return (
      <p className="text-center mt-10 text-gray-500">
        No orders yet 🛒
      </p>
    );
  }

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Your Orders</h1>

      {orders.map((order) => (
        <Card key={order._id} className="shadow-md">
          <CardHeader>
            <div className="flex justify-between items-center">
              <CardTitle className="text-lg">
                Order ID: {order._id}
              </CardTitle>

              {/* Status */}
              <span
                className={`text-sm px-3 py-1 rounded-full 
                  ${
                    order.status === "PROCESSING"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
              >
                {order.status}
              </span>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">

            {/* Items */}
            {order.items.map((item) => (
              <div
                key={item.productId}
                className="flex items-center justify-between gap-4 border-b pb-3"
              >
                {/* Image */}
                <div className="w-16 h-16">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover rounded-md"
                  />
                </div>

                {/* Details */}
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-xs text-gray-500">
                    Qty: {item.quantity}
                  </p>
                </div>

                {/* Price */}
                <div className="font-semibold text-sm">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            ))}

            {/* Footer */}
            <div className="flex justify-between text-sm text-gray-600">
              <span>
                {new Date(order.createdAt).toLocaleDateString()}
              </span>

              <span className="font-bold text-black">
                Total: ₹{order.total}
              </span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}

export default Orders;