import { FC, memo, useState } from 'react';
import styles from './feed.module.css';
import { OrdersList, FeedInfo, Modal } from '@components';
import { RefreshButton } from '@zlden/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../../../services/store';
import { startOrderFeed } from '../../../../services/slices/orderFeedSlice';
import { fetchOrderFullById } from '../../../../services/slices/orderDetailsFullSlice';
import { TOrder } from '../../../../utils/types';
import OrderDetailsFullUI from '../../order-details-full/order-details-full'; // Убедитесь, что путь правильный

const FeedUI: FC = memo(() => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderFeed.orders);
  const { order, isLoading } = useSelector((state) => state.orderDetailsFull);
  const { items: ingredients } = useSelector((state) => state.ingredients);

  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);

  const handleOrderClick = (order: TOrder) => {
    setSelectedOrder(order);
    dispatch(fetchOrderFullById(order.number.toString()));
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
  };

  return (
    <main className={styles.containerMain}>
      <div className={`${styles.titleBox} mt-10 mb-5`}>
        <h1 className={`${styles.title} text text_type_main-large`}>
          Лента заказов
        </h1>
        <RefreshButton
          text='Обновить'
          onClick={() => dispatch(startOrderFeed() as any)}
          extraClass={'ml-30'}
        />
      </div>
      <div className={styles.main}>
        <div className={styles.columnOrders}>
          <OrdersList orders={orders} onOrderClick={handleOrderClick} />
        </div>
        <div className={styles.columnInfo}>
          <FeedInfo />
        </div>
      </div>
      {selectedOrder && (
        <Modal
          onClose={closeOrderModal}
          title={`Заказ #${selectedOrder.number}`}
        >
          {isLoading ? (
            <p>Загрузка...</p>
          ) : (
            order && (
              <OrderDetailsFullUI order={order} ingredients={ingredients} />
            )
          )}
        </Modal>
      )}
    </main>
  );
});

export default FeedUI;
