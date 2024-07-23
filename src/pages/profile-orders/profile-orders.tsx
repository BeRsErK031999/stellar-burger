import { FC, useEffect, useState } from 'react';
import { useDispatch, useSelector } from '../../services/store';
import { RootState } from '../../services/store';
import { fetchUserOrders } from '../../services/slices/userOrdersSlice';
import { OrdersList, Modal } from '@components';
import ProfileLayout from '../../components/profile-layout/profile-layout';
import { TOrder } from '../../utils/types';
import { OrderDetailsUI } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const { orders, loading, error } = useSelector(
    (state: RootState) => state.userOrders
  );
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.items
  );

  const [selectedOrder, setSelectedOrder] = useState<TOrder | null>(null);

  useEffect(() => {
    dispatch(fetchUserOrders() as any);
  }, [dispatch]);

  const handleOrderClick = (order: TOrder) => {
    setSelectedOrder(order);
  };

  const closeOrderModal = () => {
    setSelectedOrder(null);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <ProfileLayout>
      <OrdersList orders={orders} onOrderClick={handleOrderClick} />
      {selectedOrder && (
        <Modal onClose={closeOrderModal} title='Детали заказа'>
          <OrderDetailsUI order={selectedOrder} ingredients={ingredients} />
        </Modal>
      )}
    </ProfileLayout>
  );
};

export default ProfileOrders;
