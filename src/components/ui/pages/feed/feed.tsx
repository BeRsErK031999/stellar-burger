import { FC, memo } from 'react';
import styles from './feed.module.css';
import { OrdersList, FeedInfo } from '@components';
import { RefreshButton } from '@zlden/react-developer-burger-ui-components';
import { useDispatch, useSelector } from '../../../../services/store';
import { startOrderFeed } from '../../../../services/slices/orderFeedSlice';
import { TOrder } from '../../../../utils/types';

const FeedUI: FC = memo(() => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orderFeed.orders);

  const handleOrderClick = (order: TOrder) => {
    // Реализуйте логику открытия модального окна для заказа
    console.log(order);
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
    </main>
  );
});

export default FeedUI;
