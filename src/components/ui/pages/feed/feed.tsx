import { FC, memo, useEffect } from 'react';
import styles from './feed.module.css';
import { OrdersList, FeedInfo } from '@components';
import { RefreshButton } from '@zlden/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../services/store';
import {
  startOrderFeed,
  stopOrderFeed
} from '../../../../services/slices/orderFeedSlice';

const FeedUI: FC = memo(() => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orderFeed.orders);

  useEffect(() => {
    dispatch(startOrderFeed() as any);
    return () => {
      dispatch(stopOrderFeed() as any);
    };
  }, [dispatch]);

  useEffect(() => {
    console.log('Orders:', orders);
  }, [orders]);

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
          <OrdersList orders={orders} />
        </div>
        <div className={styles.columnInfo}>
          <FeedInfo />
        </div>
      </div>
    </main>
  );
});

export default FeedUI;
