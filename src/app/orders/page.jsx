"use client";
import { useEffect, useState } from "react";
import { getOrders } from "../lib/cartService";
import LoadingSpinner from "../components/ui/LoadingSpinner";

function OrderStatus({ status }) {
  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800 border border-yellow-200",
    PROCESSING: "bg-blue-100 text-blue-800 border border-blue-200",
    SHIPPED: "bg-green-100 text-green-800 border border-green-200",
    DELIVERED: "bg-green-100 text-green-800 border border-green-200",
    CANCELLED: "bg-red-100 text-red-800 border border-red-200",
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
      className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm ${statusColors[status]}`}
    >
      {statusTranslations[status]}
    </span>
  );
}

function OrderStatusItem({ status }) {
  const statusColors = {
    NONE: "",
    UNVILABLE: "bg-red-100 text-red-800 border border-red-200",
    AVAILABLE: "bg-green-100 text-green-800 border border-green-200",
  };

  const statusTranslations = {
    NONE: "",
    UNVILABLE: "غير متاح",
    AVAILABLE: "متاح",
  };

  return (
    <span
      className={`inline-block px-4 py-1.5 rounded-full text-sm font-medium shadow-sm backdrop-blur-sm ${statusColors[status]}`}
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
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center text-red-600 bg-red-50 p-6 rounded-xl shadow-md border border-red-200 animate-pulse">
            {error}
          </div>
        </div>
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              لا توجد طلبات
            </h1>
            <p className="text-gray-600 text-lg">لم تقم بإجراء أي طلبات بعد</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-10 text-center">
          طلباتي
        </h1>
        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order.OrderId}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-8 border border-gray-100 backdrop-blur-sm"
            >
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-800">
                    طلب رقم: {order.OrderNumber}
                  </h2>
                  <p className="text-gray-600 mt-2 text-lg">
                    {new Date(order.OrderDate).toLocaleDateString("ar-SA")}
                  </p>
                </div>
                <OrderStatus status={order.Status} />
              </div>
              <div className="border-t border-gray-100 pt-6">
                <h3 className="font-bold text-xl text-gray-800 mb-4">
                  المنتجات:
                </h3>
                <div className="space-y-4">
                  {order.Items.map((item) => (
                    <div
                      key={item.OrderItemId}
                      className="flex justify-between items-center bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200"
                    >
                      <div className="space-x-4 space-x-reverse">
                        <span className="font-semibold text-lg text-gray-800">
                          {item.ProductName}
                        </span>
                        <span className="text-gray-600 mr-2 text-lg">
                          (الكمية: {item.Quantity})
                        </span>
                        <OrderStatusItem status={item.Status} />
                      </div>
                      <span className="font-semibold text-lg text-gray-800">
                        {item.Total.toFixed(2)} دينار
                      </span>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between items-center mt-8 pt-6 border-t border-gray-100">
                  <span className="font-bold text-xl text-gray-800">
                    المجموع الكلي:
                  </span>
                  <span className="font-bold text-2xl text-gray-800">
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
