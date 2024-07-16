import React, { FC, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './burger-ingredient.module.css';

import {
  Counter,
  CurrencyIcon,
  AddButton
} from '@zlden/react-developer-burger-ui-components';

import { TBurgerIngredientUIProps } from './type';
import { useDispatch } from '../../../services/store';
import { setSelectedIngredient } from '../../../services/slices/ingredientsSlice';
import { addIngredient } from '../../../services/slices/orderSlice';

export const BurgerIngredientUI: FC<TBurgerIngredientUIProps> = memo(
  ({ ingredient, count, handleAdd }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { image, price, name, _id } = ingredient;

    const handleImageClick = () => {
      dispatch(setSelectedIngredient(ingredient));
    };

    const handleAddToOrder = (
      e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ) => {
      e.stopPropagation(); // предотвращает переход по ссылке
      dispatch(addIngredient(ingredient));
    };

    return (
      <li className={styles.container}>
        <Link
          className={styles.article}
          to={`/ingredients/${_id}`}
          state={{ background: location }}
          onClick={handleImageClick}
        >
          {count && <Counter count={count} />}
          <img className={styles.img} src={image} alt='картинка ингредиента.' />
        </Link>
        <div className={`${styles.cost} mt-2 mb-2`}>
          <p className='text text_type_digits-default mr-2'>{price}</p>
          <CurrencyIcon type='primary' />
        </div>
        <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
        <AddButton
          text='Добавить'
          onClick={handleAddToOrder as any}
          extraClass={`${styles.addButton} mt-8`}
        />
      </li>
    );
  }
);
