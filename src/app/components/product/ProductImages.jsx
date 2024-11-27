"use client";
import { useState } from "react";
import Image from "next/image";

export default function ProductImages({ product }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* الصورة الرئيسية */}
      {product.images && product.images[selectedImage] && (
        <div className="relative h-96 w-full rounded-lg overflow-hidden">
          <Image
            src={product.images[selectedImage].ImageURL}
            alt={product.images[selectedImage].AltText || product.ProductName}
            fill
            className="object-cover"
          />

          {/* أزرار التنقل */}
          {product.images.length > 1 && (
            <>
              <button
                onClick={() =>
                  setSelectedImage((prev) =>
                    prev === 0 ? product.images.length - 1 : prev - 1
                  )
                }
                className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
                aria-label="الصورة السابقة"
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
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={() =>
                  setSelectedImage((prev) =>
                    prev === product.images.length - 1 ? 0 : prev + 1
                  )
                }
                className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-colors"
                aria-label="الصورة التالية"
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
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>
            </>
          )}
        </div>
      )}

      {/* الصور المصغرة */}
      {product.images?.length > 1 && (
        <div className="grid grid-cols-4 gap-2">
          {product.images.map((image, index) => (
            <button
              key={`${image.ImageID}-${index}`}
              onClick={() => setSelectedImage(index)}
              className={`relative h-20 w-full rounded-md overflow-hidden cursor-pointer transition-all ${
                selectedImage === index
                  ? "ring-2 ring-blue-500"
                  : "hover:ring-2 hover:ring-gray-300"
              }`}
            >
              <Image
                src={image.ImageURL}
                alt={image.AltText || `${product.ProductName} ${index + 1}`}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
