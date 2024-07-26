import { FC } from 'react';
import styles from './orders-list.module.css';
import { OrdersListProps } from './type';
import { OrderCard } from '../../order-card/order-card';

export const OrdersList: FC<OrdersListProps> = ({ orders, onOrderClick }) => (
  <div className={`${styles.content}`}>
    {orders.map((order) => (
      <OrderCard order={order} key={order._id} onClick={onOrderClick} />
    ))}
  </div>
);
