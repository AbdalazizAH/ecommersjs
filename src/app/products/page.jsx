import AsyncComponent from "../components/layouts/AsyncComponent";
import ProductCard from "../components/product/ProductCard";

async function getProducts() {
  const res = await fetch("https://web-pint.vercel.app/api/v1/products/", {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch products");
  }

  return res.json();
}

function ProductGrid({ products }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard key={product.ProductID} product={product} />
      ))}
    </div>
  );
}

export default async function ProductsPage() {
  const products = await getProducts();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="py-8">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900">جميع المنتجات</h1>
            <div className="flex gap-4">
              <select className="border rounded-md px-3 py-2">
                <option value="">ترتيب حسب</option>
                <option value="price-asc">السعر: من الأقل للأعلى</option>
                <option value="price-desc">السعر: من الأعلى للأقل</option>
                <option value="name">الاسم</option>
              </select>
            </div>
          </div>

          <AsyncComponent>
            <ProductGrid products={products} />
          </AsyncComponent>
        </div>
      </main>
    </div>
  );
}
