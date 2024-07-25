import { FC, useState } from 'react';
import { useSelector, useDispatch } from '../../services/store';
import { TOrder } from '../../utils/types';
import { FeedInfoUI } from '../ui/feed-info/feed-info';
import { fetchOrderFullById } from '../../services/slices/orderDetailsFullSlice';
import { Modal } from '@components';
import OrderDetailsFullUI from '../ui/order-details-full/order-details-full';
import styles from './feed-info.module.css';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector((state) => state.orderFeed);
  const { order, isLoading } = useSelector((state) => state.orderDetailsFull);
  const { items: ingredients } = useSelector((state) => state.ingredients); // Получаем ингредиенты из состояния

  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  const handleOrderClick = (orderNumber: string) => {
    setSelectedOrder(orderNumber);
    dispatch(fetchOrderFullById(orderNumber));
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
  };

  return (
    <>
      <FeedInfoUI
        readyOrders={readyOrders}
        pendingOrders={pendingOrders}
        feed={{ total, totalToday }}
        onOrderClick={handleOrderClick}
      />
      {selectedOrder && (
        <Modal onClose={closeOrderModal} title={`Заказ #${selectedOrder}`}>
          {isLoading ? (
            <p>Загрузка...</p>
          ) : (
            order && (
              <OrderDetailsFullUI order={order} ingredients={ingredients} />
            )
          )}
        </Modal>
      )}
    </>
  );
};

export default FeedInfo;
