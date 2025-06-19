import prismadb from "@/lib/prismadb";
import { BillboardForm } from "./components/billboard-form";

interface BillboardPageProps {
  params: { billboardid: string };
}

const BillboardPage = async ({ params }: BillboardPageProps) => {
    const billboard = await prismadb.billboard.findUnique({
        where:{
            id: params.billboardid
        }
    })
    return (
        <div className="w-full">
            <div className="space-y-4 w-full p-4 pt-6">
                <BillboardForm initialData={billboard}/>
            </div>
        </div>
    );
};

export default BillboardPage;
