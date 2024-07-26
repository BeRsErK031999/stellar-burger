export interface FeedInfoUIProps {
  feed: {
    total: number;
    totalToday: number;
  };
  readyOrders: number[];
  pendingOrders: number[];
  onOrderClick: (orderNumber: string) => void;
}

export interface HalfColumnProps {
  orders: number[];
  title: string;
  textColor?: string;
  onOrderClick: (orderNumber: string) => void;
}

export interface TColumnProps {
  title: string;
  content: number;
}
