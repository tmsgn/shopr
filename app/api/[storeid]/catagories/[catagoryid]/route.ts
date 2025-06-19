import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: { storeid: string, catagoryid: string } }
) {
  try {
    const { userId } = await auth();
    const body = await request.json();
    const { name, billboardId } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status:401 });
    }

    if (!name) {
      return new NextResponse("name is required", { status:400 });
    }

    if (!billboardId) {
      return new NextResponse("billboardId is required", { status:400 });
    }

    if (!params.catagoryid) {
      return new NextResponse("Catagory ID is required", { status:400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeid,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status:403 });
    }

    const catagory = await prismadb.catagory.updateMany({
      where: {
        id: params.catagoryid,
      },
      data: {
        name,
        billboardId,
      },
    });

    return NextResponse.json(catagory);
  } catch (error) {
    console.error("[CATAGORY]", error);
    return new NextResponse("Internal Server Error", { status:500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { catagoryid: string, storeid: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status:401 });
    }

    if (!params.catagoryid) {
      return new NextResponse("Catagory ID is required", { status:400 });
    }

    const storeByUserId = await prismadb.store.findFirst({
      where: {
        id: params.storeid,
        userId,
      },
    });

    if (!storeByUserId) {
      return new NextResponse("Unauthorized", { status:403 });
    }

    const catagory = await prismadb.catagory.deleteMany({
      where: {
        id: params.catagoryid,
      },
    });

    return NextResponse.json(catagory);
  } catch (error) {
    console.error("[CATAGORY_DELETE]", error);
    return new NextResponse("Internal Server Error", { status:500 });
  }
}

export async function GET(
  request: Request,
  { params }: { params: { catagoryid: string } }
) {
  try {
    if (!params.catagoryid) {
      return new NextResponse("Catagory ID is required", { status:400 });
    }

    const catagory = await prismadb.catagory.findUnique({
      where: {
        id: params.catagoryid,
      },
    });

    return NextResponse.json(catagory);
  } catch (error) {
    console.error("[CATAGORY_GET]", error);
    return new NextResponse("Internal Server Error", { status:500 });
  }
}
