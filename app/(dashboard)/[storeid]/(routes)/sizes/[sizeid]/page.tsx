import prismadb from "@/lib/prismadb";
import { SizeForm } from "./components/size-form";

interface SizePageProps {
  params: { sizeid: string };
}

const BillboardPage = async ({ params }: SizePageProps) => {
    const size = await prismadb.size.findUnique({
        where:{
            id: params.sizeid
        }
    })
    return (
        <div className="w-full">
            <div className="space-y-4 w-full p-4 pt-6">
                <SizeForm initialData={size}/>
            </div>
        </div>
    );
};

export default BillboardPage;
