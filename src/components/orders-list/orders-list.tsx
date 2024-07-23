import { FC, memo } from 'react';
import { OrdersListProps } from './type';
import { OrderCard } from '../order-card/order-card';
import styles from '../ui/orders-list/orders-list.module.css';

export const OrdersList: FC<OrdersListProps> = memo(
  ({ orders, onOrderClick }) => {
    const orderByDate = [...orders].sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );

    return (
      <div className={styles.ordersList}>
        {orderByDate.map((order) => (
          <OrderCard key={order.number} order={order} onClick={onOrderClick} />
        ))}
      </div>
    );
  }
);
