"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useCart } from "../../contexts/CartContext";

export default function CartButton() {
  const [isOpen, setIsOpen] = useState(false);
  const { cart, isLoading } = useCart();

  const handleToggleCart = () => setIsOpen((prev) => !prev);
  const handleCloseCart = () => setIsOpen(false);
  const handleClickOutside = () => setIsOpen(false);

  const CartItemComponent = ({ item }) => (
    <div className="flex items-center p-3 border-b border-gray-100 hover:bg-gray-50">
      {item.ImageUrl && (
        <div className="relative w-20 h-20 flex-shrink-0">
          <Image
            src={item.ImageUrl}
            alt={item.ProductName}
            fill
            sizes="80px"
            className="object-cover rounded-lg"
          />
        </div>
      )}
      <div className="flex-1 mr-4">
        <h4 className="text-sm font-semibold text-gray-800">
          {item.ProductName}
        </h4>
        <div className="flex flex-col mt-1">
          <span className="text-sm text-gray-600">الكمية: {item.Quantity}</span>
          <span className="text-sm font-medium text-blue-600">
            {item.Total.toFixed(2)} دينار
          </span>
        </div>
      </div>
    </div>
  );

  const CartContent = () => (
    <>
      <div className="divide-y divide-gray-100 max-h-[70vh] overflow-auto">
        {cart.Items.map((item) => (
          <CartItemComponent key={item.CartItemId} item={item} />
        ))}
      </div>
      <div className="p-4 bg-gray-50 mt-auto">
        <div className="flex justify-between text-lg font-bold text-gray-900 mb-4">
          <span>المجموع الكلي:</span>
          <span>{cart.TotalAmount.toFixed(2)} دينار</span>
        </div>
        <Link
          href="/cart"
          className="block w-full bg-blue-600 text-white text-center py-3 rounded-lg hover:bg-blue-700 transition-colors font-semibold"
        >
          إتمام الطلب
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
        onClick={handleToggleCart}
        className="flex items-center px-4 py-2 bg-blue-50 hover:bg-blue-100 rounded-full transition-colors relative"
        aria-label="عرض سلة التسوق"
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
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span className="mr-2 text-blue-600 font-medium">السلة</span>
        {!isLoading && cart?.TotalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 flex items-center justify-center rounded-full font-bold">
            {cart.TotalItems}
          </span>
        )}
      </button>

      {isOpen && (
        <>
          {/* Desktop Menu */}
          <div
            className="absolute left-0 mt-3 w-96 bg-white rounded-lg shadow-xl overflow-hidden z-50 hidden md:flex md:flex-col"
            onMouseLeave={handleCloseCart}
            onBlur={handleCloseCart}
          >
            <div className="p-4 bg-gray-50 border-b border-gray-100">
              <h3 className="text-lg font-bold text-gray-900">سلة التسوق</h3>
            </div>
            {isLoading ? (
              <LoadingSpinner />
            ) : cart?.Items?.length > 0 ? (
              <CartContent />
            ) : (
              <div className="text-center py-12 text-gray-500">السلة فارغة</div>
            )}
          </div>

          {/* Mobile Menu */}
          <div className="fixed inset-0 z-50 md:hidden">
            <div
              className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
              onClick={handleClickOutside}
            />
            <div
              className="fixed bottom-0 inset-x-0 bg-white rounded-t-2xl shadow-xl"
              onBlur={handleCloseCart}
            >
              <div className="flex flex-col h-[85vh]">
                <div className="p-4 border-b border-gray-100 flex justify-between items-center">
                  <h3 className="text-lg font-bold text-gray-900">
                    سلة التسوق
                  </h3>
                  <button
                    onClick={handleCloseCart}
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
                ) : cart?.Items?.length > 0 ? (
                  <CartContent />
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    السلة فارغة
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