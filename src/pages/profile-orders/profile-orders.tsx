import { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../services/store';
import { fetchUserOrders } from '../../services/slices/userOrdersSlice';
import { OrdersList } from '@components';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.userOrders
  );

  useEffect(() => {
    dispatch(fetchUserOrders() as any);
  }, [dispatch]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return <OrdersList orders={orders} />;
};
