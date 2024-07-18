import { FC, memo, useEffect } from 'react';
import styles from './feed.module.css';
import { FeedUIProps } from './type';
import { OrdersList, FeedInfo } from '@components';
import { RefreshButton } from '@zlden/react-developer-burger-ui-components';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../../../services/store';
import {
  startOrderFeed,
  stopOrderFeed
} from '../../../../services/slices/orderFeedSlice';

export const FeedUI: FC<FeedUIProps> = memo(({ handleGetFeeds }) => {
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orderFeed.orders);

  useEffect(() => {
    dispatch(startOrderFeed() as any);
    return () => {
      dispatch(stopOrderFeed() as any);
    };
  }, [dispatch]);

  return (
    <main className={styles.containerMain}>
      <div className={`${styles.titleBox} mt-10 mb-5`}>
        <h1 className={`${styles.title} text text_type_main-large`}>
          Лента заказов
        </h1>
        <RefreshButton
          text='Обновить'
          onClick={handleGetFeeds}
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
