import React, { FC, memo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { RootState } from '../../services/store';
import styles from '../ui/order-card/order-card.module.css';
import {
  CurrencyIcon,
  FormattedDate
} from '@zlden/react-developer-burger-ui-components';
import { TOrder } from '../../utils/types';

export const OrderCard: FC<{ order: TOrder }> = memo(({ order }) => {
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.items
  );

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
    <Link to={`/feed/${order.number}`} className={`${styles.order} p-6 mb-4`}>
      <div className={styles.order_info}>
        <span className={`text text_type_digits-default ${styles.number}`}>
          #{String(order.number).padStart(6, '0')}
        </span>
        <span className='text text_type_main-default text_color_inactive'>
          <FormattedDate date={new Date(order.createdAt)} />
        </span>
      </div>
      <h4 className={`pt-6 text text_type_main-medium ${styles.order_name}`}>
        {order.name}
      </h4>
      <div className={`pt-6 ${styles.order_content}`}>
        <ul className={styles.ingredients}>
          {orderIngredients.slice(0, 6).map((ingredient, index) => (
            <li
              key={index}
              className={styles.img_wrap}
              style={{ zIndex: 6 - index }}
            >
              {ingredient && (
                <img
                  className={styles.img}
                  src={ingredient.image_mobile}
                  alt={ingredient.name}
                />
              )}
            </li>
          ))}
          {orderIngredients.length > 6 && (
            <li className={styles.img_wrap}>
              <span
                className={`text text_type_digits-default ${styles.remains}`}
              >
                +{orderIngredients.length - 6}
              </span>
            </li>
          )}
        </ul>
        <div>
          <span
            className={`text text_type_digits-default pr-1 ${styles.order_total}`}
          >
            {orderTotal}
          </span>
          <CurrencyIcon type='primary' />
        </div>
      </div>
    </Link>
  );
});
