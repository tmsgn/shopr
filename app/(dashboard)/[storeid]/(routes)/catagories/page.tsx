
import React from 'react'
import { CatagoryClient } from './components/client'
import prismadb from '@/lib/prismadb';
import {  CatagoryColumn } from './components/columns';
import {format} from 'date-fns'

const CatagoriesPage = async ({
  params
}: {
  params: { storeid: string; billboardid: string; }
}) => {
  const catagories = await prismadb.catagory.findMany({
    where: {
      storeId: params.storeid
    },
    include: {
      billboard: true
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedCatagories : CatagoryColumn[] = catagories.map((item) => ({
    id: item.id,
    name: item.name,
    billbooardLable: item.billboard.lable,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <CatagoryClient data={formattedCatagories}/>
        </div>
    </div>
  )
}

export default CatagoriesPage