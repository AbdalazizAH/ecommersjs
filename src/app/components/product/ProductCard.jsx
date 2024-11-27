import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "../cart/AddToCartButton";
export default function ProductCard({ product }) {
  return (
    <div>
      <Link href={`/products/${product.ProductID}`}>
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1">
          {product.images && product.images[0] && (
            <div className="relative h-64 w-full group">
              <Image
                src={product.images[0].ImageURL}
                alt={product.images[0].AltText || product.ProductName}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
            </div>
          )}

          <div className="p-4">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">
              {product.ProductName}
            </h2>
            <p className="text-sm text-gray-600 mb-2 line-clamp-2">
              {product.Description}
            </p>
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-lg font-bold text-gray-900">
                  {product.SellPrice.toFixed(2)} دينار
                </span>
                {product.OldPrice && (
                  <span className="text-sm text-gray-500 line-through">
                    {product.OldPrice.toFixed(2)} دينار
                  </span>
                )}
              </div>
              <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                {product.CategoryName}
              </span>
            </div>
          </div>
        </div>
      </Link>
      <AddToCartButton product={product} quantity={1} />
    </div>
  );
}
