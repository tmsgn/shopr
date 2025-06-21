"use client"

import { useForm, FormProvider as RHFormProvider } from "react-hook-form"
import { ModalProvider } from "@/providers/modal-provider"
import { ToastProvider } from "@/providers/toast-provider"

type FormProviderProps = {
  children: React.ReactNode
}

export function FormProvider({ children }: FormProviderProps) {
  const methods = useForm()
  return (
    <RHFormProvider {...methods}>
      <ModalProvider />
      <ToastProvider />
      {children}
    </RHFormProvider>
  )
}
