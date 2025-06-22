import { UserButton } from "@clerk/nextjs";
import { currentUser } from "@clerk/nextjs/server";
import React from "react";
import { MainNav } from "./main-nav";
import StoreSwitcher from "./store-switcher";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

const Navbar = async () => {
  const { userId } = await auth();

  if (!userId) {
    redirect("/");
  }

  const store = await prismadb.store.findMany({
    where: {
      userId,
    },
  });

  const user = await currentUser();

  return (
    <div className="border-b w-full z-20 bg-secondary fixed">
      <div className="flex h-16 items-center  px-4">
        <StoreSwitcher items={store} />
        <div className="ml-auto flex  items-center space-x-4">
          <MainNav className="" />
          <span  className="flex items-center gap-3 border-2  rounded-4xl p-2 text-sm font-medium ">
            <UserButton afterSignOutUrl="/" />
            {user?.firstName}
          </span>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
