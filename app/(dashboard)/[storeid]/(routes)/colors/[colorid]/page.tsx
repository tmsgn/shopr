import prismadb from "@/lib/prismadb";
import { ColorForm } from "./components/color-form";
interface SizePageProps {
  params: { colorid: string };
}

const ColorPage = async ({ params }: SizePageProps) => {
    const color = await prismadb.color.findUnique({
        where:{
            id: params.colorid
        }
    })
    return (
        <div className="w-full">
            <div className="space-y-4 w-full p-4 pt-6">
                <ColorForm initialData={color}/>
            </div>
        </div>
    );
};

export default ColorPage;
