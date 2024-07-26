import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector, RootState } from '../../services/store';
import { setSelectedIngredient } from '../../services/slices/ingredientsSlice';
import styles from './ingredient-details.module.css';
import { TIngredient } from '../../utils/types';
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface IngredientDetailsProps {
  ingredient?: TIngredient;
  onClose: () => void;
}

const IngredientDetails: FC<IngredientDetailsProps> = ({
  ingredient,
  onClose
}) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.items
  );
  const selectedIngredient =
    ingredient || ingredients.find((item) => item._id === id);

  useEffect(() => {
    if (selectedIngredient && !ingredient) {
      dispatch(setSelectedIngredient(selectedIngredient));
    }
  }, [id, dispatch, ingredients, selectedIngredient]);

  if (!selectedIngredient) {
    return <p>Загрузка...</p>;
  }

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className='text text_type_main-large'>Детали ингредиента</h2>
          <div className={styles.closeIcon} onClick={onClose}>
            <CloseIcon type='primary' />
          </div>
        </div>
        <div className={styles.content}>
          <img
            src={selectedIngredient.image_large}
            alt={selectedIngredient.name}
            className={styles.image}
          />
          <h3 className='text text_type_main-medium'>
            {selectedIngredient.name}
          </h3>
        </div>
        <ul className={styles.nutrients}>
          <li className={styles.nutrient}>
            <span className='text text_type_main-default text_color_inactive'>
              Калории, ккал
            </span>
            <span className='text text_type_main-default text_color_inactive'>
              {selectedIngredient.calories}
            </span>
          </li>
          <li className={styles.nutrient}>
            <span className='text text_type_main-default text_color_inactive'>
              Белки, г
            </span>
            <span className='text text_type_main-default text_color_inactive'>
              {selectedIngredient.proteins}
            </span>
          </li>
          <li className={styles.nutrient}>
            <span className='text text_type_main-default text_color_inactive'>
              Жиры, г
            </span>
            <span className='text text_type_main-default text_color_inactive'>
              {selectedIngredient.fat}
            </span>
          </li>
          <li className={styles.nutrient}>
            <span className='text text_type_main-default text_color_inactive'>
              Углеводы, г
            </span>
            <span className='text text_type_main-default text_color_inactive'>
              {selectedIngredient.carbohydrates}
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default IngredientDetails;
