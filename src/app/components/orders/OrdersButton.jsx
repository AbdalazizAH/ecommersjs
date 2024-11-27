"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { getOrders } from "../../lib/cartService";
import { useOrders } from "../../contexts/OrdersContext";

export default function OrdersButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { ordersCount, updateOrdersCount } = useOrders();
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const handleToggleOrders = () => setIsOpen((prev) => !prev);
  const handleCloseOrders = () => setIsOpen(false);
  const handleClickOutside = () => setIsOpen(false);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const ordersData = await getOrders();
        setOrders(ordersData);
        updateOrdersCount(ordersData.length);
      } catch (error) {
        console.error("Error fetching orders:", error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchOrders();
  }, [updateOrdersCount]);

  const OrderStatus = ({ status }) => {
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
        className={`text-xs px-2 py-1 rounded-full ${statusColors[status]}`}
      >
        {statusTranslations[status]}
      </span>
    );
  };

  const OrdersContent = () => (
    <>
      <div className="divide-y divide-gray-100 max-h-[70vh] overflow-auto">
        {orders.slice(0, 5).map((order) => (
          <div key={order.OrderId} className="p-4 hover:bg-gray-50">
            <div className="flex justify-between items-start mb-2">
              <div>
                <h4 className="text-sm font-semibold">
                  طلب رقم: {order.OrderNumber}
                </h4>
                <p className="text-xs text-gray-500">
                  {new Date(order.OrderDate).toLocaleDateString("ar-SA")}
                </p>
              </div>
              <OrderStatus status={order.Status} />
            </div>
            <div className="text-sm text-gray-600">
              {order.Items.length} منتجات - {order.TotalAmount.toFixed(2)} دينار
            </div>
          </div>
        ))}
      </div>
      <div className="p-4 bg-gray-50 mt-auto">
        <Link
          href="/orders"
          onClick={handleCloseOrders}
          className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          عرض جميع الطلبات
        </Link>
      </div>
    </>
  );

  const LoadingSpinner = () => (
    <div className="flex justify-center items-center p-8">
      <div className="w-8 h-8 border-3 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  return (
    <div className="relative">
      <button
        onClick={handleToggleOrders}
        className="flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors relative"
      >
        <svg
          className="w-6 h-6 text-blue-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <span className="mr-2 text-blue-600 font-medium">الطلبات</span>
        {ordersCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold">
            {ordersCount}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Desktop Menu */}
          <div
            className="absolute left-0 mt-3 w-96 bg-white rounded-lg shadow-xl overflow-hidden z-50 hidden md:flex md:flex-col"
            onMouseLeave={handleCloseOrders}
          >
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">
                الطلبات السابقة
              </h3>
            </div>
            {isLoading ? (
              <LoadingSpinner />
            ) : orders.length > 0 ? (
              <OrdersContent />
            ) : (
              <div className="text-center py-12 text-gray-500">
                لا توجد طلبات سابقة
              </div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={handleClickOutside}
            />
            <div className="fixed bottom-0 inset-x-0 bg-white rounded-t-2xl shadow-xl">
              <div className="flex flex-col h-[85vh]">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">
                    الطلبات السابقة
                  </h3>
                  <button
                    onClick={handleCloseOrders}
                    className="p-2 hover:bg-gray-100 rounded-full"
                  >
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
                {isLoading ? (
                  <LoadingSpinner />
                ) : orders.length > 0 ? (
                  <OrdersContent />
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    لا توجد طلبات سابقة
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
