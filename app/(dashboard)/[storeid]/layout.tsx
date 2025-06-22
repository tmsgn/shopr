import "@/app/globals.css";
import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
  description: "Manage your store",
};

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
    <div className="min-h-screen w-full overflow-x-hidden ">
      <Navbar />
      <div className="pt-16 ">{children}</div>
    </div>
  );
}
