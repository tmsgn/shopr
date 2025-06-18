import "@/app/globals.css";
import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { storeid: string };
}) {
  const { userId } = await auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const store = await prismadb.store.findFirst({
    where: {
      id: params.storeid,
      userId: userId,
    },
  });

  if (!store) {
    redirect("/");
  }

 return (
    <div className="">
      <Navbar />
      {children}
    </div>
  );
}
