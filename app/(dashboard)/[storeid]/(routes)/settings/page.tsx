import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server"
import { redirect } from "next/navigation";
import { SettingsForm } from "./components/settings-form";


export const metadata = {
  title: 'Settings',
  description: 'settings for your store',
};


interface SettingsPageProps {
    params: {
        storeid: string
    }
}
const SettingsPage: React.FC<SettingsPageProps> = async ({
    params
}) => {

    const {userId} = await auth();

    if(!userId){
        redirect('/sign-in')
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeid,
            userId: userId
        }
    })

    if(!store){
        redirect('/')
    }
  return (
    <div className="flex-col">
        <div className="flex-1 space-y-4 p-8 pt-6">
            <SettingsForm initialData={store}/>
        </div>
    </div>
  )
}

export default SettingsPage