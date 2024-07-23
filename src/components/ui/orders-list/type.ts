import { TOrder } from '@utils-types';

export type OrdersListProps = {
  orders: TOrder[];
  onOrderClick: (order: TOrder) => void;
};
