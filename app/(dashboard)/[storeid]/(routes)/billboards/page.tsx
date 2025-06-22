import React from 'react'
import { BillboardClient } from './components/client'
import prismadb from '@/lib/prismadb';
import { BillboardColumn } from './components/columns';
import { format } from 'date-fns'

export const metadata = {
  title: 'Billboards',
  description: 'Manage billboards for your store',
};

const BillboardPage = async ({
  params
}: {
  params: { storeid: string; billboardid: string; }
}) => {
  const billboard = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeid
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedBillboard: BillboardColumn[] = billboard.map((item) => ({
    id: item.id,
    lable: item.lable,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className='flex-col'>
      <div className='flex-1 space-y-4 p-8 pt-6'>
        <BillboardClient data={formattedBillboard} />
      </div>
    </div>
  )
}

export default BillboardPage