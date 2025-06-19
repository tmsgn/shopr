import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
export default async function SetupLayout({
    children
}:{
    children: React.ReactNode
}){
    const {userId} = await auth();

    if(!userId){
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId: userId
        }
    });

    if(store){
        redirect(`/${store.id}`)
    }

    return(
        <div className="min-h-screen w-full overflow-x-hidden">
            {children}
        </div>
    )

}