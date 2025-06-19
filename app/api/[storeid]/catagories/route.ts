import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function POST(req: Request, { params }: { params: { storeid: string } }) {
  try {
    const { userId } = await auth(); 

    const body = await req.json();
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!billboardId) {
      return new NextResponse("BillboardId is required", { status: 400 });
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

    const catagory = await prismadb.catagory.create({
      data: {
        name,
        billboardId,
        storeId: params.storeid,
      },
    });

    return NextResponse.json(catagory);
  } catch (error: any) {
    console.error("[CATAGORIES_POST]", error.message, error);
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

    const catagories = await prismadb.catagory.findMany({
      where: {
        storeId: params.storeid,
      },
    });

    return NextResponse.json(catagories);
  } catch (error: any) {
    console.error("[CATAGORY_GET]", error.message, error);
    return new NextResponse(
      error?.message ? `Internal Error: ${error.message}` : "Internal Error",
      { status: 500 }
    );
  }
}
