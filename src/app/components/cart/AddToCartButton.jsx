"use client";
import { useState } from "react";
import { addToCart } from "../../lib/cartService";
import Toast from "../ui/Toast";
import { useCart } from "../../contexts/CartContext";

export default function AddToCartButton({ product, quantity }) {
  const [isLoading, setIsLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("success");
  const { updateCart } = useCart();

  const handleAddToCart = async () => {
    try {
      setIsLoading(true);
      const newCart = await addToCart(product.ProductID, quantity);
      updateCart(newCart);
      setToastMessage("تمت إضافة المنتج إلى السلة");
      setToastType("success");
      setShowToast(true);
    } catch (error) {
      setToastMessage("حدث خطأ أثناء إضافة المنتج");
      setToastType("error");
      setShowToast(true);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleAddToCart}
        disabled={isLoading}
        className={`w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center space-x-2 space-x-reverse ${
          isLoading ? "opacity-75 cursor-not-allowed" : ""
        }`}
      >
        {isLoading ? (
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
        ) : (
          <>
            <svg
              className="w-5 h-5"
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
            <span>إضافة إلى السلة</span>
          </>
        )}
      </button>

      {showToast && (
        <Toast
          message={toastMessage}
          type={toastType}
          onClose={() => setShowToast(false)}
        />
      )}
    </>
  );
}
