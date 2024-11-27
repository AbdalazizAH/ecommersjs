import Link from "next/link";
import CartButton from "../cart/CartButton";

export default function Navbar() {
  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex space-x-8 space-x-reverse">
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

          <div className="flex items-center space-x-4 space-x-reverse">
            <CartButton />
            <Link href="/" className="text-2xl font-bold text-gray-900">
              متجرنا
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
