import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

export async function PATCH(
  request: Request,
  { params }: { params: {storeid: string, sizeid: string } }
) {
  try {
    const { userId } = await auth();
    const body = await request.json();
    const { name, value } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.sizeid) {
      return new NextResponse("Size ID is required", { status: 400 });
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

    const sizes = await prismadb.size.updateMany({
      where: {
        id: params.sizeid,
      },
      data: {
        name,
        value
      },
    });

    return NextResponse.json(sizes);
  } catch (error) {
    console.error("[SIZE]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: {sizeid: string, storeid: string } }
) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    if (!params.sizeid) {
      return new NextResponse("Size ID is required", { status: 400 });
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
        id: params.sizeid,
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
  { params }: { params: {sizeid: string } }
) {
  try {
    if (!params.sizeid) {
      return new NextResponse("Size ID is required", { status: 400 });
    }

    const size = await prismadb.size.findUnique({
      where: {
        id: params.sizeid,
      },
    });

    return NextResponse.json(size);
  } catch (error) {
    console.error("[BILLBOARD_GET]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
