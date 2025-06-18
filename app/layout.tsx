"use client";
import { ClerkProvider } from "@clerk/nextjs";
import { ModalProvider } from "@/providers/modal-provider";
import { ToastProvider } from "@/providers/toast-provider";
import { useForm, FormProvider } from "react-hook-form";
import "./globals.css";

type GlobalFormData = any;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const methods = useForm<GlobalFormData>();
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={` antialiased `}>
          <FormProvider {...methods}>
            <ModalProvider />
            <ToastProvider />
          </FormProvider>
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
