import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import {
  fetchOrders,
  startOrderFeed,
  stopOrderFeed
} from '../../services/slices/orderFeedSlice';
import { TOrder } from '@utils-types';
import { FeedInfoUI } from '../ui/feed-info/feed-info'; // Убедитесь, что используете именованный импорт
import styles from './feed-info.module.css';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () => {
  const dispatch = useDispatch();
  const { orders, total, totalToday } = useSelector(
    (state: RootState) => state.orderFeed
  );

  useEffect(() => {
    dispatch(startOrderFeed() as any);
    return () => {
      dispatch(stopOrderFeed() as any);
    };
  }, [dispatch]);

  const readyOrders = getOrders(orders, 'done');
  const pendingOrders = getOrders(orders, 'pending');

  return (
    <FeedInfoUI
      readyOrders={readyOrders}
      pendingOrders={pendingOrders}
      feed={{ total, totalToday }}
    />
  );
};

export default FeedInfo;
