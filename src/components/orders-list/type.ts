import { TOrder } from '../../utils/types';

export interface OrdersListProps {
  orders: TOrder[];
  onOrderClick: (order: TOrder) => void;
}
