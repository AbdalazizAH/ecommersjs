"use client";
import { useState } from "react";
import Link from "next/link";
import CartButton from "../cart/CartButton";
import OrdersButton from "../orders/OrdersButton";

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo - Always visible */}
          <Link href="/" className="text-2xl font-bold text-gray-900 md:hidden">
            متجرنا
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:space-x-8 md:space-x-reverse">
            <Link href="/" className="text-gray-700 hover:text-gray-900">
              الرئيسية
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-gray-900"
            >
              المنتجات
            </Link>
          </div>

          {/* Desktop Logo and Cart/Orders */}
          <div className="hidden md:flex md:items-center md:space-x-4 md:space-x-reverse">
            <div className="flex items-center space-x-2 space-x-reverse">
              <CartButton />
              <OrdersButton />
            </div>
            <Link href="/" className="text-2xl font-bold text-gray-900">
              متجرنا
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center md:hidden">
            <div className="flex items-center space-x-2 space-x-reverse">
              <CartButton />
              <OrdersButton />
            </div>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 mr-2"
            >
              <span className="sr-only">فتح القائمة الرئيسية</span>
              {!isMobileMenuOpen ? (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              ) : (
                <svg
                  className="block h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`${
          isMobileMenuOpen ? "block" : "hidden"
        } md:hidden border-t border-gray-200`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            الرئيسية
          </Link>
          <Link
            href="/products"
            className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
          >
            المنتجات
          </Link>
        </div>
      </div>
    </nav>
  );
}
