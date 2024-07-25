import React, { FC } from 'react';
import { TOrder, TIngredient } from '../../../utils/types';
import styles from './order-details-full.module.css';
import {
  CurrencyIcon,
  FormattedDate
} from '@zlden/react-developer-burger-ui-components';

interface OrderDetailsFullUIProps {
  order: TOrder;
  ingredients: TIngredient[];
}

const OrderDetailsFullUI: FC<OrderDetailsFullUIProps> = ({
  order,
  ingredients
}) => {
  const orderIngredients = order.ingredients.map((id) =>
    ingredients.find((ingredient) => ingredient._id === id)
  );

  const orderTotal = orderIngredients.reduce((sum, ingredient) => {
    if (ingredient) {
      return sum + ingredient.price;
    }
    return sum;
  }, 0);

  return (
    <div className={styles.orderDetails}>
      <h2 className={`${styles.title} text text_type_digits-large mt-2 mb-4`}>
        #{String(order.number).padStart(6, '0')}
      </h2>
      <h4 className={`text text_type_main-medium mb-6`}>{order.name}</h4>
      <p className={`text text_type_main-default mb-6 ${styles.status}`}>
        {order.status}
      </p>
      <p className='text text_type_main-medium mb-6'>Состав:</p>
      <ul className={styles.ingredientList}>
        {orderIngredients.map(
          (ingredient, index) =>
            ingredient && (
              <li key={index} className={styles.ingredient}>
                <img
                  src={ingredient.image_mobile}
                  alt={ingredient.name}
                  className={styles.ingredientImage}
                />
                <span className='text text_type_main-default ml-4'>
                  {ingredient.name}
                </span>
                <span className='text text_type_digits-default ml-4'>
                  {ingredient.price} <CurrencyIcon type='primary' />
                </span>
              </li>
            )
        )}
      </ul>
      <div className={`${styles.total} mt-10`}>
        <span className='text text_type_main-default text_color_inactive'>
          <FormattedDate date={new Date(order.createdAt)} />
        </span>
        <span
          className={`text text_type_digits-default ml-2 ${styles.totalPrice}`}
        >
          {orderTotal} <CurrencyIcon type='primary' />
        </span>
      </div>
    </div>
  );
};

export default OrderDetailsFullUI;
