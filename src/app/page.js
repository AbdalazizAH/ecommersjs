import Image from "next/image";
import Link from "next/link";
import AsyncComponent from "./components/layouts/AsyncComponent";

async function getProducts() {
  const res = await fetch('https://web-pint.vercel.app/api/v1/products/', {
    cache: 'no-store'
  });

  if (!res.ok) {
    throw new Error('Failed to fetch products');
  }

  return res.json();
}

function FeaturedProductCard({ product }) {
  return (
    <Link href={`/products/${product.ProductID}`} className="group">
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-all duration-300">
        {product.images && product.images[0] && (
          <div className="relative h-64 w-full">
            <Image
              src={product.images[0].ImageURL}
              alt={product.images[0].AltText || product.ProductName}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        )}

        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {product.ProductName}
          </h3>
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
  );
}

export default async function Home() {
  const allProducts = await getProducts();
  const featuredProducts = allProducts.slice(0, 4);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[70vh] bg-gray-900 flex items-center">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
          <h1 className="text-5xl font-bold mb-4">مرحباً بكم في متجرنا</h1>
          <p className="text-xl mb-8">اكتشف منتجات رائعة بأسعار مميزة</p>
          <Link
            href="/products"
            className="bg-white text-gray-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            تسوق الآن
          </Link>
        </div>
      </section>

      {/* Featured Products Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900">المنتجات المميزة</h2>
          <Link
            href="/products"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            عرض الكل ←
          </Link>
        </div>

        <AsyncComponent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <FeaturedProductCard key={product.ProductID} product={product} />
            ))}
          </div>
        </AsyncComponent>
      </section>

      {/* Features Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">منتجات عالية الجودة</h3>
              <p className="text-gray-600">نضمن أعلى جودة لجميع منتجاتنا</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">توصيل سريع</h3>
              <p className="text-gray-600">شحن سريع وموثوق إلى باب منزلك</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">تسوق آمن</h3>
              <p className="text-gray-600">معالجة آمنة وموثوقة للمدفوعات</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
