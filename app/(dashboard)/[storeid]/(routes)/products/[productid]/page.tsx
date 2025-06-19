import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";

interface ProductPageProps {
  params: { productid: string; storeid: string };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const product = await prismadb.product.findUnique({
    where: {
      id: params.productid,
    },
    include: {
      images: true,
    },
  });

  const catagories = await prismadb.catagory.findMany({
    where: {
      storeId: params.storeid,
    },
  });
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeid,
    },
  });
  const colors = await prismadb.color.findMany({
    where: {
      storeId: params.storeid,
    },
  });

  return (
    <div className="w-full">
      <div className="space-y-4 w-full p-4 pt-6">
        <ProductForm
          catagories={catagories}
          colors={colors}
          sizes={sizes}
          initialData={product}
        />
      </div>
    </div>
  );
};

export default ProductPage;
