import React, { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import {
  fetchIngredients,
  setSelectedIngredient
} from '../../services/slices/ingredientsSlice';
import { RootState } from '../../services/store';
import styles from './ingredient-details.module.css';
import { TIngredient } from '../../utils/types';

interface IngredientDetailsProps {
  ingredient?: TIngredient;
}

const IngredientDetails: FC<IngredientDetailsProps> = ({ ingredient }) => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const ingredients = useSelector(
    (state: RootState) => state.ingredients.items
  );
  const selectedIngredient =
    ingredient || ingredients.find((item) => item._id === id);

  useEffect(() => {
    if (!ingredients.length) {
      dispatch(fetchIngredients());
    }
    if (selectedIngredient && !ingredient) {
      dispatch(setSelectedIngredient(selectedIngredient));
    }
  }, [id, dispatch, ingredients, selectedIngredient, ingredient]);

  if (!selectedIngredient) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.details}>
      <img src={selectedIngredient.image_large} alt={selectedIngredient.name} />
      <h3 className='text text_type_main-medium'>{selectedIngredient.name}</h3>
      <ul>
        <li>
          <span>Калории,ккал</span>
          <span>{selectedIngredient.calories}</span>
        </li>
        <li>
          <span>Белки, г</span>
          <span>{selectedIngredient.proteins}</span>
        </li>
        <li>
          <span>Жиры, г</span>
          <span>{selectedIngredient.fat}</span>
        </li>
        <li>
          <span>Углеводы, г</span>
          <span>{selectedIngredient.carbohydrates}</span>
        </li>
      </ul>
    </div>
  );
};

export default IngredientDetails;
