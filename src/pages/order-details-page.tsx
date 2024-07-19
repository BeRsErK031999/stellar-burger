import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { fetchOrderById } from '../services/slices/orderDetailsSlice';
import { RootState } from '../services/store';
import styles from './order-details-page.module.css';
import {
  CurrencyIcon,
  FormattedDate
} from '@zlden/react-developer-burger-ui-components';

export const OrderDetailsPage: FC = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useDispatch();
  const { order, isLoading, error } = useSelector(
    (state: RootState) => state.orderDetails
  );
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.items
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchOrderById(id) as any);
    }
  }, [dispatch, id]);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!order) {
    return <p>Order not found</p>;
  }

  const orderIngredients = order.ingredients.map((id) =>
    ingredients.find((ingredient) => ingredient._id === id)
  );

  const total = orderIngredients.reduce((sum, ingredient) => {
    if (ingredient) {
      return sum + ingredient.price;
    }
    return sum;
  }, 0);

  return (
    <div className={styles.orderDetails}>
      <h2 className={`text text_type_digits-default ${styles.orderId}`}>
        #{String(order.number).padStart(6, '0')}
      </h2>
      <h3 className={`text text_type_main-medium ${styles.orderName}`}>
        {order.name}
      </h3>
      <p className={`text text_type_main-default ${styles.orderStatus}`}>
        {order.status}
      </p>
      <h4 className={`text text_type_main-medium ${styles.ingredientsTitle}`}>
        Состав:
      </h4>
      <ul className={styles.ingredientsList}>
        {orderIngredients.map((ingredient, index) => (
          <li key={index} className={styles.ingredientItem}>
            {ingredient && (
              <>
                <img
                  className={styles.ingredientImage}
                  src={ingredient.image_mobile}
                  alt={ingredient.name}
                />
                <p
                  className={`text text_type_main-default ${styles.ingredientName}`}
                >
                  {ingredient.name}
                </p>
                <p
                  className={`text text_type_digits-default ${styles.ingredientPrice}`}
                >
                  {ingredient.price} <CurrencyIcon type='primary' />
                </p>
              </>
            )}
          </li>
        ))}
      </ul>
      <div className={styles.orderInfo}>
        <span className='text text_type_main-default text_color_inactive'>
          <FormattedDate date={new Date(order.createdAt)} />
        </span>
        <span className={`text text_type_digits-default ${styles.orderTotal}`}>
          {total} <CurrencyIcon type='primary' />
        </span>
      </div>
    </div>
  );
};

export default OrderDetailsPage;
