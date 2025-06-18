import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { storeid: string } }) {
  try {
    const { userId } = await auth(); 

    const body = await req.json();
    const { lable, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!lable) {
      return new NextResponse("Label is required", { status: 400 });
    }

    if (!imageUrl) {
      return new NextResponse("Image is required", { status: 400 });
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

    const store = await prismadb.billboard.create({
      data: {
        lable,
        imageUrl,
        storeId: params.storeid,
      },
    });

    return NextResponse.json(store);
  } catch (error: any) {
    console.error("[STORES_POST]", error.message, error);
    return new NextResponse(
      error?.message ? `Internal Error: ${error.message}` : "Internal Error",
      { status: 500 }
    );
  }
}
export async function GET(req: Request, { params }: { params: { storeid: string } }) {
  try {
    if (!params.storeid) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const billboards = await prismadb.billboard.findMany({
      where: {
        storeId: params.storeid,
      },
    });

    return NextResponse.json(billboards);
  } catch (error: any) {
    console.error("[BILLBOARDS_GET]", error.message, error);
    return new NextResponse(
      error?.message ? `Internal Error: ${error.message}` : "Internal Error",
      { status: 500 }
    );
  }
}
