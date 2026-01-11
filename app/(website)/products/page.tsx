import { Metadata } from "next";
import ProductGrid from "@/components/products/ProductGrid";
import { getMenus } from "@/lib/fetch";
import PageHeader from "@/components/PageHeader";

export const metadata: Metadata = {
  title: "Our Premium Soft Cookies | Dookiee.s",
  description:
    "Explore our collection of handcrafted soft cookies, baked fresh daily with organic ingredients.",
};

async function getProductsWrapper(page: number = 1, limit: number = 12) {
  const allProducts = await getMenus();
  const total = allProducts.length;
  const totalPages = Math.ceil(total / limit);
  const start = (page - 1) * limit;
  const end = start + limit;

  return {
    data: allProducts.slice(start, end),
    pagination: {
      page: page,
      total_pages: totalPages,
      total_items: total,
      limit: limit,
    },
  };
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { page?: string };
}) {
  const page = Number(searchParams.page) || 1;
  const { data, pagination } = await getProductsWrapper(page);

  return (
    <div className="bg-brand-cream/10 min-h-screen">
      <PageHeader
        title="Our Collection"
        subtitle="Baked with passion, served with love"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Menu" }]}
      />

      <main className="container mx-auto px-4 py-16">
        <ProductGrid initialData={data} initialPagination={pagination} />
      </main>
    </div>
  );
}
