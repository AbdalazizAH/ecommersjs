"use client";
import { useState } from "react";
import QuantityControl from "../cart/QuantityControl";
import AddToCartButton from "../cart/AddToCartButton";

export default function ProductInfo({ product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {product.ProductName}
        </h1>
        <span className="inline-block bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm">
          {product.CategoryName}
        </span>
      </div>

      <div className="space-y-2">
        <div className="flex items-baseline">
          <span className="text-2xl font-bold text-gray-900">
            {product.SellPrice.toFixed(2)} دينار
          </span>
          {product.OldPrice && (
            <span className="mr-4 text-lg text-gray-500 line-through">
              {product.OldPrice.toFixed(2)} دينار
            </span>
          )}
        </div>
        {product.OldPrice && (
          <span className="inline-block bg-green-100 text-green-800 px-2 py-1 rounded-md text-sm">
            خصم{" "}
            {(
              ((product.OldPrice - product.SellPrice) / product.OldPrice) *
              100
            ).toFixed(0)}
            %
          </span>
        )}
      </div>

      <div>
        <h2 className="text-lg font-semibold mb-2">الوصف</h2>
        <p className="text-gray-600 leading-relaxed">{product.Description}</p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-700">الكمية:</span>
          <QuantityControl
            quantity={quantity}
            onIncrease={() => setQuantity((q) => q + 1)}
            onDecrease={() => setQuantity((q) => Math.max(1, q - 1))}
          />
        </div>

        <AddToCartButton product={product} quantity={quantity} />
      </div>
    </div>
  );
}
