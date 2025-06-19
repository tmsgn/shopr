import prismadb from "@/lib/prismadb";
import { CatagoryForm } from "./components/catagory-form";

interface CatagoryPageProps {
  params: { catagoryid: string, storeid: string };
}

const CatagoriesPage = async ({ params }: CatagoryPageProps) => {
    const catagory = await prismadb.catagory.findUnique({
        where:{
            id: params.catagoryid
        }
    })

    const billboards = await prismadb.billboard.findMany({
        where: {
            storeId: params.storeid
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    return (
        <div className="w-full">
            <div className="space-y-4 w-full p-4 pt-6">
                <CatagoryForm billboards={billboards} initialData={catagory}/>
            </div>
        </div>
    );
};

export default CatagoriesPage;
