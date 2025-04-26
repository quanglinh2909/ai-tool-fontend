import { NextPage } from 'next';
import { useState } from 'react';

import { SidebarProvider } from '../hooks/useSidebarState';
import { Order } from '@/types';
import OrderTable from '@/components/OrderTable';
import Header from '@/components/Header';
import Sidebar from '@/components/left-menu/Sidebar';

const Home: NextPage = () => {
  // Sample data
  const orders: Order[] = [
    {
      id: '6010',
      customer: {
        name: 'Jayvion Simon',
        email: 'nannie.abernathy70@yahoo.com',
        avatar: '/avatars/avatar1.png'
      },
      date: '16 Apr 2025',
      time: '7:15 pm',
      items: 6,
      price: '$484.15',
      status: 'Refunded'
    },
    {
      id: '6011',
      customer: {
        name: 'Lucian Obrien',
        email: 'ashlynn.ohara62@gmail.com',
        avatar: '/avatars/avatar2.png'
      },
      date: '15 Apr 2025',
      time: '6:15 pm',
      items: 1,
      price: '$83.74',
      status: 'Completed'
    },
    {
      id: '60110',
      customer: {
        name: 'Soren Durham',
        email: 'vergie.block82@hotmail.com',
        avatar: '/avatars/avatar3.png'
      },
      date: '06 Apr 2025',
      time: '9:15 am',
      items: 5,
      price: '$400.41',
      status: 'Pending'
    },
    {
      id: '60111',
      customer: {
        name: 'Cortez Herring',
        email: 'vito.hudson@hotmail.com',
        avatar: '/avatars/avatar4.png'
      },
      date: '05 Apr 2025',
      time: '8:15 am',
      items: 1,
      price: '$83.74',
      status: 'Completed'
    },
    {
      id: '60112',
      customer: {
        name: 'Brycen Jimenez',
        email: 'tyrel.greenholt@gmail.com',
        avatar: '/avatars/avatar5.png'
      },
      date: '04 Apr 2025',
      time: '7:15 am',
      items: 6,
      price: '$484.15',
      status: 'Refunded'
    }
  ];

  return (
    <SidebarProvider>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <div className="flex flex-col flex-1 overflow-hidden">
          {/* <Header /> */}
          <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-4">
            <OrderTable orders={orders} />
          </main>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Home;