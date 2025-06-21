import React from "react";
import { ProductClient } from "./components/client";
import prismadb from "@/lib/prismadb";
import { ProductColumn } from "./components/columns";
import { format } from "date-fns";
import { formatter } from "@/lib/utils";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: { storeid: string } }): Promise<Metadata> {
  const store = await prismadb.store.findUnique({
    where: {
      id: params.storeid
    }
  });

  return {
    title: `Products | ${store?.name}`,
    description: `Manage products for ${store?.name} store`
  };
}

const ProductsPage = async ({ params }: { params: { storeid: string } }) => {
  const products = await prismadb.product.findMany({
    where: {
      storeId: params.storeid,
    },
    include: {
      catagory: true,
      size: true,
      color: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedProducts: ProductColumn[] = products.map((item) => ({
    id: item.id,
    name: item.name,
    price: formatter.format(item.price.toNumber()),
    catagory: item.catagory.name,
    size: item.size?.name ?? "",
    color: item.color?.name ?? "",
    isFeatured: item.isFeatured,
    isArchived: item.isArchived,
    createdAt: format(item.createdAt, "MMMM do, yyyy"),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
