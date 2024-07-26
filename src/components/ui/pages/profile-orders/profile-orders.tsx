import { FC } from 'react';
import styles from './profile-orders.module.css';
import { ProfileOrdersUIProps } from './type';
import { ProfileMenu, OrdersList } from '@components';
import { TOrder } from '../../../../utils/types';

export const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({ orders }) => {
  const handleOrderClick = (order: TOrder) => {
    // Реализуйте логику открытия модального окна для заказа
    console.log(order);
  };

  return (
    <main className={`${styles.main}`}>
      <div className={`mt-30 mr-15 ${styles.menu}`}>
        <ProfileMenu />
      </div>
      <div className={`mt-10 ${styles.orders}`}>
        <OrdersList orders={orders} onOrderClick={handleOrderClick} />
      </div>
    </main>
  );
};
