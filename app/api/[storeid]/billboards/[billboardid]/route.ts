import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: {storeid: string, billboardid: string } }
) {
  try {
    const { userId } = await auth();
    const body = await request.json();
    const { lable, imageUrl } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!lable) {
      return new NextResponse("lable is required", { status: 400 });
    }

    if (!params.billboardid) {
      return new NextResponse("Billborad ID is required", { status: 400 });
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

    const billboard = await prismadb.billboard.updateMany({
      where: {
        id: params.billboardid,
      },
      data: {
        lable,
        imageUrl
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[BILLBOARD]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: {billboardid: string, storeid: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.billboardid) {
      return new NextResponse("Billboard ID is required", { status: 400 });
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

    const billboard = await prismadb.billboard.deleteMany({
      where: {
        id: params.billboardid,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[DELETE_PATCH]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


export async function GET(
  request: Request,
  { params }: { params: {billboardid: string } }
) {
  try {
    if (!params.billboardid) {
      return new NextResponse("Billboard ID is required", { status: 400 });
    }

    const billboard = await prismadb.billboard.findUnique({
      where: {
        id: params.billboardid,
      },
    });

    return NextResponse.json(billboard);
  } catch (error) {
    console.error("[BILLBOARD_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
