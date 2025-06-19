"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { useState } from "react";
import { MenuIcon, X } from "lucide-react";

export function MainNav({
  className,
  ...props
}: React.HtmlHTMLAttributes<HTMLElement>) {
  const [isOpen, setIsOpen] = useState(false);
  const pathName = usePathname();
  const params = useParams();

  const routes = [
    {
      href: `/${params.storeid}`,
      label: "Overview",
      active: pathName === `/${params.storeid}`,
    },
    {
      href: `/${params.storeid}/billboards`,
      label: "Billboards",
      active: pathName === `/${params.storeid}/billboards`,
    },
    {
      href: `/${params.storeid}/catagories`,
      label: "Catagories",
      active: pathName === `/${params.storeid}/catagories`,
    },
    {
      href: `/${params.storeid}/sizes`,
      label: "Sizes",
      active: pathName === `/${params.storeid}/sizes`,
    },
    {
      href: `/${params.storeid}/colors`,
      label: "Colors",
      active: pathName === `/${params.storeid}/colors`,
    },
    {
      href: `/${params.storeid}/products`,
      label: "Products",
      active: pathName === `/${params.storeid}/products`,
    },
    {
      href: `/${params.storeid}/settings`,
      label: "Settings",
      active: pathName === `/${params.storeid}/settings`,
    },
  ];

  return (
    <div className="flex z-10 w-full items-center ">
      {/* Mobile menu button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden p-2 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 mr-2"
        aria-label="Toggle navigation"
      >
        {isOpen ? <X className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
      </button>

      {/* Desktop nav */}
      <nav
        className={cn(
          "hidden lg:flex items-center space-x-6",
          className
        )}
        {...props}
      >
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              route.active ? "text-black dark:text-white" : "text-muted-foreground"
            )}
          >
            {route.label}
          </Link>
        ))}
      </nav>

      {/* Mobile nav dropdown */}
      {isOpen && (
        <nav
          className="absolute  top-full w-full sm:w-96 right-0 rounded-lg bg-white shadow-md p-4 flex flex-col space-y-4 z-20 lg:hidden"
          {...props}
        >
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              onClick={() => setIsOpen(false)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-primary",
                route.active ? "text-black dark:text-white" : "text-muted-foreground"
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      )}
    </div>
  );
}