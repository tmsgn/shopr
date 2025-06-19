import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const { userId } = await auth();

    const body = await req.json();
    const {
      name,
      price,
      catagoryId,
      sizeId,
      colorId,
      images,
      isFeatured,
      isArchived,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!price) {
      return new NextResponse("Price is required", { status: 400 });
    }
     if (!colorId) {
      return new NextResponse("Color is required", { status: 400 });
    }
    if (!sizeId) {
      return new NextResponse("Size is required", { status: 400 });
    }
    if (!catagoryId) {
      return new NextResponse("Category is required", { status: 400 });
    }

    if (!images || !Array.isArray(images) || images.length === 0) {
      return new NextResponse("At least one image is required", {
        status: 400,
      });
    }

    if (!params.storeid) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeid,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const product = await prismadb.product.create({
      data: {
        name,
        price,
        storeId: params.storeid,
        catagoryId,
        sizeId,
        colorId,
        isFeatured,
        isArchived,
        images: {
          createMany: {
            data: images.map((image: { url: string }) => ({ url: image.url }))
          }
        },
      },
    });

    return NextResponse.json(product);
  } catch (error: any) {
    console.error("[PRODUCTS_POST]", error.message, error);
    return new NextResponse(
      error?.message ? `Internal Error: ${error.message}` : "Internal Error",
      { status: 500 }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeid: string } }
) {
  try {
    const {searchParams } = new URL(req.url);
    const catagoryId = searchParams.get("catagoryId") || undefined;
    const sizeId = searchParams.get("sizeId") || undefined;
    const colorId = searchParams.get("colorId") || undefined;
    const isFeatured = searchParams.get("isFeatured") ;
    if (!params.storeid) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
      where: {
        storeId: params.storeid,
        catagoryId,
        sizeId,
        colorId,
        isFeatured: isFeatured === "true" ? true : undefined,
        isArchived: false,
      },
      include: {
        images: true,
        catagory: true,
        size: true,
        color: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(products);
  } catch (error: any) {
    console.error("[PRODUCTS_GET]", error.message, error);
    return new NextResponse(
      error?.message ? `Internal Error: ${error.message}` : "Internal Error",
      { status: 500 }
    );
  }
}
