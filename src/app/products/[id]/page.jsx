import ProductDetailsClient from "./ProductDetailsClient";

async function getProduct(id) {
  const res = await fetch(`https://web-pint.vercel.app/api/v1/products/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch product");
  }

  return res.json();
}

export default async function ProductDetailsPage({ params }) {
  const resolvedParams = await Promise.resolve(params);
  const product = await getProduct(resolvedParams.id);

  return <ProductDetailsClient product={product} />;
}
