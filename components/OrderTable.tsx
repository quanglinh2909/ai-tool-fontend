import { FC } from 'react';
import { ChevronDown, MoreVertical, ChevronLeft, ChevronRight } from 'lucide-react';
import { Order } from '../types';

interface OrderTableProps {
  orders: Order[];
}

const OrderTable: FC<OrderTableProps> = ({ orders }) => {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="flex items-center px-6 py-4">
        <div className="flex items-center space-x-4">
          <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded" />
          <div className="flex items-center space-x-2">
            <span className="font-medium">Order</span>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 4V12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              <path d="M4 8L8 4L12 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
        
        <div className="flex items-center space-x-16 ml-8">
          <span className="text-gray-500">Customer</span>
          <span className="text-gray-500">Date</span>
          <span className="text-gray-500">Items</span>
          <span className="text-gray-500">Price</span>
          <span className="text-gray-500">Status</span>
        </div>
      </div>
      
      <div className="divide-y divide-gray-200">
        {orders.map((order) => (
          <div key={order.id} className="px-6 py-4">
            <div className="flex items-center">
              <input type="checkbox" className="w-4 h-4 text-blue-600 border-gray-300 rounded mr-4" />
              
              <div className="flex items-center w-32">
                <span className="text-blue-600">#{order.id}</span>
              </div>
              
              <div className="flex items-center w-64">
                <img src="/api/placeholder/32/32" alt={order.customer.name} className="w-8 h-8 rounded-full mr-3" />
                <div>
                  <div className="font-medium">{order.customer.name}</div>
                  <div className="text-sm text-gray-500">{order.customer.email}</div>
                </div>
              </div>
              
              <div className="w-40">
                <div>{order.date}</div>
                <div className="text-sm text-gray-500">{order.time}</div>
              </div>
              
              <div className="w-20 text-center">{order.items}</div>
              
              <div className="w-32">{order.price}</div>
              
              <div className="w-32">
                <span 
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === 'Completed' ? 'bg-green-100 text-green-800' : 
                    order.status === 'Refunded' ? 'bg-gray-100 text-gray-800' : 
                    'bg-yellow-100 text-yellow-800'
                  }`}
                >
                  {order.status}
                </span>
              </div>
              
              <div className="flex items-center ml-auto">
                <button className="text-gray-400 hover:text-gray-500">
                  <ChevronDown size={20} />
                </button>
                <button className="ml-2 text-gray-400 hover:text-gray-500">
                  <MoreVertical size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="px-6 py-4 bg-white border-t border-gray-200 flex items-center justify-between">
        <div className="flex items-center">
          <div className="flex items-center space-x-2 mr-4">
            <input type="checkbox" className="w-4 h-4" id="dense" />
            <label htmlFor="dense">Dense</label>
          </div>
          <div className="flex items-center space-x-2">
            <span>Rows per page:</span>
            <button className="flex items-center space-x-1 bg-white border border-gray-300 rounded px-2 py-1">
              <span>5</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-500">1-5 of 20</span>
          <div className="flex">
            <button className="p-1 rounded-l border border-gray-300">
              <ChevronLeft size={16} />
            </button>
            <button className="p-1 rounded-r border border-gray-300 border-l-0">
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTable;