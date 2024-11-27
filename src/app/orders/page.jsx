"use client";
import { useEffect, useState } from "react";
import { getOrders } from "../lib/cartService";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function OrderStatus({ status }) {
  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    PROCESSING: "bg-blue-100 text-blue-800",
    SHIPPED: "bg-green-100 text-green-800",
    DELIVERED: "bg-green-100 text-green-800",
    CANCELLED: "bg-red-100 text-red-800",
  };

  const statusTranslations = {
    PENDING: "قيد الانتظار",
    PROCESSING: "قيد المعالجة",
    SHIPPED: "تم الشحن",
    DELIVERED: "تم التوصيل",
    CANCELLED: "ملغي",
  };

  return (
    <span
      className={`inline-block px-3 py-1 rounded-full text-sm ${statusColors[status]}`}
    >
      {statusTranslations[status]}
    </span>
  );
}

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const data = await getOrders();
        setOrders(data);
      } catch (err) {
        setError("حدث خطأ أثناء تحميل الطلبات");
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, []);

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600">{error}</div>
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              لا توجد طلبات
            </h1>
            <p className="text-gray-600">لم تقم بإجراء أي طلبات بعد</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">طلباتي</h1>
        <div className="space-y-6">
          {orders.map((order) => (
            <div key={order.OrderId} className="bg-white rounded-lg shadow p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    طلب رقم: {order.OrderNumber}
                  </h2>
                  <p className="text-gray-600">
                    {new Date(order.OrderDate).toLocaleDateString("ar-SA")}
                  </p>
                </div>
                <OrderStatus status={order.Status} />
              </div>
              <div className="border-t pt-4">
                <h3 className="font-semibold mb-2">المنتجات:</h3>
                <div className="space-y-2">
                  {order.Items.map((item) => (
                    <div
                      key={item.OrderItemId}
                      className="flex justify-between items-center"
                    >
                      <div>
                        <span className="font-medium">{item.ProductName}</span>
                        <span className="text-gray-600 mr-2">
                          (الكمية: {item.Quantity})
                        </span>
                      </div>
                      <span className="font-medium">
                        {item.Total.toFixed(2)} دينار
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-4 pt-4 border-t">
                  <span className="font-bold">المجموع الكلي:</span>
                  <span className="font-bold text-lg">
                    {order.TotalAmount.toFixed(2)} دينار
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
