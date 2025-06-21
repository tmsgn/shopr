import type { Metadata } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import { FormProvider } from "@/components/form-provider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Shopr - E-commerce Dashboard",
  description: "Manage your e-commerce store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={` antialiased `}>
          <FormProvider>
            {children}
          </FormProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
