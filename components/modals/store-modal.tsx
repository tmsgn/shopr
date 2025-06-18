"use client";

import { useStoreModal } from "@/hooks/use-store-modal";
import { Modal } from "../ui/modal";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
    name: z.string().min(1, { message: "Store name is required." })
});

export const StoreModal = () => {
  const storeModal = useStoreModal();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
        name: ''
    }
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);

      const response = await axios.post('/api/stores', values)

      window.location.assign(`/${response.data.id}`);

     
      console.log("Store created:", values.name);
      storeModal.onClose();
    } catch (error) {
      console.error("Failed to create store:", error);
      toast.error("Failed to create store. Please try again.");
     
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Create Store"
      description="Add a new store to manage products and categories."
      isOpen={storeModal.isOpen}
      onClose={storeModal.onClose}
    >
      <div className="space-y-4 py-2 pb-4">
        <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                            <Input
                                disabled={isLoading}
                                placeholder="E-Commerce Store"
                                {...field}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button
                    disabled={isLoading}
                    type="button"
                    onClick={storeModal.onClose}
                    variant={"outline"}
                >
                    Cancel
                </Button>
                <Button
                    disabled={isLoading}
                    type="submit"
                >
                    {isLoading ? "Creating..." : "Continue"}
                </Button>
            </div>
        </form>
      </div>
    </Modal>
  );
};
