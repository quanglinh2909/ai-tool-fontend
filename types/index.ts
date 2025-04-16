export interface Order {
    id: string;
    customer: {
      name: string;
      email: string;
      avatar: string;
    };
    date: string;
    time: string;
    items: number;
    price: string;
    status: 'Completed' | 'Refunded' | 'Pending';
  }
  
  export interface SidebarItem {
    name: string;
    icon: string;
    href: string;
    badge?: number;
  }