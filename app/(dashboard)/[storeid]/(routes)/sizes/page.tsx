
import React from 'react'
import { SizeClient } from './components/client'
import prismadb from '@/lib/prismadb';
import { SizeColumn } from './components/columns';
import {format} from 'date-fns'

export const metadata = {
  title: 'Sizes',
  description: 'Manage sizes for your store',
};


const SizesPage = async ({
  params
}: {
  params: { storeid: string; sizeid: string; }
}) => {
  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeid
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedSizes : SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <SizeClient data={formattedSizes}/>
        </div>
    </div>
  )
}

export default SizesPage