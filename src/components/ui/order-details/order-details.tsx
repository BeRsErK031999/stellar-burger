import React, { FC } from 'react';
import { TOrder, TIngredient } from '../../../utils/types';
import styles from './order-details.module.css';
import doneImg from '../../../images/done.svg';
import {
  CurrencyIcon,
  FormattedDate
} from '@zlden/react-developer-burger-ui-components';

interface OrderDetailsUIProps {
  order: TOrder;
  ingredients: TIngredient[];
}

const OrderDetailsUI: FC<OrderDetailsUIProps> = ({ order, ingredients }) => {
  const orderNumber = `#${String(order.number).padStart(6, '0')}`;

  return (
    <div className={styles.orderDetails}>
      <h2 className={`${styles.title} text text_type_digits-large mt-2 mb-4`}>
        {orderNumber}
      </h2>
      <p className='text text_type_main-medium'>идентификатор заказа</p>
      <img
        className={styles.img}
        src={doneImg}
        alt='изображение статуса заказа.'
      />
      <p className='text text_type_main-default mb-1'>
        Ваш заказ начали готовить
      </p>
      <p className={`${styles.text} text text_type_main-default`}>
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
};

export default OrderDetailsUI;
