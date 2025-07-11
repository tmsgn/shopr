"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { CatagoryColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface CatagoryClientProps {
  data: CatagoryColumn[];
}

export const CatagoryClient: React.FC<CatagoryClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  return (
    <>
      <div className="flex items-center justify-between mb-8">
        <Heading
          title={`Catagories (${data.length})`}
          description="Manage ctagories for your store"
        />
        <Button
          onClick={() => router.push(`/${params.storeid}/catagories/new`)}
        >
          <Plus className="mr-2 h-4 w-4" />
          Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data}/>
      <Heading title="API" description="API calls for catagories"/>
      <Separator/>
      <ApiList entityName="catagories" entityIdName="catagoriesId"/>
    </>
  );
};
