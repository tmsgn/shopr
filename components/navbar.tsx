import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { MainNav } from './main-nav'
import StoreSwitcher from './store-switcher'
import { redirect } from 'next/navigation'
import { auth } from '@clerk/nextjs/server'
import prismadb from '@/lib/prismadb'

const Navbar = async () => {
    const { userId } = await auth();

    if(!userId){
        redirect('/')
    }

    const store = await prismadb.store.findMany({
        where: {
            userId
        }
    })
  return (
    <div className='border-b '>
        <div className='flex h-16 items-center  px-4'>
           <StoreSwitcher items={store}/>
           
            <div className='ml-auto flex  items-center space-x-4'>
                 <MainNav className=''/>
                <UserButton afterSignOutUrl='/'/>
            </div>
        </div>
    </div>
  )
}

export default Navbar