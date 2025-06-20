"use client";

import { useOrigin } from "@/hooks/use-origin";
import { useParams } from "next/navigation";
import { ApiAlert } from "./api-alert";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
}
export const ApiList: React.FC<ApiListProps> = ({
  entityName,
  entityIdName,
}) => {
  const parmas = useParams();
  const origin = useOrigin();

  const baseUrl = `${origin}/api/${parmas.storeid}`;
  return (
    <div className="flex flex-col gap-y-4">
      <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}`}
      />
       <ApiAlert
        title="GET"
        variant="public"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
       <ApiAlert
        title="POST"
        variant="admin"
        description={`${baseUrl}`}
      />
       <ApiAlert
        title="PATCH"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
       <ApiAlert
        title="DELETE"
        variant="admin"
        description={`${baseUrl}/${entityName}/{${entityIdName}}`}
      />
    </div>
  );
};
