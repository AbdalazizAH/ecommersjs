"use client";
import Link from "next/link";
import AsyncComponent from "../../components/layouts/AsyncComponent";
import ProductImages from "../../components/product/ProductImages";
import ProductInfo from "../../components/product/ProductInfo";

export default function ProductDetailsClient({ product }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          href="/products"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
        >
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M15 19l-7-7 7-7"
            />
          </svg>
          العودة إلى المنتجات
        </Link>

        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8">
            <AsyncComponent>
              <ProductImages product={product} />
            </AsyncComponent>

            <AsyncComponent>
              <ProductInfo product={product} />
            </AsyncComponent>
          </div>
        </div>
      </main>
    </div>
  );
}
