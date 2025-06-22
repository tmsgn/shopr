
import React from 'react'
import { OrderClient } from './components/client';
import prismadb from '@/lib/prismadb';
import { OrderColumn } from './components/columns';
import {format} from 'date-fns'
import { formatter } from '@/lib/utils';

export const metadata = {
  title: 'Orders',
  description: 'Manage orders for your store',
};


const OrdersPage = async ({
  params
}: {
  params: { storeid: string; billboardid: string; }
}) => {
  const orders = await prismadb.order.findMany({
    where: {
      storeId: params.storeid
    },
    include: {
      orderItems: {
        include: {
          product: true,
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  const formattedOrders : OrderColumn[] = orders.map((item) => ({
    id: item.id,
    phone: item.phone,
    address: item.address,
    produts: item.orderItems.map((orderItem)=> orderItem.product.name).join(', '),
    totalPrice: formatter.format(item.orderItems.reduce((total, orderItem) => {
      return total + Number(orderItem.product.price)
    }, 0)),
    isPaid: item.isPaid,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }))

  return (
    <div className='flex-col'>
        <div className='flex-1 space-y-4 p-8 pt-6'>
            <OrderClient data={formattedOrders}/>
        </div>
    </div>
  )
}

export default OrdersPage